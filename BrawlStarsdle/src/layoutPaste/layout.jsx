import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
    const navigate = useNavigate();

    return (
        <div className="app-layout">
            <header>
                <span className="material-icons">settings</span>

                <img
                    src="/src/assets/logoBrawldle.png"
                    alt="Logo Brawldle"
                    onClick={() => navigate("/")}
                />

                <span className="material-icons">language</span>
            </header>

            <main className="page-content">
                <Outlet />
            </main>

            <footer>
                <p>Brawldle — jogo de dedução inspirado em Brawl Stars</p>
                <p className="direitos">Projeto independente. Não afiliado à Supercell.</p>
                <p className="direitos">Brawl Stars é uma marca registrada da Supercell.</p>
                <p>Feito por João Bozz</p>
            </footer>
        </div>
    );
}

export default Layout;
