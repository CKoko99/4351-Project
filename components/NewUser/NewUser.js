import React from 'react';
import {useState} from 'react';
import './NewUser.css';

//firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc} from "firebase/firestore"; 

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

//New User Component function
function NewUser(){ 

    //the original state of the form's input values (basically null)
    const [name, setName] = useState("null");
    const [username, setUsername] = useState("null");
    const [password, setPassword] = useState("null");
    const [phone, setPhone] = useState("null");

    //handle form's state to submit form
    function newState(event)
    {
        //prevent browser from reloading page after submiting form to server
        event.preventDefault();

        //add user to database
        const newPerson = addDoc(collection(database, "users"),{
            Name: name,
            Username: username,
            Password: password,
            Phone: phone,
        });
    
        //log object into console to see if it sent
        newPerson.then(
        answer => console.log(answer));

        //log person info into console
        console.log(name, "\n", username, "\n", password, "\n", phone);

        //set values as null again
        setName("null");
        setUsername("null");
        setPassword("null");
        setPhone("null");
    }


//FYI: 
    // "event.target" gives element that triggered the event
    // "event.target.value" gives value of the element

    return (<>
        <div className="everything">
            <form className="form">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20.5468 3.67162C20.1563 3.28109 19.5231 3.28109 19.1326 3.67162L13.7687 9.03555H2V11.0356H2.00842C2.22563 16.3663 6.61591 20.6213 12 20.6213C17.3841 20.6213 21.7744 16.3663 21.9916 11.0356H22V9.03555H16.5971L20.5468 5.08583C20.9374 4.69531 20.9374 4.06214 20.5468 3.67162ZM14.1762 11.0356C14.1806 11.0356 14.1851 11.0356 14.1896 11.0356H19.9895C19.7739 15.2613 16.2793 18.6213 12 18.6213C7.72066 18.6213 4.22609 15.2613 4.01054 11.0356H14.1762Z" fill="currentColor"/></svg>
                <h1>Create a New Account</h1>
                <input type="text" id="name" placeholder="Full Name" onChange={event => setName(event.target.value)}></input>
                <br></br>
                <input type="text" id="username" placeholder="Username" onChange={event => setUsername(event.target.value)}></input>
                <br></br>
                <input type="text" id="password" placeholder="Password" onChange={event => setPassword(event.target.value)}></input>
                <br></br>
                <input type="text" id="phone" placeholder="Phone Number" onChange={event => setPhone(event.target.value)}></input>
                <br></br>
                <button type="submit" onClick={newState}>Submit</button>
            </form>
        </div>
    </>)
}
export default NewUser;