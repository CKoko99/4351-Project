import React from 'react';
import styled from 'styled-components'

function Navbar() {
  return (
    <NavbarWrapper>
        <LogoLink href='/'>
            <Logo>
                cougar cafe
            </Logo>
        </LogoLink>
    </NavbarWrapper>
  )
}

export default Navbar;

const Logo = styled.div`
font-family: 'Work Sans';
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 1px; 
    font-style: italic;
    text-transform: capitalize;

    @media (max-width: 479px){
        font-size: 1.2rem;
    }
`

const LogoLink = styled.a`
    text-decoration: none;
    color: white;
`

const NavbarWrapper = styled.nav`
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

@media (max-width: 479px) {
    height: 7vh;
}
`