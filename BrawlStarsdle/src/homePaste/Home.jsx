import style from './home.module.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className={style.home}>
            <p>Adivinhe os Brawlers de Brawl Stars</p>

            <div className={style.container}>
                <div className={style.Select} onClick={() => navigate("/classic")}>
                    <div className={style.bola}>
                        <span className="material-icons">saved_search</span>
                    </div>

                    <div className={style.retangulo}>
                        <h1>Modo Clássico</h1>
                        <p>Adivinhe o Brawler a partir de outro</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
