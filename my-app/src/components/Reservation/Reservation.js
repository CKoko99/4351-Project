import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Reservation.module.css';
import React, { useState } from 'react';

function Reservation() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const firstName = useSelector(state => state.auth.firstName);
    const lastName = useSelector(state => state.auth.lastName);
    const [selectedDate, setSelectedDate] = useState(null)
    return (
    <>
        <a className={styles.logoLink} href='/'>
            <div className={styles.logo}>
                cougar cafe
            </div>
        </a>
        <div className={styles.page}>
            <div className={styles.overlay}></div>
                <h1 className={styles.heading}>Book a Reservation</h1>
                <div className={styles.inputFields}>

                    {isLoggedIn && <>
                        <div>First Name: {firstName}</div>
                        <div>Last Name: {lastName}</div>
                    </>}
                    {!isLoggedIn && <>
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </>}
                        <input type="number" min='1' placeholder="Number of People" />
                        <DatePicker
                        selected={selectedDate}
                        onChange={selectedDate => setSelectedDate(selectedDate)} 
                        className={styles.datePicker} placeholderText='Choose a date'
                        minDate={new Date()}
                        isClearable/>
                </div>
        </div>
    </>)
}
export default Reservation;