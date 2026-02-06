import style from './home.module.css';

function Home() {
    return (
        <div className={style.home}>
            <header>
                <span className={`material-icons ${style.iconequeroda}`}>settings</span>
                <img src="/src/assets/logoBrawldle.png" alt="Logo Brawldle"/>
                <span className={`material-icons ${style.iconequeroda}`}>language</span>
            </header>
            <p>Adivinhe os Brawlers de Brawl Stars</p>
            <div className={style.container}>
                <div className={style.Select}>
                    <div className={style.bola}>
                         <span className="material-icons">saved_search</span>
                    </div>
                    <div className={style.retangulo}>
                        <h1>Modo Clássico</h1>
                        <p>Adivinhe o Brawler a partir de outro</p>
                    </div>
                </div>
                <div className={style.Select}>
                    <div className={style.bola}></div>
                    <div className={style.retangulo}></div>
                </div>
            </div>
                <footer>
                    <p>Brawldle — jogo de dedução inspirado em Brawl Stars</p>
                    <p className="direitos">
                        Projeto independente. Não afiliado à Supercell.
                    </p>
                    <p className="direitos">
                        Brawl Stars é uma marca registrada da Supercell.
                    </p>
                    <p>Feito por João Bozz</p>
                </footer>
        </div>
    );
}

export default Home;