import React, { useState, useEffect } from 'react';
import TableDataService from '../../services/table.services';
import styled from 'styled-components';


const TablesList = ({ getTableId}) => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        getTables();
    }, []);

    const getTables = async () => {
        const data = await TableDataService.getAllTables();
        console.log(data.docs);
        setTables(data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        })));
    };
    
    const deleteHandler = async (id) => {
        await TableDataService.deleteTable(id);
        getTables();
    };

  return (
    <>
    <Border>
    <BorderGrid>
        <Header>
            <h1>Table Number</h1>
            <h1>Table Size</h1>
            <h1>Status</h1>
            <h1>Action</h1>
        </Header>
    {tables.map((table, index) => {
        return (
        <Cell key={index}> 
            <p>{table.number}</p>
            <p>{table.size}</p>
            <p>{table.isReserved}</p>
            <ButtonGroup>
                <EditButton onClick={(e) => getTableId(table.id)}>Edit</EditButton>
                <SmallButton onClick={(e) => deleteHandler(table.id)}>Delete</SmallButton>
            </ButtonGroup> 
        </Cell>
    )})}
    </BorderGrid>
    </Border>
    <RefreshWrap>
        <Button onClick={getTables}>
            Refresh List
        </Button>
    </RefreshWrap>
    </>
  )
}

export default TablesList;

const RefreshWrap = styled.div`
margin-top: 1.5rem;
`

const Button = styled.button`
margin-right: 0.5rem;
margin-left: 0;
border-radius: 12px;
border: 2px solid #333;
background-color: #333;
color: var(--pink);
font-weight: 600;
padding: 0.4rem 1rem;
transition: all 0.25s ease;

 &:hover {
     box-shadow: 0 5px 10px rgba(0,0,0, 0.25);
     transform: translateY(-2px);
 }
`

const Border = styled.div`
height: 40vh;
overflow-y: scroll;
border: 2px solid var(--black);
`

const ButtonGroup = styled.div`
display: flex;
width: 100%;
`

const BorderGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
column-gap: 16px;
padding: 1rem;
background: whitesmoke;
`

const Cell = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-column-start: 1;
grid-column-end: 5;
`
const Header = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-column-start: 1;
grid-column-end: 5;
border-bottom: 2px solid var(--black);
margin-bottom: 1rem;
`
const SmallButton = styled.button`
padding: 0.33rem 1rem;
margin-left: 0;
margin-right: 0.5rem;
font-weight: 600;
border-radius: 12px;
border: 2px solid var(--red);
background-color: rgba(200, 16, 46, 0.25);
color: var(--red);
transition: all 0.25s ease;

&:hover {
    box-shadow: 0 5px 10px rgba(0,0,0, 0.33);
    transform: translateY(-2px);
}
`
const EditButton = styled(SmallButton)`
border: 2px solid var(--green);
background-color: rgba(87, 180, 15, 0.25);
color: var(--green);
`