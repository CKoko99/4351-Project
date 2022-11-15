import {useSelector} from 'react-redux';

function Reservation() { 
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const firstName = useSelector(state => state.auth.firstName);
    const lastName = useSelector(state => state.auth.lastName);

    return (<>
        <div>
            <h1>Book a Reservation</h1>
            {isLoggedIn && <>
                <div>First Name: {firstName}</div>
                <div>Last Name: {lastName}</div>
            </>}
            {!isLoggedIn && <>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
            </>}
        </div>
    </>)
}
export default Reservation;