import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Reservation.module.css';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TableDataService from '../../services/table.services';
import TimeIcon from '../../images/time.svg';
import DateIcon from '../../images/date.svg';
import PartyIcon from '../../images/group.svg';

function Reservation() {
    const [tableId, setTableId] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [partySize, setPartySize] = useState(1);
    const [index, setIndex] = useState(0);
    const [count, setCount] = useState(0);
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

    const updateCount = () => {
        let temp = 0;
        tables.forEach(element => {
            if (element.timeslot[index] === 'Available') {
                temp += 1;
            }
        });

        setCount(temp);
      }

    useEffect(() => {
        updateCount();
    });

    const getAllIds = (e) => {
        if(e.target.checked) {
            setTableId(tableId => [...tableId, e.target.value]);

        } else if (!e.target.checked && tableId.length !== 0){
           
            setTableId(tableId.slice(0, -1));
            
        } 
    }
      
    return (
    <>
        <div className={styles.page}>
            <div className={styles.overlay}></div>

                <div className={styles.contentWrapper}>
                    <h1 className={styles.heading}>Book a Reservation</h1>
                    <Form>
                        <FormWrapper>
                    <FormGroup>
                        <InputGroup>
                        <IconWrapper>
                            <Icon src={TimeIcon} />
                        </IconWrapper>
                        <FormSelect value={index} onChange={e => setIndex(e.target.value)}>
                            <FormOption hidden={true} defaultValue=''>Choose a Time Slot</FormOption>
                            <FormOption value={0}>10am</FormOption>
                            <FormOption value={1}>11am</FormOption>
                            <FormOption value={2}>12pm</FormOption>
                            <FormOption value={3}>1pm</FormOption>
                            <FormOption value={4}>2pm</FormOption>
                            <FormOption value={5}>3pm</FormOption>
                            <FormOption value={6}>4pm</FormOption>
                            <FormOption value={7}>5pm</FormOption>
                            <FormOption value={8}>6pm</FormOption>
                            <FormOption value={9}>7pm</FormOption>
                            <FormOption value={10}>8pm</FormOption>
                            <FormOption value={11}>9pm</FormOption>
                        </FormSelect>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <InputGroup>
                        <IconWrapper>
                            <Icon src={PartyIcon}/>
                        </IconWrapper>
                        <FormControl
                            type="number"
                            placeholder="Party Size"
                            min="1"
                            max="20"
                            value={partySize}
                            onChange={(e) => setPartySize(e.target.value)}
                        />
                        </InputGroup>
                    </FormGroup>
                                
                    <FormGroup>
                        <InputGroup>
                            <IconWrapper>
                                <Icon src={DateIcon} />
                            </IconWrapper>
                            <DatePicker
                                selected={selectedDate}
                                className={styles.datepicker}
                                onChange={selectedDate => setSelectedDate(selectedDate)} 
                                placeholderText='Choose a date'
                                minDate={new Date()}
                                isClearable
                                />
                        </InputGroup>
                    </FormGroup>
                    </FormWrapper>
                    <FlexWrapper>                        
                        <HeadingWrapper>
                        <Amount>{count} Available</Amount>
                        </HeadingWrapper>
                        <CheckboxGroup>
                            {tables.map((element) =>(
                               element.timeslot[index] === 'Available' ?
                                <CheckBox  key={element.id}>
                                    <CheckBoxWrapper>
                                        <CheckBoxInput type='checkbox' value={element.id} onChange={e => getAllIds(e)}/>
                                        <CheckBoxTile>
                                            <CheckBoxLabel>{element.size}</CheckBoxLabel>
                                            <CheckBoxTitle>
                                                Table {element.number}
                                            </CheckBoxTitle>
                                        </CheckBoxTile>
                                    </CheckBoxWrapper>
                                </CheckBox>
                                :
                                null
                            ))}
                        </CheckboxGroup>
                    </FlexWrapper>
                    <br></br>
                    <button onClick={(e)=>{e.preventDefault(); console.log(tableId)}}>test</button>
                </Form>
            </div>
        </div>
    </>)
}
export default Reservation;

const FormWrapper = styled.div`
position: relative;
display: flex;
align-items: flex-start;
width: 90%;
z-index: 2;
margin-bottom: 1.5vh;
`

const FormControl = styled.input`
width: calc(100% - 3rem);
border-top-right-radius: 12px;
border-bottom-right-radius: 12px;
border: 1px solid #333;
padding: 1rem 2rem;
outline: none;
font-weight: 600;

&:focus{
  border: 2px solid #333;
}

&::placeholder{
  font-weight: normal;
}

@media (max-width: 479px){
  padding: 0.25rem 1rem;
}
`

const Form = styled.form`
z-index: 0;
`

const FormOption = styled.option`
`

const FormSelect = styled.select`
border-top-right-radius: 12px;
border-bottom-right-radius: 12px;
border: 1px solid #333;
padding: 1rem 1rem;
outline: none;
font-weight: 600;

&:focus{
  border: 1px solid var(--red);
}

@media (max-width: 479px) {
  padding: 0.33rem 1rem;
}
`

const Icon = styled.img`
width: 1.2rem;
`

const IconWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: var(--red);
width: 3rem;
padding: 1rem 0rem;
border-top-left-radius: 12px;
border-bottom-left-radius: 12px;

@media (max-width: 479px) {
  padding: 0.33rem 0rem;
}
`

const InputGroup = styled.div`
display: flex;
justify-content: flex-start;

@media (max-width: 479px) {
  margin-bottom: 1.5vh;
}
`

const FormGroup = styled.div`
z-index: 0;
margin-right: 1vw;
`

const CheckBoxTitle = styled.span`
    color: var(--black);
    font-size: 15px;
`

const CheckBoxLabel = styled.span`
font-size: 6vh;
color: #26030A;
font-style: italic;
font-weight: 800;
	transition: .375s ease;
	text-align: center;
`

const CheckBoxTile = styled.span`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 5px 0px;
width: 10vh;
height: 10vh;
min-height: 50px;
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

    @media (max-width: 479px) {
        width: 12vh;
        height: 12vh;
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

        ${CheckBoxTitle}, ${CheckBoxLabel} {
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
justify-content: flex-start;
user-select: none;
width: 50vw;
max-width: 750px;
margin-left: auto;
margin-right: auto;
border: none;
	& > * {
		margin: .5rem 0.5rem;
	}
@media (max-width: 479px){
    width: auto;

    & > * {
        margin: 1vh 1.5vw;
    }
}
`

const HeadingWrapper = styled.div`

`
const Amount = styled.div`
font-family: 'Roboto', sans-serif;
font-size: 1rem;
font-weight: 500;
color: white;
padding: 1rem 1rem;
`
