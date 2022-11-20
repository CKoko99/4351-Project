import styles from './Menu.module.css'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';


//firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from "firebase/firestore"; 

//connecting to firebase database
    const accountInfo = {
        apiKey: "AIzaSyBStE7GG91siiyoSfqhx8LABcq-vOogut4",
        authDomain: "restaurant-app-6cda8.firebaseapp.com",
        projectId: "restaurant-app-6cda8",
        storageBucket: "restaurant-app-6cda8.appspot.com",
        messagingSenderId: "175062538799",
        appId: "1:175062538799:web:c4f7f9bc8fa70e8d7384da",
        measurementId: "G-BVGYY38N8W"
    };
    const myapp = initializeApp(accountInfo);
    const database = getFirestore(myapp);


function Menu(props) {
    const navigate = useNavigate();
    
//setting default input values as null
    const [username, setUsername] = useState("null");
    const [password, setPassword] = useState("null");

    function newState(event)
    {
        //prevent browser from reloading page after submiting form to server
            event.preventDefault();
        //Read database
            const data = collection(database, "users");
        //Get database snapshot (returns promise)
            const snapShot = getDocs(data);
        //See if database has a user log-in match
            let userFound = false;
        //by looping through all database rows
            snapShot.then(doc => {
                doc.forEach(info => {
                if(info.data().Username == username && info.data().Password == password){
                    userFound = true;
                }
                });
                    //send them to reservation or give error
                    if (userFound == true && username != "null" && password != "null"){
                        alert("Welcome!");
                    }else{
                        alert("No Account");
                    }
            });    

        setUsername("null");
        setPassword("null");
    }

//function for new users
    function createAccountPage(){
        navigate("/newuser");
    }
//function to create reservation
    function goToReservationPage(){
        navigate("/book-reservation");
    }
    return <>
        <div onClick={props.closeOverlay} className={styles.overlay}>
        </div>
        <div className={styles["overlay-content"]}>
            <form className={styles["menu"]}>
                <div className={styles.menuHeader}>Log In</div>
                <div className={styles.menuBody}>
                    <div className={styles.inputFields}>
                        <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}></input>
                        <input type="text" placeholder="Password" onChange={event => setPassword(event.target.value)}></input>
                    </div>
                    <button onClick={newState}>Sign In</button>
                    <div className="links">
                        <br></br>
                        <a onClick={createAccountPage}>New user?</a>
                        <br></br>
                        <a onClick={goToReservationPage}>Continue As Guest</a>
                    </div>
                </div>
            </form>
        </div>
    </>
}

export default Menu