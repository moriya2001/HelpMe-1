import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useState, useEffect} from 'react';
import DateTimePicker from 'react-datetime-picker';
import {Container} from 'react-bootstrap';

import axios from 'axios';

function AddVolunteering() {
    const [sTime, setSTime] = useState(new Date())
    const [eTime, setETime] = useState(new Date())
    const [VolunteerType, setVolunteerType] = useState()
    const [city, setCity] = useState()
    const [volunteering, setVolunteering] = useState({})
    const addVolunteering = async () => {
        // volunteering.SDate=sTime
        console.log(volunteering)
        const {data} = await axios.post("http://localhost:8000/volunteering", volunteering)

    }
    const getVolunteering = async () => {
        const {data} = await axios.get("http://localhost:8000/volunteerType")
        console.log(data)
        setVolunteerType(data)
    }
    const getCity = async () => {
        const {data} = await axios.get("http://localhost:8000/city")
        console.log(data)
        setCity(data)
    }
    useEffect(() => {
        getVolunteering()
        getCity()
    }, [])
    return (
        <Container className={"mt-5 mx-auto w-50 bg-light rounded border border-dark p-3"}>
            <h1 className={"text-center"}>הוספת התנדבות</h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Select aria-label="Default select example" onChange={(e) => setVolunteering({
                            ...volunteering,
                            idVolunteerType: e.target.value
                        })}>
                            <option>סוג התנדבות</option>
                            {VolunteerType && VolunteerType.map((item) => {
                                    return <option key={item._id} value={item._id}>{item.Name}</option>
                                }
                            )}
                        </Form.Select>
                        {/* לשאול האם כדאי לעשות select */}
                        {/* <Form.Control type="text" placeholder="Enter type volunteering" onChange={e=>setNameVolunteering({Name:e.target.value})}/> */}
                    </Form.Group>
                    <Form.Select aria-label="Default select example"
                                 onChange={(e) => setVolunteering({...volunteering, idCity: e.target.value})}>
                        <option>תבחר את סוג העיר</option>
                        {city && city.map((item) => {
                                return <option key={item._id} value={item._id}>{item.Name}</option>
                            }
                        )}
                    </Form.Select>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>זמן התחלה:</Form.Label>
                        <DateTimePicker value={sTime} onChange={e => setVolunteering({...volunteering, SDate: e})}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>זמן סיום:</Form.Label>
                        <DateTimePicker value={eTime} onChange={e => setVolunteering({...volunteering, NDate: e})}/>
                    </Form.Group>

                </Row>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>כתובת</Form.Label>
                    <Form.Control placeholder="1234 Main St" type='text'
                                  onChange={(e) => setVolunteering({...volunteering, Address: e.target.value})}/>
                </Form.Group>


                <Row className="mb-3">


                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>תאור</Form.Label>
                        <Form.Control as="textarea" rows={3} type='text'
                                      onChange={e => setVolunteering({...volunteering, Description: e.target.value})}/>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit" onClick={() => {
                    addVolunteering()
                }} style={{backgroundColor: "#0FFE0"}}>
                    הוספת התנדבות
                </Button>
            </Form>
        </Container>
    );
}

export default AddVolunteering;
