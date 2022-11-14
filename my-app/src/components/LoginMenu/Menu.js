import styles from './Menu.module.css'

function Menu(props) {
    return <>
        <div onClick={props.closeOverlay}  className={styles.overlay}>
            <div className={styles["overlay-content"]}>
                <div className={styles["menu"]}>
                    <div className={styles.menuHeader}>Returning Customer?</div>
                    <div className={styles.menuBody}>
                        <div>Sign In</div>
                        <input type="text" placeholder="Username:" />
                        <input type="text" placeholder="Password:" />
                        <button>Sign In</button>
                        <div>
                            <button>Create An Account</button>
                            <button>Continue As Guest</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Menu