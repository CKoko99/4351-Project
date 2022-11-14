import styles from './Homepage.module.css';
import cafeImg from './Cafe.png';
import { useSelector } from 'react-redux';
import Menu from '../LoginMenu/Menu';
import { useState } from 'react';

function Homepage() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [showMenu, setShowMenu] = useState(false);
  function reservationButton() {
    setShowMenu(true);
  }
  function closeOverlay() {
    setShowMenu(false);
    console.log("clicked")
  }

  return (<>

    <div className={styles.container}>
      <img src={cafeImg} alt="cafe" className={styles.homeImg} />
      <div className={styles.centered}>
        <h1 className={styles.title}>Welcome to Cougar Cafe!</h1>
        <button onClick={reservationButton}>Make a Reservation</button>
      </div>
    </div>
    {showMenu && <Menu closeOverlay={closeOverlay}/>}
  </>
  );
}
export default Homepage;