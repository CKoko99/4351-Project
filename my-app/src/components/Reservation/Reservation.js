// import { useSelector } from 'react-redux';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Reservation.module.css';
import React/*, { useState }*/ from 'react';
import styled from 'styled-components';


function Reservation() {
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    // const firstName = useSelector(state => state.auth.firstName);
    // const lastName = useSelector(state => state.auth.lastName);
    // const [selectedDate, setSelectedDate] = useState(null)
    return (
    <>
        <a className={styles.logoLink} href='/'>
            <div className={styles.logo}>
                cougar cafe
            </div>
        </a>
        <div className={styles.page}>
            <div className={styles.overlay}></div>

                <div className={styles.contentWrapper}>
                    <h1 className={styles.heading}>Select a Table Below</h1>
                    <FlexWrapper>                        <HeadingWrapper>
                        <Amount>8 Available</Amount>
                        <Legend>
                            <AvailabilityWrap>
                                <Circle empty/>
                                Available
                            </AvailabilityWrap>
                            <AvailabilityWrap>
                                <Circle />
                                Unavailable
                            </AvailabilityWrap>
                        </Legend>
                        </HeadingWrapper>
                        <CheckboxGroup>
                            <CheckBox>
                                <CheckBoxWrapper>
                                    <CheckBoxInput type='checkbox' />
                                    <CheckBoxTile>
                                        <CheckBoxIcon>
                                        
                                        </CheckBoxIcon>
                                        <CheckBoxLabel>2</CheckBoxLabel>
                                    </CheckBoxTile>
                                </CheckBoxWrapper>
                            </CheckBox>
                            <CheckBox>
                                <CheckBoxWrapper>
                                    <CheckBoxInput type='checkbox' />
                                    <CheckBoxTile>
                                        <CheckBoxIcon>
                                        
                                        </CheckBoxIcon>
                                        <CheckBoxLabel>2</CheckBoxLabel>
                                    </CheckBoxTile>
                                </CheckBoxWrapper>
                            </CheckBox>
                            <CheckBox>
                                <CheckBoxWrapper>
                                    <CheckBoxInput type='checkbox' />
                                    <CheckBoxTile>
                                        <CheckBoxIcon>
                                        
                                        </CheckBoxIcon>
                                        <CheckBoxLabel>4</CheckBoxLabel>
                                    </CheckBoxTile>
                                </CheckBoxWrapper>
                            </CheckBox>
                            <CheckBox>
                                <CheckBoxWrapper>
                                    <CheckBoxInput type='checkbox' />
                                    <CheckBoxTile>
                                        <CheckBoxIcon>
                                        
                                        </CheckBoxIcon>
                                        <CheckBoxLabel>4</CheckBoxLabel>
                                    </CheckBoxTile>
                                </CheckBoxWrapper>
                            </CheckBox>
                            <CheckBox>
                                <CheckBoxWrapper>
                                    <CheckBoxInput type='checkbox' />
                                    <CheckBoxTile>
                                        <CheckBoxIcon>
                                        
                                        </CheckBoxIcon>
                                        <CheckBoxLabel>6</CheckBoxLabel>
                                    </CheckBoxTile>
                                </CheckBoxWrapper>
                            </CheckBox>
                            <CheckBox>
                                <CheckBoxWrapper>
                                    <CheckBoxInput type='checkbox' />
                                    <CheckBoxTile>
                                        <CheckBoxIcon>
                                        
                                        </CheckBoxIcon>
                                        <CheckBoxLabel>6</CheckBoxLabel>
                                    </CheckBoxTile>
                                </CheckBoxWrapper>
                            </CheckBox>
                            <CheckBox>
                                <CheckBoxWrapper>
                                    <CheckBoxInput type='checkbox' />
                                    <CheckBoxTile>
                                        <CheckBoxIcon>
                                        
                                        </CheckBoxIcon>
                                        <CheckBoxLabel>8</CheckBoxLabel>
                                    </CheckBoxTile>
                                </CheckBoxWrapper>
                            </CheckBox>
                            <CheckBox>
                                <CheckBoxWrapper>
                                    <CheckBoxInput type='checkbox' />
                                    <CheckBoxTile>
                                        <CheckBoxIcon>
                                        
                                        </CheckBoxIcon>
                                        <CheckBoxLabel>8</CheckBoxLabel>
                                    </CheckBoxTile>
                                </CheckBoxWrapper>
                            </CheckBox>
                        </CheckboxGroup>
                    </FlexWrapper>

                </div>
                {/* <div className={styles.contentWrapper}>
                <h1 className={styles.heading}>Book a Reservation</h1>
                <div className={styles.inputFields}>

                    {isLoggedIn && <>
                        <div>First Name: {firstName}</div>
                        <div>Last Name: {lastName}</div>
                    </>}
                    {!isLoggedIn && <>
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </>}
                        <input type="number" min='1' placeholder="Number of People" />
                        <DatePicker
                        selected={selectedDate}
                        onChange={selectedDate => setSelectedDate(selectedDate)} 
                        className={styles.datePicker} placeholderText='Choose a date'
                        minDate={new Date()}
                        isClearable
                        popperPlacement='top-end'/>
                        </div>
                </div> */}
        </div>
    </>)
}
export default Reservation;

