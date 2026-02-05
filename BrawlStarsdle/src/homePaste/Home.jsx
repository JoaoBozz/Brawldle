import style from './Home.module.css';

function Home() {
    return (
        <div className={style.home}>
            <header>
                <span class="material-icons">settings</span>
                <img src="/src/assets/logoBrawldle.png" alt="Logo Brawldle"/>
                <span class="material-icons">language</span>
            </header>
            <div className={style.container}>

            </div>
            <footer>

            </footer>
        </div>
    );
}

export default Home;