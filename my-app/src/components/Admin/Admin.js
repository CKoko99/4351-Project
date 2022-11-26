import React, { useState, useEffect } from 'react';
import './Admin.css';
import styled from 'styled-components';
import { db } from '../../firebaseconfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';

function Admin() {

    const [table, setTable] = useState([]);
    const tableCollectionRef = collection(db, 'Table');

    const [tableNumber, setTableNumber] = useState(0);
    const [tableSize, setTableSize] = useState(0);



    useEffect(() => {
      const getTables = async () => {
        const data = await getDocs(tableCollectionRef);
        setTable(data.docs.map((doc) => ({ 
            ...doc.data(), id: doc.id
        })))
      };
    
      getTables();
    }, []);
    
    const createTable = async () => {

        var tableNumError = false;
        var sizeTooBig = false;
        var sizeTooSmall = false;
        var intNumber = parseInt(tableNumber);

        table.forEach(element => {
            if(element.number === intNumber){
                return tableNumError = true;
            } else if (parseInt(tableSize) > 8) {
                return sizeTooBig = true;
            } else if (parseInt(tableSize) < 2) {
                return sizeTooSmall = true;
            }
        });

        if (tableNumError) {
            toast.error("Error! Table Number already exists. Please choose another table number.", {
                duration: 5000,
                style: {
                    background: 'var(--red)',
                    color: 'white',
                },
                iconTheme: {
                    primary: 'white',
                    secondary: 'var(--red)'
                }
            });
            
        
        } else if (sizeTooBig) {
                toast.error("Error! Table size cannot exceed 8 people.", {
                    duration: 5000,
                    style: {
                        background: 'var(--red)',
                        color: 'white',
                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: 'var(--red)'
                    }
                });
            } else if (sizeTooSmall){
            toast.error("Error! Table must be 2 or more people.", {
                duration: 5000,
                style: {
                    background: 'var(--red)',
                    color: 'white',
                },
                iconTheme: {
                    primary: 'white',
                    secondary: 'var(--red)'
                }
            });
        } else{
            await addDoc(tableCollectionRef, {
                isReserved: false,
                number: parseInt(tableNumber),
                size: parseInt(tableSize)
            });
    
             window.location.reload(false);
        }
}



  return (
    <>
    <Toaster/>    
    <Section>
    <Border>
        <Header>
            <h1>Table ID</h1>
            <h1>Reserved?</h1>
            <h1>Table Number</h1>
            <h1>Table Size</h1>
        </Header>
    {table.map((table, index) => {
        return (
        <Cell key={index}> 
            <p>{table.id}</p>
            <p>{table.isReserved.toString()}</p>
            <p>{table.number}</p>
            <p>{table.size}</p>
        </Cell>
    )})}</Border>
    <CreateWrapper>
    <h1>Create Tables</h1>
    <InputWrapper>
    <DefaultInput placeholder="Table Number" type="number" min="1" max="16" onChange={(e) => setTableNumber(e.target.value)}/>
    <DefaultInput placeholder="Table Capacity" type='number' min="2" max='8' onChange={(e)=> setTableSize(e.target.value)}/>
    <Button onClick={createTable}>Create New Table</Button>
    </InputWrapper>
    </CreateWrapper>
    </Section>
    </>
  )
}

export default Admin;

const InputWrapper = styled.div`
display: flex;
width: 100%;
`

const CreateWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin-top: 3rem;
`

const Section = styled.section`
padding: 2%;
`

const Header = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-column-start: 1;
grid-column-end: 5;
border-bottom: 2px solid var(--black);
margin-bottom: 1rem;
`

const Border = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
column-gap: 16px;
padding: 1rem;
background: whitesmoke;
border: 2px solid var(--black);
`

const Cell = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-column-start: 1;
grid-column-end: 5;
`

const Button = styled.button`
margin-left: 1rem;
font-weight: 600;
padding: 0.67rem 1rem;
border-radius: 12px;
background: var(--red);
`

const DefaultInput = styled.input`
position: relative;
padding: 0.5rem 1rem;
width: 12.5%;
border-radius: 12px;
border: 1px solid var(--black);
margin-right: 1rem;
`