const CheckBoxLabel = styled.span`
font-size: 5rem;
color: #26030A;
font-style: italic;
font-weight: 800;
	transition: .375s ease;
	text-align: center;
`

const CheckBoxIcon = styled.span`
transition: .375s ease;
	color: #494949;
`

const CheckBoxTile = styled.span`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 7rem;
min-height: 7rem;
border-radius: 0.5rem;
border: 2px solid #26030A;
background-color: rgba(245, 246, 250, 0.4);
box-shadow: 0 5px 10px rgba(0,0,0, 0.25);
transition: 0.15s ease;
cursor: pointer;
position: relative;

&:before {
    content: "";
		position: absolute;
		display: block;
		width: 1.25rem;
		height: 1.25rem;
		border: 2px solid #b5bfd9;
		background-color: white;
		border-radius: 50%;
		top: 0.25rem;
		left: 0.25rem;
		opacity: 0;
		transform: scale(0);
		transition: 0.25s ease;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
		background-size: 12px;
		background-repeat: no-repeat;
		background-position: 50% 50%;   
}
&:hover {
		border-color:#568A2E;
        background-color: #e8eee9;
        box-shadow: 0 0 0 3px rgb(87, 180, 15);
		&:before {
			transform: scale(1);
			opacity: 1;
		}
	}
`

const CheckBoxInput = styled.input`
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;

    &:checked + ${CheckBoxTile} {
        border-color: #568A2E;
        box-shadow: 0 5px 10px rgba(0,0,0, 0.5);
        color: #2260ff;
        background: #e8eee9;
        &:before {
            transform: scale(1);
            opacity: 1;
            background-color:  #57b40f;
            border-color:  #57b40f;
        }

        ${CheckBoxIcon}, ${CheckBoxLabel} {
            color: #57b40f;
        }
    }
`

const CheckBoxWrapper = styled.label``

const CheckBox = styled.div``

const FlexWrapper = styled.div`
display: flex;
flex-direction: column;
background: var(--red);
width: 90vw;
height: 50vh;
z-index: 1;
border-radius: 12px;
box-shadow: rgb(0 0 0 / 50%) 0 2px 5px;
`

const CheckboxGroup = styled.fieldset`
grid-row-start: 2;
grid-row-end: 5;
grid-column-start: 1;
grid-column-end: 5;
display: flex;
flex-wrap: wrap;
justify-content: center;
user-select: none;
max-width: 600px;
margin-left: auto;
margin-right: auto;
border: none;
	& > * {
		margin: .5rem 0.5rem;
	}
`

// const MainGrid = styled.div`
// display: grid;
// grid-template-columns: 1fr 1fr 1fr 1fr;
// grid-template-rows: 1fr 1fr 1fr 1fr;
// background: var(--red);
// width: 90vw;
// height: 60vh;
// z-index: 1;
// row-gap: 1rem;
// column-gap: 1rem;
// border-radius: 12px;
// box-shadow: rgb(0 0 0 / 50%) 0 2px 5px;
// `
const HeadingWrapper = styled.div`
/* grid-row-start: 1;
grid-row-end: 2;
grid-column-start: 1;
grid-column-end: 5; */
`
const Amount = styled.div`
font-family: 'Roboto', sans-serif;
font-size: 1rem;
font-weight: 500;
color: white;
padding: 1rem 1rem;
`

const Legend =styled.legend`
display: flex;
align-items: flex-start;
justify-content: flex-start;
`
const AvailabilityWrap = styled.div`
display: flex;
font-weight: 500;
color: white;
align-items: flex-start;
justify-content: flex-start;
padding: 0.75rem 1rem;
`
const Circle = styled.div`
width: 12px;
height: 12px;
${props => props.empty ? `background: none;`: `background: #FDEDF0;`};
${props => props.empty ? `border: 2px solid var(--pink);` : `border: 2px solid #FDEDF0;`};
border-radius: 50%;
margin-right: 0.5rem;
`
