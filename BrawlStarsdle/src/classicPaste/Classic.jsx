import style from './classic.module.css';

function Classic() {
    return (
        <div className={`page-container ${style.container}`}>
            <input placeholder='Digite o n' type="text" />
            <div className={style.content}>
                <div className={style.row}>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
                    <div className={style.block}></div>
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
        </div>
    );
}

export default Classic;
