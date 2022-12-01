import React, { useState, useEffect } from 'react';
import './Admin.css';
import styled from 'styled-components';
import AddTable from './AddTable';
import TablesList from './TablesList';
import TableDataService from '../../services/table.services';

function Admin() {

    const [tableId, setTableId] = useState("");
    const [tables, setTables] = useState([]);

          useEffect(() => {
        getTables();
    }, []);

    const getTables = async () => {
        const data = await TableDataService.getAllTables();
        setTables(data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        })));
    };
    

  return (
    <>
    <Section>
        <Header>ADMIN PORTAL</Header>
        <TablesList getTables={getTables} tables={tables} />
        <AddTable id={tableId} setTableId={setTableId} tables={tables} />
    </Section>
    </>
  )
}

export default Admin;

const Header = styled.div`
display: flex;
width: 100%;
justify-content: center;
font-size: 4rem;
font-weight: 600;
text-transform: capitalize;

@media (max-width: 479px) {
    font-size: 12vw;
    font-weight: 800;
    margin: 1vh 0vw;
}
`

const Section = styled.section`
display: flex;
flex-direction: column;
padding: 6vh 2vw 2vh 2vw;

@media (max-width: 479px) {
  padding: 7vh 2vw 2vh 2vw;
}
`