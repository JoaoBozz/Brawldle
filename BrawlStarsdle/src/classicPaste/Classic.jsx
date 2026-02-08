import style from './classic.module.css';

function Classic() {
    return (
        <div className={`page-container ${style.container}`}>
            <div className={style.text}>
                <input placeholder='Digite o nome do Brawler...' type="text" className={style.input}/>
                <div className={style.confere}><span className="material-icons">send</span></div>
            </div>
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
                <div className={style.row}>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                </div>
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
                            <span className="material-icons">arrow_upward</span>
                        </div>
                        <div className={style.textblockguia}>Mais alto</div>
                    </div>
                    <div className={style.hguia}>
                        <div className={`${style.blockguia} vermelho`}>
                            <span className="material-icons">arrow_downward</span>
                        </div>
                        <div className={style.textblockguia}>Mais baixo</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Classic;
