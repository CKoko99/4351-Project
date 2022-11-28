import styles from './Menu.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Menu(props) {
    //use state to keep track of the menu state
    const [signingIn, setMenuState] = useState(true);

    const navigate = useNavigate();
    function goToReservationPage() {
        navigate("/book-reservation");
    }
    function changeMenu(){
        setMenuState(!signingIn);
    }
    return <><div onClick={props.closeOverlay} className={styles.overlay}>
    </div>
        <div className={styles["overlay-content"]}>
            <div className={styles["menu"]}>
                <div className={styles.menuHeader}>Returning Customer?</div>
                <div className={styles.menuBody}>
                    {signingIn &&
                        <>
                            <div>Sign In</div>
                            <div className={styles.inputFields}>
                                <input type="text" placeholder="Username:" />
                                <input type="text" placeholder="Password:" />
                            </div>
                            <button>Sign In</button>
                            <div className={styles.links}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ padding: '0px 15px' }}>New User?</div><div className={styles.link} onClick={changeMenu}>Create An Account</div>
                                </div>
                                <div className={styles.link} onClick={goToReservationPage}>Continue As Guest</div>
                            </div>
                        </>
                    }
                    {!signingIn &&
                        <>
                            <div>Create An Account</div>
                            <div className={styles.inputFields}>
                                <input type="text" placeholder="Username:" />
                                <input type="text" placeholder="Password:" />
                                <input type="text" placeholder="Confirm Password:" />
                            </div>
                            <button>Create Account</button>
                            <div className={styles.links}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ padding: '0px 15px' }}>Returning User?</div><div className={styles.link} onClick={changeMenu}>Sign In</div>
                                </div>
                                <div className={styles.link} onClick={goToReservationPage}>Continue As Guest</div>
                            </div>
                        </>}
                </div>
            </div>
        </div>
    </>
}

export default Menu;