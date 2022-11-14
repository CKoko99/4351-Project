import styles from './Homepage.module.css';
import cafeImg from './Cafe.png';

function Homepage() {
  
  function reservationButton(){
    console.log('Reservation button clicked');
  }

  return (
    <div className={styles.container}>
      <img src={cafeImg} alt="cafe" className={styles.homeImg} />
      <div className={styles.centered}>
        <h1 className={styles.title}>Welcome to Cougar Cafe!</h1>
        <button onClick={reservationButton}>Make a Reservation</button>
      </div>
    </div>
  );
}
export default Homepage;