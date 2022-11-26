import React, { useState, useEffect } from 'react';
import './Admin.css';
import styled from 'styled-components';
import { db } from '../../firebaseconfig';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';

function Admin() {

    const [table, setTable] = useState([]);
    const tableCollectionRef = collection(db, 'Table');

    const [tableNumber, setTableNumber] = useState(0);
    const [tableSize, setTableSize] = useState(0);

    const [editNumber, setEditNumber] = useState('');
    const [editSize, setEditSize] = useState('');
    const [editReserved, setEditReserved] = useState(false);

    useEffect(() => {
      const getTables = async () => {
        const data = await getDocs(tableCollectionRef);
        setTable(data.docs.map((doc) => ({ 
            ...doc.data(), id: doc.id
        })))
      };
    
      getTables();
    }, [tableCollectionRef]);
    
    const createTable = async () => {

        var tableNumError = false;
        var sizeTooBig = false;
        var sizeTooSmall = false;
        var intNumber = Number(tableNumber);

        table.forEach(element => {
            if(element.number === intNumber){
                return tableNumError = true;
            } else if (Number(tableSize) > 8) {
                return sizeTooBig = true;
            } else if (Number(tableSize) < 2) {
                return sizeTooSmall = true;
            }
        });

        if (tableNumError) {
            toast.error("Table Number already exists. Please choose another table number.", {
                duration: 5000,
                style: {
                    background: 'var(--red)',
                    color: 'white',
                    boxShadow: ' 0 5px 10px rgba(0,0,0, 0.5)'
                },
                iconTheme: {
                    primary: 'white',
                    secondary: 'var(--red)',
                }
            });
            
        
        } else if (sizeTooBig) {
                toast.error("Table size cannot exceed 8 people.", {
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
            toast.error("Table must be 2 or more people.", {
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
                number: Number(tableNumber),
                size: Number(tableSize)
            });
    
             //window.location.reload(false);
        }
    }

    const updateTable = async (id) => {
        const tableDoc = doc(db, 'Table', id);
        const newFields = {
            number: Number(editNumber),
            size: Number(editSize),
            isReserved: (editReserved === 'true')
        };
        await updateDoc(tableDoc, newFields);
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
            <SmallButton onClick={()=>{
                setEditNumber(table.number);
                setEditReserved(table.isReserved);
                setEditSize(table.size);
            }}>Edit</SmallButton>
        </Cell>
    )})}</Border>
    <CrudWrapper>
    <h1>Create Tables</h1>
    <InputWrapper>
    <DefaultInput placeholder="Table Number" type="number" min="1" max="16" onChange={(e) => setTableNumber(e.target.value)}/>
    <DefaultInput placeholder="Table Capacity" type='number' min="2" max='8' onChange={(e)=> setTableSize(e.target.value)}/>
    <Button onClick={createTable}>Create New Table</Button>
    </InputWrapper>
    </CrudWrapper>
    <CrudWrapper>
        <h1>Edit Selected Table</h1>
        <DefaultInput placeholder='Table Number' type='number' min="1" max="16" value={editNumber} onChange={(e)=>setEditNumber(e.target.value)} />
        <DefaultInput placeholder="Table Capacity" type='number' min="2" max='8' value={editSize} onChange={(e)=> setEditSize(e.target.value)}/>
        <DefaultSelect name='Reserved Status' onChange={(e) => setEditReserved(e.target.value)}>
            <option defaultValue={false}>false</option>
            <option value={true}>true</option>
        </DefaultSelect>
        <Button onClick={updateTable}>update</Button>
    </CrudWrapper>
    </Section>
    </>
  )
}

export default Admin;

const DefaultSelect = styled.select`

`

const SmallButton = styled.button`
padding: 0.33rem 2rem;
font-weight: 600;
border-radius: 12px;
border: 2px solid var(--red);
background-color: rgba(200, 16, 46, 0.4);
color: var(--red);
transition: all 0.25s ease;

&:hover {
    box-shadow: 0 5px 10px rgba(0,0,0, 0.33);
    transform: translateY(-2px);
}
`

const InputWrapper = styled.div`
display: flex;
width: 100%;
`

const CrudWrapper = styled.div`
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
grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
grid-column-start: 1;
grid-column-end: 6;
border-bottom: 2px solid var(--black);
margin-bottom: 1rem;
`

const Border = styled.div`
display: grid;
grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
column-gap: 16px;
padding: 1rem;
background: whitesmoke;
border: 2px solid var(--black);
`

const Cell = styled.div`
display: grid;
grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
grid-column-start: 1;
grid-column-end: 6;
`

const Button = styled.button`
margin-left: 1rem;
font-weight: 600;
padding: 0.67rem 1rem;
border-radius: 12px;
border: 2px solid #57b40f;
background-color: rgba(87, 180, 15, 0.4);
color: rgb(87, 180, 15);
transition: all 0.25s ease;

&:hover {
    box-shadow: 0 5px 10px rgba(0,0,0, 0.25);
    transform: translateY(-2px);
}
`

const DefaultInput = styled.input`
position: relative;
padding: 0.5rem 1rem;
width: 12.5%;
border-radius: 12px;
border: 1px solid var(--black);
margin-right: 1rem;
`