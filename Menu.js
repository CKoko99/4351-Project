import styles from './Menu.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

//firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs} from "firebase/firestore"; 

//connecting to firebase database
const firebaseConfig = {
    apiKey: "AIzaSyCInum8TLXyo_-_08ZWFY3xN5Z3Ikn7hQE",
    authDomain: "cosc4351-40e40.firebaseapp.com",
    projectId: "cosc4351-40e40",
    storageBucket: "cosc4351-40e40.appspot.com",
    messagingSenderId: "872197037352",
    appId: "1:872197037352:web:0d67286d985ad158e3041d",
    measurementId: "G-ZCWZMJ9X3X"
  };
const myapp = initializeApp(firebaseConfig);
const database = getFirestore(myapp);

function Menu(props) {

        //the original state of the form's input values (basically null)
        const [name, setName] = useState("null");
        const [email, setEmail] = useState("null");
        const [password, setPassword] = useState("null");
        const [phone, setPhone] = useState("null");
    
//function for when you create an account
        function newAccount(event)
        {
            //prevent browser from reloading page after submiting form to server
            event.preventDefault();
            if(name == "null" || email == "null" || password == "null" || phone == "null"){
                alert("Please fill out form");
            } 
            else{
            //add user to database
            const newPerson = addDoc(collection(database, "users"),{
                Name: name,
                Email: email,
                Password: password,
                Phone: phone,
            });
        
            //log object into console to see if it sent
            newPerson.then(
            answer => console.log(answer));
    
            //log person info into console
            console.log(name, "\n", email, "\n", password, "\n", phone);
    
            //set values as null again
            setName("null");
            setEmail("null");
            setPassword("null");
            setPhone("null");
            }
        }
//function for when you log into account
        function accountLogin(event)
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
                    if(info.data().Email == email && info.data().Password == password){
                        userFound = true;
                    }
                    });
                        //send them to reservation or give error
                        if (userFound == true && email != "null" && password != "null"){
                            alert("Welcome!");
                        }else{
                            alert("No Account");
                        }
                });    
    
            setEmail("null");
            setPassword("null");
        }

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
                <div className={styles.menuHeader}>Cougar Cafe</div>
                <div className={styles.menuBody}>
                    {signingIn &&
                        <>
                            <div>Sign In</div>
                            <div className={styles.inputFields}>
                                <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
                                <input type="text" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                            </div>
                            <button onClick={accountLogin}>Sign In</button>
                            <div className={styles.links}>
                                <div style={{ display: 'flex' }}>
                                    <div className={styles.link} onClick={changeMenu}>Create An Account</div>
                                </div>
                                <div className={styles.link} onClick={goToReservationPage}>Continue As Guest</div>
                            </div>
                        </>
                    }
                    {!signingIn &&
                        <>
                            <div>Create An Account</div>
                            <div className={styles.inputFields}>
                                <input type="text" placeholder="Full Name" onChange={event => setName(event.target.value)}/>
                                <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
                                <input type="text" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                                <input type="text" placeholder="Phone Number" onChange={event => setPhone(event.target.value)}/>
                            </div>
                            <button onClick={newAccount}>Create Account</button>
                            <div className={styles.links}>
                                <div style={{ display: 'flex' }}>
                                    <div className={styles.link} onClick={changeMenu}>Sign In</div>
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