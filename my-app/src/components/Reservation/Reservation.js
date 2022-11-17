import { useSelector } from 'react-redux';
import styles from './Reservation.module.css';

function Reservation() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const firstName = useSelector(state => state.auth.firstName);
    const lastName = useSelector(state => state.auth.lastName);

    return (<>
        <div className={styles.page}>
            <h1>Book a Reservation</h1>
            <div className={styles.inputFields}>

                {isLoggedIn && <>
                    <div>First Name: {firstName}</div>
                    <div>Last Name: {lastName}</div>
                </>}
                {!isLoggedIn && <>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                </>}
                <>

                    <input type="date" placeholder="Date" />
                    <input type="number" placeholder="Number of People" />
                </>
            </div>
        </div>
    </>)
}
export default Reservation;