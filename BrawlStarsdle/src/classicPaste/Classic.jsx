import { useEffect, useState, useRef } from 'react';

import style from './classic.module.css';
import { brawlers } from '../brawlers';

function Classic() {

    const [brawlerSecreto, setbrawlerSecreto] = useState(null)
    const [input, setInput] = useState("");
    const [tentativas, settentativas] = useState([]);
    const [sugestoes, setSugestoes] = useState([]);
    const [venceu, setVenceu] = useState(false);
    const sugestoesRef = useRef(null);


    useEffect(() => {
        const brawlersvalidos = brawlers.filter(brawler => brawler.vida != null).filter(brawler => brawler.vida < 20000);
        const aleatorio = brawlersvalidos[Math.floor(Math.random() * brawlersvalidos.length)];
        setbrawlerSecreto(aleatorio);
    }, []);

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


        if (!chute) return alert("Brawler não encontrado. Verifique a grafia e tente novamente.");

        settentativas([...tentativas, chute]);
        setInput("");
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
        return texto
            .toLowerCase()
            .split(" ")
            .map(palavra => 
                palavra.charAt(0).toUpperCase() + palavra.slice(1)
            )
            .join(" ");
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
                        <div className={style.textblock}>Foto</div>
                        <div className={style.linha}></div>
                    </div>
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
                        <div className={style.textblock}>Lancamento</div>
                        <div className={style.linha}></div>
                    </div>
                    <div className={style.htrue}>
                        <div className={style.textblock}>Velocidade</div>
                        <div className={style.linha}></div>
                    </div>
                </div>
            {brawlerSecreto && tentativas.map((b, index) => (
                <div className={style.row} key={index}>

                    <div className={`${style.block} delay0 ${comparar(b.nome, brawlerSecreto.nome)}`}>
                        {toTitleCase(b.nome)}
                    </div>

                    <div className={`${style.block} delay1 ${comparar(b.raridade, brawlerSecreto.raridade)}`}>
                        {toTitleCase(b.raridade)}
                    </div>

                    <div className={`${style.block} delay2 ${comparar(b.classe, brawlerSecreto.classe)}`}>
                        {toTitleCase(b.classe)}
                    </div>

                    <div className={`${style.block} delay3 ${
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



                    <div className={`${style.block} delay4 ${comparar(b.alcance, brawlerSecreto.alcance)}`}>
                        {toTitleCase(b.alcance)}
                    </div>

                    <div className={`${style.block} delay5 ${
                        comparar(b.anoLancamento, brawlerSecreto.anoLancamento) === "verde"
                            ? "verde"
                            : "vermelhoescuro"
                    }`}>
                        {comparar(b.anoLancamento, brawlerSecreto.anoLancamento) !== "verde" && (
                            <i className={`material-icons ${style.arrow}`}>
                                {comparar(b.anoLancamento, brawlerSecreto.anoLancamento) === "vermelho-Cima"
                                    ? "arrow_downward"
                                    : "arrow_upward"}
                            </i>
                        )}

                        <span className={style.textValue}>
                            {b.anoLancamento}
                        </span>
                    </div>


                    <div className={`${style.block} delay6 ${comparar(b.velocidadeMovimento, brawlerSecreto.velocidadeMovimento)}`}>
                        {toTitleCase(b.velocidadeMovimento)}
                    </div>

                </div>
            ))}
            </div>
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
