import React, { useState } from 'react';
import './Admin.css';
import styled from 'styled-components';
import AddTable from './AddTable';
import TablesList from './TablesList';

function Admin() {

    const [tableId, setTableId] = useState("");

    const getTableIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        setTableId(id);
      };

  return (
    <>
    <Navbar>
        <LogoLink href='/'>
            <Logo>
                cougar cafe
            </Logo>
        </LogoLink>
    </Navbar>  
    <Section>
        <Header>ADMIN PORTAL</Header>
        <TablesList getTableId={getTableIdHandler} />
        <AddTable id={tableId} setTableId={setTableId} />
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
`

const Logo = styled.div`
font-family: 'Work Sans';
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 1px; 
    font-style: italic;
    text-transform: capitalize;
`

const LogoLink = styled.a`
    text-decoration: none;
    color: white;
`

const Navbar = styled.nav`
display: flex;
align-items: center;
position: fixed;
top: 0;
right: 0;
left: 0;
height: 5vh;
background: linear-gradient(to left, var(--pink), var(--red));
margin-bottom: 2vh;
z-index: 999;
padding: 0vh 2vw;
`

const Section = styled.section`
display: flex;
flex-direction: column;
padding: 7vh 2vw 0vh 2vw;
`