import axios from "axios";
import React from "react";
// import {useSelector, useDispatch} from 'react-redux'
import {DEFAULT_VALUE, DEFAULT_FILTERS, IMAGES_TYPES, STATUSES} from './constants'
import {Form, Button, Card, Container, Modal, ButtonGroup, Row, Col} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import {useState, useEffect} from "react";

// import store from "../Redux-toolkit/store";
// import {selectUserId} from "../Redux-toolkit/usersSlice";


const SearchVolunteering = () => {
    const defaultFilters = DEFAULT_FILTERS;
    const [show, setShow] = useState(false);
    const [selectedVolunteering, setSelectedVolunteering] = useState({});
    const [msg, setMsg] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [VolunteerType, setVolunteerType] = useState([])
    const [volunteering, setVolunteering] = useState([])
    const [city, setCity] = useState("")
    // const [sTime, setSTime] = useState(new Date())
    // const [eTime, setETime] = useState(new Date())
    const [foundAllVolunteering, setAllFoundVolunteering] = useState([])
    const [foundFilterVolunteering, setFiletrFoundVolunteering] = useState([])
    const [filters, setFiletrs] = useState(defaultFilters);
    const currentUser = JSON.parse(localStorage["user"])//useSelector((state) => state.users.currentUser);

    const getVolunteeringType = async () => {
        const {data} = await axios.get("/volunteerType")
        console.log(data)
        setVolunteerType(data)
    }
    // const getVolunteering = async () => {
    //   const { data } = await axios.get("/volunteering")
    //   setVolunteering(data)
    // }
    const getCity = async () => {
        const {data} = await axios.get("/city")
        console.log(data)
        setCity(data)
    }

    const getAllVolunteerings = async () => {
        let {data} = await axios.get("/volunteering/search")
        console.log("data", data)
        setAllFoundVolunteering(data)
        setFiletrFoundVolunteering(data.msg);
    }
    useEffect(() => {
        getVolunteeringType()
        getCity()
        getAllVolunteerings()
    }, [])
    const search = () => {
        const filterVol = foundAllVolunteering.msg.filter(v => {
            if (filters.type === '-1' || (filters.type && v.idVolunteerType._id === filters.type)) {
                if (filters.city === '-1' || (filters.city && v.idCity._id === filters.city)) {
                    if (filters.startDate === '-1' || (filters.startDate && new Date(v.SDate) >= filters.startDate)) {
                        if (filters.endDate === '-1' || (filters.endDate && new Date(v.NDate) <= filters.endDate)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
        setFiletrFoundVolunteering(filterVol);
    }
    const confirmVlunteering = () => {
        alert("aaaa")
    }
    const sendVolunteeringRequest = async () => {
        try {
            const newUser = {
                userId: currentUser?._id,
                status: STATUSES.pending
            };
            const res = await axios.put(`/volunteering/addUser/${selectedVolunteering._id}`, newUser);
            handleClose();
            setMsg('בקשתך נשלחה בהצלחה');
        } catch (error) {
            setMsg('אירעה שגיאה. אנא נסה שנית מאוחר יותר.');
        }
    }
    const selectVolunteering = (item) => {
        setSelectedVolunteering(item);
        console.log(item);
        handleShow()
    }
    const onChangeFilter = (e, type) => {
        const newFilters = {...filters};
        if (['startDate', 'endDate'].includes(type)) {
            newFilters[type] = e;
        } else {
            newFilters[type] = e.target.value;
        }
        setFiletrs(newFilters);
    }
    const clearFilters = () => {
        setFiletrFoundVolunteering(foundAllVolunteering.msg);
        setFiletrs(defaultFilters);
    }
    return (
        <Container className={'p-5 min-vh-100 bg-dark bg-opacity-50'}>
            <Row className={'py-5 justify-content-center p-3'}>
                <Col xs={6} className={"p-3 bg-light shadow-lg rounded-3"}>
                    <h2 className={'text-center'}>חיפוש התנדבויות</h2>
                    <Form>
                        <Form.Group controlId="formType">
                            <Form.Label>תבחר את סוג ההתנדבות הרצויה</Form.Label>
                            <Form.Select value={filters.type} onChange={(e) => onChangeFilter(e, 'type')}>
                                <option value="-1">בחר סוג התנדבות</option>
                                {VolunteerType &&
                                    VolunteerType.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.Name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formCity" className={'my-3'}>
                            <Form.Label>תבחר את העיר</Form.Label>
                            <Form.Select value={filters.city} onChange={(e) => onChangeFilter(e, 'city')}>
                                <option value="-1">בחר עיר</option>
                                {city &&
                                    city.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.Name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formStartDate" className={'my-3'}>
                            <Form.Label>זמן התחלה</Form.Label>&nbsp;
                            <DateTimePicker
                                onChange={(e) => onChangeFilter(e, 'startDate')}
                                value={filters.startDate === '-1' ? new Date() : filters.startDate}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEndDate" className={'my-3'}>

                            <Form.Label>זמן סיום</Form.Label>&nbsp;
                            <DateTimePicker
                                onChange={(e) => onChangeFilter(e, 'endDate')}
                                value={filters.endDate === '-1' ? new Date() : filters.endDate}
                            />
                        </Form.Group>
                        <ButtonGroup aria-label="Basic example" className={'my-3 justify-content-center w-100'}>
                            <Button variant="primary" onClick={search} className={'mx-3'}>
                                <i className="fas fa-search"></i> חיפוש
                            </Button>
                            <Button variant="secondary" onClick={clearFilters}>
                                <i className="fas fa-trash-alt"></i> ניקוי החיפוש
                            </Button>
                        </ButtonGroup>
                    </Form>
                </Col>
            </Row>

            <Row className="volunteering-cards-wrapper">
                {foundFilterVolunteering && foundFilterVolunteering.map(item =>
                    <Col xs={12} md={6} lg={4} key={item._id}>
                        <Card style={{width: '18rem'}} id={item?._id} key={item?._id} className={'m-3'}>
                            <Card.Img variant="top" src={IMAGES_TYPES[item.idVolunteerType.Name]}
                                      className={'image-fluid'} alt={item.idVolunteerType.Name}/>
                            <Card.Body>
                                <Card.Title>{item.idVolunteerType.Name}</Card.Title>
                                <Card.Text>
                                    {item.Description}
                                </Card.Text>
                                <Card.Text>
                                    שעת התחלה:{new Date(item.SDate).toLocaleString()}
                                </Card.Text>
                                <Card.Text>
                                    שעת סיום:{new Date(item.NDate).toLocaleString()}
                                </Card.Text>
                                <Card.Text>
                                    עיר:{item.idCity.Name}
                                </Card.Text>
                                <Button variant="primary" onClick={() => {
                                    selectVolunteering(item)
                                }}>אני רוצה להתנדב</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>בקשתך להתנדבות זו תשלח למנהל , אישור ישלח לך במייל </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            בטל
                        </Button>
                        <Button variant="primary" onClick={sendVolunteeringRequest}>
                            אישור
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            {msg && <Modal show={!!msg} onHide={() => setMsg('')} className="text-right text-white" centered>
                <Modal.Header closeButton className="bg-dark">
                    <Modal.Title>הודעה</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {msg}
                </Modal.Body>
            </Modal>}
        </Container>
    )
}
export default SearchVolunteering

