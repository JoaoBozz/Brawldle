import style from './Home.module.css';

function Home() {
    return (
        <div className={style.home}>
            <header>
                <span class="material-icons">settings</span>
                <img src="/src/assets/logoBrawldle.png" alt="Logo Brawldle"/>
                <span class="material-icons">language</span>
            </header>
            <p>Adivinhe os Brawlers de Brawl Stars</p>
            <div className={style.container}>
                <div className={style.Select}>
                    <div className={style.bola}></div>
                    <div className={style.retangulo}></div>
                </div>
            </div>
            <footer>

            </footer>
        </div>
    );
}

export default Home;