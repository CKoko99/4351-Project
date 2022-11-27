import React, { useState, useEffect } from "react";
import TableDataService from "../../services/table.services";
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import NumberIcon from '../../images/number.svg';
import SizeIcon from '../../images/size.svg';

const AddTable = ({ id, setTableId, tablesArray }) => {
  const [number, setNumber] = useState("");
  const [size, setSize] = useState("");
  const [isReserved, setIsReserved] = useState("Available");
  const [flag, setFlag] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

        var tableNumError = false;

        tablesArray.forEach(element => {
            if(element.number === number){
                return tableNumError = true;
            }
        });

        if (number === "" || size === "") {
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
        } else if (tableNumError) {
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
            return;
        } else{
          const newTable = {
            number,
            size,
            isReserved,
            };
            console.log(newTable);
    
            try {
            if (id !== undefined && id !== "") {
                await TableDataService.updateTable(id, newTable);
                setTableId("");
                toast.success("Updated successfully!", {
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
            } else {
                await TableDataService.addTables(newTable);
                toast.success("New Book added successfully!", {
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
            }
            } catch (err) {
            toast.error(err.message, {
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
    
            setNumber("");
            setSize("");    
        }
  };

  const editHandler = async () => {
    try {
      const docSnap = await TableDataService.getTable(id);
      console.log("the record is :", docSnap.data());
      setNumber(docSnap.data().number);
      setSize(docSnap.data().size);
      setIsReserved(docSnap.data().isReserved);
    } catch (err) {
      toast.error(err.message, {
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
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <Toaster />
      <AddTableWrapper>
        
        <Form onSubmit={handleSubmit}>
        <Heading>Add or Update Tables</Heading>
          <FormGroup>
            <InputGroup>
              <IconWrapper>
                <Icon src={NumberIcon}/>
              </IconWrapper>
              <FormControl
                type="number"
                placeholder="Table Number"
                min="1"
                max="16"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <IconWrapper>
                <Icon src={SizeIcon} />
              </IconWrapper>
              <FormControl
                type="number"
                placeholder="Table Size"
                min="2"
                max="8"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </InputGroup>
          </FormGroup>
          <ButtonGroup>
            <Button
              disabled={flag}
              onClick={(e) => {
                setIsReserved("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <RedButton
              disabled={!flag}
              onClick={(e) => {
                setIsReserved("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </RedButton>
          </ButtonGroup>
          <CenterDiv>
            <BigButton type="Submit">
              Add/Update
            </BigButton>
          </CenterDiv>
        </Form>
      </AddTableWrapper>
    </>
  );
};

export default AddTable;

const CenterDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

const Heading = styled.h1`
text-align: center;
`

const Icon = styled.img`
height: 1.5rem;
`

const AddTableWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 33vh;
width: 100%;
`

const Button = styled.button`
margin-right: 0.5rem;
margin-left: 0;
border-radius: 12px;
border: 2px solid #333;
background-color: #333;
color: var(--green);
font-weight: 600;
padding: 0.4rem 1rem;
transition: all 0.25s ease;

 &:hover {
     box-shadow: 0 5px 10px rgba(0,0,0, 0.25);
     transform: translateY(-2px);
 }
`
const RedButton = styled(Button)`
color: var(--pink);
`
const BigButton = styled(Button)`
color: rgb(255, 203, 42);
padding: 0.67rem 1rem;
`

const ButtonGroup = styled.div`
display: flex;
justify-content: flex-start;
margin-bottom: 2rem;
`

const Form = styled.form`
width: 50%;
`

const FormGroup = styled.div`

`

const InputGroup = styled.div`
display: flex;
justify-content: flex-start;
margin-bottom: 1rem;
`

const IconWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: #333;
width: 3rem;
padding: 1rem 0rem;
border-top-left-radius: 12px;
border-bottom-left-radius: 12px;
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
`



