import { useEffect, useState, useRef } from 'react';
import confetti from "canvas-confetti";
import style from './classic.module.css';
import { getBrawlers } from '../services/api';

// Converte o objeto que vem da API para o formato que o componente usa.
// OBS: a API atual não tem "anoLancamento" nem "velocidadeMovimento" —
// essas colunas foram removidas do jogo até existirem no banco/API.
function adaptarBrawler(b) {
    return {
        nome: b.name,
        raridade: b.rarity_name,
        classe: b.category_name,
        vida: b.health,
        alcance: b.attack_range,
    };
}

function Classic() {

    const [brawlers, setBrawlers] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erroCarregamento, setErroCarregamento] = useState(null);

    const [brawlerSecreto, setbrawlerSecreto] = useState(null)
    const [input, setInput] = useState("");
    const [tentativas, settentativas] = useState([]);
    const [sugestoes, setSugestoes] = useState([]);
    const [venceu, setVenceu] = useState(false);
    const sugestoesRef = useRef(null);
    const vitoriaRef = useRef(null);

    const [textoVitoria, setTextoVitoria] = useState("");

    // Busca os brawlers da API assim que o componente monta
    useEffect(() => {
        getBrawlers()
            .then((data) => {
                console.log("API:", data);

                const adaptados = data.map(adaptarBrawler);

                console.log("Adaptados:", adaptados);

                setBrawlers(adaptados);
            })
            .catch((e) => {
                console.error(e);
                setErroCarregamento(e.message);
            })
            .finally(() => setCarregando(false));
    }, []);

    // Sorteia o brawler secreto assim que a lista chega da API
    useEffect(() => {
        if (brawlers.length === 0) return;

        const brawlersvalidos = brawlers
            .filter(b => b.vida != null)
            .filter(b => b.vida < 20000);

        const aleatorio = brawlersvalidos[
            Math.floor(Math.random() * brawlersvalidos.length)
        ];

        console.log("BRAWLER SECRETO:");
        console.log(aleatorio);

        setbrawlerSecreto(aleatorio);
    }, [brawlers]);

    useEffect(() => {
        if (!brawlerSecreto || tentativas.length === 0) return;

        const ultimaTentativa = tentativas[tentativas.length - 1];

        if (ultimaTentativa.nome === brawlerSecreto.nome) {
        setVenceu(true);
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    }
    }, [tentativas, brawlerSecreto]);

    useEffect(() => {
        if (venceu && vitoriaRef.current) {

            vitoriaRef.current.scrollIntoView({
                behavior: "smooth"
            });

            confetti({
                particleCount: 250,
                spread: 160,
                origin: { y: 0.6 }
            });

            if (tentativas.length === 1) {
                setTextoVitoria(`Incrível! Você acertou o brawler de primeira! O brawler secreto era ${toTitleCase(brawlerSecreto.nome)}.`);
            }
            else {
                setTextoVitoria(`Parabéns! Você acertou o brawler em ${tentativas.length} tentativas! O brawler secreto era ${toTitleCase(brawlerSecreto.nome)}.`);
            }
        }
    }, [venceu, tentativas, brawlerSecreto]);

    useEffect(() => {
        function handleClickFora(event) {
            if (sugestoesRef.current && !sugestoesRef.current.contains(event.target)) {
                setSugestoes([]);
            }
        }

        if (sugestoes.length > 0) {
            document.addEventListener('click', handleClickFora);
        }

        return () => {
            document.removeEventListener('click', handleClickFora);
        };
    }, [sugestoes]);

    function confirmar() {
    const chute = brawlers.find(
        brawler => brawler.nome.toLowerCase() === input.toLowerCase()
    );

    if (!chute) {
        return alert("Brawler não encontrado. Verifique a grafia e tente novamente.");
    }

    console.log("================================");
    console.log("CHUTE:", chute);
    console.log("SECRETO:", brawlerSecreto);
    console.log("RARIDADES:", chute.raridade, "|", brawlerSecreto.raridade);
    console.log("CLASSES:", chute.classe, "|", brawlerSecreto.classe);
    console.log("================================");

    settentativas([...tentativas, chute]);
    setInput("");
    setSugestoes([]);
}

    function comparar(valorChute, valorSecreto) {
        if (valorChute === valorSecreto){
            return "verde";
        }
        if (typeof valorChute === "number"){
            if (valorChute > valorSecreto){
                return "vermelho-Cima";
            } else {
                return "vermelho-Baixo";
            }
        }
        else {
            return "vermelho";
        }
    }

    function toTitleCase(texto) {
        if (texto === undefined || texto === null) {
            console.warn("toTitleCase recebeu:", texto);
            return "";
        }

        return String(texto)
            .toLowerCase()
            .split(" ")
            .map(palavra =>
                palavra.charAt(0).toUpperCase() + palavra.slice(1)
            )
            .join(" ");
    }

    function reiniciarJogo() {
        const brawlersvalidos = brawlers
            .filter(brawler => brawler.vida != null)
            .filter(brawler => brawler.vida < 20000);

        const aleatorio = brawlersvalidos[Math.floor(Math.random() * brawlersvalidos.length)];

        setbrawlerSecreto(aleatorio);
        settentativas([]);
        setInput("");
        setSugestoes([]);
        setVenceu(false);
        setTextoVitoria("");

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (carregando) {
        return (
            <div className={`page-container ${style.container}`}>
                <p>Carregando brawlers...</p>
            </div>
        );
    }

    if (erroCarregamento) {
        return (
            <div className={`page-container ${style.container}`}>
                <p>Não foi possível carregar os brawlers: {erroCarregamento}</p>
                <p>Verifique se a API está rodando em {import.meta.env.VITE_API_URL || 'http://localhost:3333'}.</p>
            </div>
        );
    }

    return (
        <div className={`page-container ${style.container}`}>
            <div className={style.text}>
                <input 
                placeholder='Digite o nome do Brawler...'
                type="text"
                className={style.input}
                value={input}
               onChange={(e) => {
                    const valor = e.target.value;
                    setInput(valor);

                    if (valor.trim() === "") {
                        setSugestoes([]);
                        return;
                    }

                    const filtrados = brawlers
                        .filter(b => 
                            b.nome.toLowerCase().includes(valor.toLowerCase())
                        )
                        .slice(0, 6);

                    setSugestoes(filtrados);
                }}
                />
                <div
                className={style.confere}
                onClick={confirmar}
                ><i className="material-icons">send</i></div>
            </div>
                {sugestoes.length > 0 && (
                    <div className={style.sugestoes} ref={sugestoesRef}>
                        {sugestoes.map((b, i) => (
                            <div 
                                key={i}
                                className={style.sugestaoItem}
                                onClick={() => {
                                    settentativas([...tentativas, b]);
                                    setInput("");
                                    setSugestoes([]);
                                }}
                            >
                                {toTitleCase(b.nome)}
                            </div>
                        ))}
                    </div>
                )}
            <div className={style.content}>
                <div className={`${style.rowcar} ${style.row}`}>
                    <div className={style.htrue}>
                        <div className={style.textblock}>Raridade</div>
                        <div className={style.linha}></div>
                    </div>
                    <div className={style.htrue}>
                        <div className={style.textblock}>Classe</div>
                        <div className={style.linha}></div>
                    </div>
                    <div className={style.htrue}>
                        <div className={style.textblock}>Vida</div>
                        <div className={style.linha}></div>
                    </div>
                    <div className={style.htrue}>
                        <div className={style.textblock}>Alcance</div>
                        <div className={style.linha}></div>
                    </div>
                    <div className={style.htrue}>
                        <div className={style.textblock}>Nome</div>
                        <div className={style.linha}></div>
                    </div>
                </div>
            {brawlerSecreto && tentativas.map((b, index) => (
                <div className={style.row} key={index}>

                    <div className={`${style.block} delay0 ${comparar(b.raridade, brawlerSecreto.raridade)}`}>
                        {toTitleCase(b.raridade)}
                    </div>

                    <div className={`${style.block} delay1 ${comparar(b.classe, brawlerSecreto.classe)}`}>
                        {toTitleCase(b.classe)}
                    </div>

                    <div className={`${style.block} delay2 ${
                        comparar(b.vida, brawlerSecreto.vida) === "verde"
                            ? "verde"
                            : "vermelhoescuro"
                    }`}>
                        {comparar(b.vida, brawlerSecreto.vida) !== "verde" && (
                            <i className={`material-icons ${style.arrow}`}>
                                {comparar(b.vida, brawlerSecreto.vida) === "vermelho-Cima"
                                    ? "arrow_downward"
                                    : "arrow_upward"}
                            </i>
                        )}

                        <span className={style.textValue}>
                            {b.vida}
                        </span>
                    </div>



                    <div className={`${style.block} delay3 ${comparar(b.alcance, brawlerSecreto.alcance)}`}>
                        {toTitleCase(b.alcance)}
                    </div>

                    <div className={`${style.block} delay6 ${comparar(b.nome, brawlerSecreto.nome)}`}>
                        {toTitleCase(b.nome)}
                    </div>

                </div>
            ))}
            </div>
            {venceu && (
                <div ref={vitoriaRef} className={style.vitoriaContainer}>
                    <h1>🎉 VOCÊ VENCEU!</h1>
                    <p>{textoVitoria}</p>

                    <button onClick={reiniciarJogo}>
                        Jogar novamente
                    </button>
                </div>
            )}
            <div className={style.guia}>
                <p>Para começar, digite o nome de um brawler aleátorio no campo acima e confirme.</p>
                <div className={`${style.linha} ${style.margem}`}></div>
                <h2>Classificadores de cor</h2>
                <div className={style.rowguia}>
                    <div className={style.hguia}>
                        <div className={`${style.blockguia} verde`}></div>
                        <div className={style.textblockguia}>Correto</div>
                    </div>
                    <div className={style.hguia}>
                        <div className={`${style.blockguia} vermelho`}></div>
                        <div className={style.textblockguia}>Incorreto</div>
                    </div>
                    <div className={style.hguia}>
                        <div className={`${style.blockguia} vermelho`}>
                            <i className="material-icons">arrow_upward</i>
                        </div>
                        <div className={style.textblockguia}>Mais alto</div>
                    </div>
                    <div className={style.hguia}>
                        <div className={`${style.blockguia} vermelho`}>
                            <i className="material-icons">arrow_downward</i>
                        </div>
                        <div className={style.textblockguia}>Mais baixo</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Classic;