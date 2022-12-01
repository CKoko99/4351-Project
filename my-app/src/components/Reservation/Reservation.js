import styles from './Reservation.module.css';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TimeIcon from '../../images/time.svg';
import DateIcon from '../../images/date.svg';
import PartyIcon from '../../images/group.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Timestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import NameIcon from '../../images/name.svg';
import DaysDataService from '../../services/days.service';
import {emptyTables} from '../emptyTables';


function Reservation() {

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

    const [phone, setPhone] = useState('')
    const [hide, setHide] = useState(true)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [tableNumber, setTableNumber] = useState([])
    const [partySize, setPartySize] = useState(1);
    const [index, setIndex] = useState(0);
    //const [count, setCount] = useState(0);
    const [currentDay, setCurrentDay] = useState({});
    const [days, setDays] = useState([]);
    const [dayId, setDayId] = useState('')
    const [timeslot, setTimeslot] = useState([
        'Available',
        'Available',
        'Available',
        'Available',
        'Available',
        'Available',
        'Available',
        'Available',
        'Available',
        'Available',
        'Available',
        'Available'
      ]);



          useEffect(() => {
            getDays();
            
    }, []);

    const getDays = async () => {
        const data = await DaysDataService.getAllDays();
        setDays(data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        })));

        
    };

    const handleDaysSumbit = async (e) => {
        e.preventDefault();

        if (selectedDate === null || selectedDate === undefined || selectedDate === '') {
            toast.error("Please select a date!", {
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
              return;
        }
        let exists = false;
        let currentId = ''
        let onlyDate = selectedDate.toDateString();
        let resArr = [];

       days.forEach(item => {
            if (onlyDate === item.date) {
                exists = true;
                currentId = item.id
                return;
            }
       });

       const newEntry = {
        Reservations: resArr,
        date: onlyDate,
        tables: emptyTables
       }
       
       if (!exists) {
        console.log("days: ",days);
            let content = newEntry;
            await DaysDataService.addDay(newEntry);
            days.forEach(item => {
                if (onlyDate === item.date) {
                    content = item;
                    return;
                }
           });
   
           setCurrentDay(content);
           setDayId(currentId);
           setHide(false);
       }
       else{
        const oldEntry = await DaysDataService.getDay(currentId);
        let content = oldEntry.data()
        
        content = {
            ...content,
            id: currentId
        }

        setCurrentDay(content);
        setDayId(currentId);
        setHide(false);
       }
    }

    const getAllTableNums = (e) => {
        if(e.target.checked) {
            setTableNumber(tableNumber => [...tableNumber, e.target.value]);

        } else if (!e.target.checked && tableNumber.length !== 0){
           
            setTableNumber(tableNumber.slice(0, -1));
            
        } 
        ;
    }

    // const updateCount = () => {
    //     let temp = 0;
    //    console.log(dayId)
    //     days.forEach(element => {
    //         if (element.id === dayId){
    //             element.tables.forEach(item => {
    //                 if (item.timeslot[index] === 'Available') {
    //                     temp += 1;
    //                 }
    //             });
    //         }
    //     });

    //     setCount(temp);
    //   }

    // useEffect(() => {
    //     updateCount();       
    // });

    const updateTimeslot = e => {
        setIndex(e.target.value);
       
        let newArr = [...currentDay.tables[e.target.value].timeslot];
        newArr[e.target.value] = "Not Available";
    
        setTimeslot(newArr);
      
      }
    

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (name === '' || email === '' || phone === '' || name === undefined || email === undefined || phone === undefined) {
            toast.error("All fields are mandatory!", {
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
              return;
        }

        let userSelection = [];
        let sumSize = 0;
        currentDay.tables.forEach(element => {
            tableNumber.forEach(num => {
                if(num === element.number){
                    userSelection.push(element);
                    sumSize += Number(element.size);
                }
            });
        });

        if (tableNumber.length === 0) {
            toast.error("Please select a table to reserve", {
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
            return;
        } else if (index === 0){
            toast.error("Make sure to choose a time slot!", {
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
            return;
        } else if (partySize === undefined || partySize === null || partySize === '' || partySize < 1 || partySize > 20) {
            toast.error("Party size must be between 1 to 20 guests!", {
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
            return;
        } else if (selectedDate === null || selectedDate === "" || selectedDate === undefined) {
            toast.error("Don't forget to choose a date for your reservation!", {
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
            return;
        } else if (partySize !== undefined || partySize !== null || partySize !== '' ){
            if(partySize <= 8 && partySize > sumSize || (partySize <= 8 && userSelection.length > 1)){
                toast.error("Your party size can fit on one table. If there are none available, please choose another date or time!", {
                    duration: 7000,
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
                return;
            } else if (partySize > 8 && partySize > sumSize || (partySize > 8  && ((sumSize - Number(partySize) ) > 1))){
                toast.error("Since your party is greater than our biggest table, We can only assign tables to your party greater than your party size or with a maximum of 1 empty seat. Please choose another date or time if there are no tables that can accomodate this!", {
                    duration: 10000,
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
                return;
            }
            
            else{
                try {
                    let mulitpleTables = []
                    let updateEntry = currentDay;
    
                    for (const element of userSelection) {
                        
                        element.timeslot = timeslot;
    
                        updateEntry.tables.forEach(item => {
                            if(item.number === element.number){
                                item = element;
                                return;
                            }
                        });
    
                        mulitpleTables.push(element.number);
                    }
    
                    updateEntry.Reservations.push({
                        name: name,
                        email: email,
                        phone: phone,
                        partySize: partySize,
                        table: mulitpleTables,
                        timeReserved: convertKey(Number(index)),
                        dateOfReservation: selectedDate.toDateString(),
                        created: Timestamp.now()
                    })
                    await DaysDataService.updateDays(currentDay.id, updateEntry);
                    toast.success("Your reservation has been completed!", {
                        duration: 5000,
                        style: {
                            background: 'var(--green)',
                            color: 'white',
                        },
                        iconTheme: {
                            primary: 'white',
                            secondary: 'var(--green)'
                        }
                    });
                    setName('');
                    setEmail('');
                    setPhone('');
                    setPartySize(1);
                    setHide(true);
                } catch (error) {
                    toast.error(error.message, {
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
                }
                
            }
        }
    } 
    

    return (
    <>
        <Toaster />
        <div className={styles.page}>
                <div className={styles.contentWrapper}>
                    <h1 className={styles.heading}>Book a Reservation</h1>
                    <DateCheck onSubmit={handleDaysSumbit}>
                        <DateWrapper>
                    <FormGroup>
                        <DateGroup>
                            <IconWrapper>
                                <Icon src={DateIcon} />
                            </IconWrapper>
                            <DatePicker
                            selected = {selectedDate}
                            onChange ={(date) => setSelectedDate(date)} 
                            className={styles.datepicker}
                            minDate = {new Date()}
                            placeholder="Choose a Date"
                            />
                        </DateGroup>
                    </FormGroup>
                    <Button type='submit'>Check date</Button>
                    </DateWrapper> 
                    </DateCheck>
                   

                    {hide ? null : 

                    <FlexWrapper>                        
                        <HeadingWrapper>
                         <TableHeading>Select Any Open Table Below</TableHeading> 
                        </HeadingWrapper>
                        <CheckboxGroup>
                            {currentDay.tables.map((element, key) => (
                                    element.timeslot[index] === 'Available' ?
                                    <CheckBox key={key}>
                                    <CheckBoxWrapper>
                                        <CheckBoxInput type='checkbox' value={element.number} onChange={e => getAllTableNums(e)} />
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
                                )
                                )}
                        </CheckboxGroup>
                    </FlexWrapper>
                    }
                    {hide ? null :
                 <Form onSubmit={handleSubmit}>
                    <FormWrapper>
                    <FormGroup>
                        <InputGroup>
                        <IconWrapper>
                            <Icon src={NameIcon}/>
                        </IconWrapper>
                        <FormControl
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        </InputGroup>
                    </FormGroup> 

                    <FormGroup>
                        <InputGroup>
                        <IconWrapper>
                            <Icon src={NameIcon}/>
                        </IconWrapper>
                        <FormControl
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </InputGroup>
                    </FormGroup> 

                    <FormGroup>
                        <InputGroup>
                        <IconWrapper>
                            <Icon src={NameIcon}/>
                        </IconWrapper>
                        <FormControl
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        </InputGroup>
                    </FormGroup>

                    </FormWrapper>
                        <FormWrapper>
                    <FormGroup>
                        <InputGroup>
                        <IconWrapper>
                            <Icon src={TimeIcon} />
                        </IconWrapper>
                        <FormSelect onChange={updateTimeslot}>
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

                    </FormWrapper>
                    <Button
                    type='submit'>Submit</Button>
                </Form>
                }
            </div>
        </div>
    </>)
}
export default Reservation;

const Button = styled.button`
margin-right: auto;
margin-left: auto;
border-radius: 12px;
border: 2px solid var(--black);
background-color: var(--green);
color: white;
padding: 0.75rem 2rem;
font-weight: 600;
transition: all 0.25s ease;

 &:hover {
     box-shadow: 0 5px 10px rgba(0,0,0, 0.25);
     transform: translateY(-2px);
 }

@media (max-width: 479px){
  font-size: 14px;
  margin-top: 1vh;
}
`


const FormWrapper = styled.div`
position: relative;
display: flex;
align-items: flex-start;
width: 100%;
z-index: 2;
margin-bottom: 1.5vh;

@media (max-width: 479px) {
    flex-direction: column;
}
`

const DateWrapper = styled(FormWrapper)`
align-items: center;
justify-content: center;

& > ${Button}{
    margin: 0;
}
`

const FormControl = styled.input`
width: 22vw;
max-width: 33ch;
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
  
}
`

const Form = styled.form`
z-index: 0;
width: 100%;
`
const DateCheck = styled(Form)`
z-index: 1;
`

const FormOption = styled.option`
`

const FormSelect = styled.select`
width: 22vw;
max-width: 33ch;
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

const DateGroup = styled(InputGroup)`

`

const FormGroup = styled.div`
z-index: 0;
margin-right: 3vw;

@media (max-width: 479px) {
    margin-right: 0;
}

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
        width: 25vw;
        height: 25vw;
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
padding: 0.5rem;
padding-bottom: 2vh;
margin-bottom: 2vh;
max-width: 1000px;

@media screen {
 margin: 3vh 0vw 5vh 0vw;   
}
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
width: 67vw;
max-width: 500px;
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
text-align: center;
`
const TableHeading = styled.div`
font-family: 'Roboto', sans-serif;
font-size: 1rem;
font-weight: 500;
color: white;
padding: 1rem 1rem;
margin-left: auto;
margin-right: auto;
`
