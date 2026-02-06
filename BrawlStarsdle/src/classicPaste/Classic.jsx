import style from './classic.module.css';

function Classic() {
    return (
        <div>
            <div className={style.container}>

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
    )
}

export default Classic;