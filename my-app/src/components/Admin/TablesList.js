import React from 'react';
import TableDataService from '../../services/table.services';
import styled from 'styled-components';


const TablesList = ({ getTables, tables}) => { 
    const deleteHandler = async (id) => {
        await TableDataService.deleteTable(id);
        getTables();
    };

    function convertKey(key) {
        var newKey = ''
         switch (key) {
             case 0:
                 newKey = '10am'
                 break;
             case 1:
                 newKey = '11am'
                 break;
             case 2:
                 newKey = '12pm'
                 break;
             case 3:
                 newKey = '1pm'
                 break;
             case 4:
                 newKey = '2pm'
                 break;
             case 5:
                 newKey = '3pm'
                 break;
             case 6:
                 newKey = '4pm'
                 break;
             case 7:
                 newKey = '5pm'
                 break;
             case 8:
                 newKey = '6pm'
                 break;
             case 9:
                 newKey = '7pm'
                 break;
             case 10:
                 newKey = '8pm'
                 break;
             case 11:
                 newKey = '9pm'
                 break;
             default:
                 break;
         }
         return newKey;
     }

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
            <select>
                {table.timeslot.map((value, key) =>(
                    <option value={key} key={key}>{convertKey(key)} : {value}</option>
                ))}
            </select>
            <ButtonGroup>
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
display: flex;
margin-top: 1.5vh;

@media (max-width: 479px) {
    margin-left: auto;
    margin-right: auto;
}
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

 @media (max-width: 479px) {
    font-size: 14px;
 }
`

const Border = styled.div`
height: 33vh;
overflow-y: scroll;
border: 2px solid var(--black);

@media (max-width: 479px) {
    width: 100%;
    overflow: scroll;
}
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
align-items: center;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-column-start: 1;
grid-column-end: 5;

& > select {
    height: 80%;
    width: 80%;
    max-width: 250px;
    padding-left: 5px;
    outline: none;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    background-color: #333;
    color: var(--pink);

    & > option{
        font-weight: 600;
        background-color: inherit;
    }
}

@media (max-width: 479px) {
    & > p {
        font-size: 12px;
        font-weight: 600;
    }

    & > select {
    height: 67%;
    padding-left: 5px;
    font-size: 12px;
    }
}
`
const Header = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-column-start: 1;
grid-column-end: 5;
border-bottom: 2px solid var(--black);
margin-bottom: 1rem;

@media (max-width: 479px){
    & > h1{
        font-size: 14px;
    }
}
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

@media (max-width: 479px){
    margin-right: 0%;
    padding: 5px 10px;
    font-size: 12px;
    width: 100%;
}
`