import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Button, Form, Row, Alert} from 'react-bootstrap';
import EditingModal from "./EditingModal";
import Table from "react-bootstrap/Table";



const MAX_DESCRIPTION_LEN = 100;

const TABLE_HEADERS = [
    '#',
    'סוג התנדבות',
    'תאריך התחלה',
    'תאריך סיום',
    'עיר',
    'רחוב',
    'תאור',
];

const VolunteeringTable = () => {
    const [msg, setMsg] = useState('');
    const [volunteering, setVolunteering] = useState([]);
    const [volunteerType, setVolunteerType] = useState([]);
    const [filteredVolunteering, setFilteredVolunteering] = useState([]);
    const [searchType, setSearchType] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [item, setItem] = useState({});//update volunteer
    const [isEditing, setIsEditing] = useState(false);

    const sortByIncOrderByDate = (data) => {
        data = data.sort((a, b) => new Date(a.SDate) - new Date(b.SDate));
        return data;
    }

    const getVolunteering = async () => {
        let {data} = await axios.get(`/volunteering`);
        data = sortByIncOrderByDate(data);
        setVolunteering(data);
        setFilteredVolunteering(data);
    };


    const deleteVolunteering = async (id) => {
        try {
            await axios.delete(`/volunteering/${id}`);
            const filteredVols = volunteering.filter((v) => v._id !== id);
            setVolunteering(filteredVols);
            setFilteredVolunteering(filteredVolunteering.filter((v) => v._id !== id));
            setMsg('ההתנדבות נמחקה בהצלחה');
        } catch (e) {
            setMsg(e.message);
        }
    };


    const handleEdit = (item) => {
        console.log('editing')
        setIsEditing(true);
        setItem(item);
    };


    useEffect(() => {
        getVolunteering();
        const getVolunteerType = async () => {
            const {data} = await axios.get('/volunteerType');
            setVolunteerType(data);
        };
        getVolunteerType()
    }, []);

    const handleSearch = () => {
        let filteredData = volunteering;

        if (searchType !== '') {
            if (searchType === 'all') {
                filteredData = getVolunteering()
            } else {
                filteredData = filteredData.filter((item) => item.idVolunteerType?.Name === searchType);
            }
        }
        if (searchDate !== '') {
            const currentDate = new Date(searchDate);
            filteredData = filteredData.filter((item) => new Date(item.SDate) > currentDate);
            sortByIncOrderByDate(filteredData)
        }

        setFilteredVolunteering(filteredData);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/volunteering/updateVolunteer/${item._id}`, item);
            let index = volunteering.findIndex((v) => v._id === item._id);
            volunteering[index] = item;
            setVolunteering(volunteering);
            index = filteredVolunteering.findIndex((v) => v._id === item._id);
            filteredVolunteering[index] = item;
            setFilteredVolunteering(filteredVolunteering);
            setMsg('התנדבות עודכנה בהצלחה');
            setIsEditing(false);
        } catch (e) {
            console.log(e);
        }
    };
    const splitDescription = (data) =>
        data.map(item => {
            const truncatedDescription = item.Description.substring(0, MAX_DESCRIPTION_LEN);
            const truncatedDescriptionWithEllipsis = item.Description.length > MAX_DESCRIPTION_LEN ? truncatedDescription + '...' : truncatedDescription;

            return {
                ...item,
                Description: truncatedDescriptionWithEllipsis,
            };
        });


    return (
        <Container className="p-3 shadow-lg bg-light w-75 mt-5 rounded">
            <h1>טבלת התנדבויות</h1>
            <>
                <Form>
                    <Row>
                        <Form.Group controlId="searchType" className={'col-6'}>
                            <Form.Label>חיפוש לפי סוג התנדבות:</Form.Label>
                            <Form.Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                <option value="" disabled>בחר סוג התנדבות</option>
                                <option value={"all"}>הכל</option>
                                {volunteerType.map((type) => (
                                    <option key={type._id} value={type.Name}>
                                        {type.Name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="searchDate" className={'col-6'}>
                            <Form.Label>חיפוש לפי תאריך:</Form.Label>
                            <Form.Control type="date" value={searchDate}
                                          onChange={(e) => setSearchDate(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="searchButton">
                            <Button variant="primary" onClick={handleSearch}
                                    disabled={!(searchDate || searchType)}>
                                חיפוש
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </>
            <Alert variant="success" show={msg !== ''} onClose={() => setMsg('')} dismissible>
                {msg}
            </Alert>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>סוג התנדבות</th>
                    <th>תאריך התחלה</th>
                    <th>תאריך סיום</th>
                    <th>עיר</th>
                    <th>רחוב</th>
                    <th>תאור</th>
                    <th>מחיקה</th>
                    <th>עריכה</th>
                </tr>
                </thead>
                <tbody>
                {filteredVolunteering.map((item, index) => (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.idVolunteerType?.Name}</td>
                        <td>{item.SDate}</td>
                        <td>{item.NDate}</td>
                        <td>{item.idCity?.Name}</td>
                        <td>{item.Address}</td>
                        <td>{item.Description.substring(0, MAX_DESCRIPTION_LEN)} {item.Description.length > MAX_DESCRIPTION_LEN ? "..." : ""}</td>
                        <td>
                            <Button size='sm' onClick={() => deleteVolunteering(item._id)}>מחיקה</Button>
                        </td>
                        <td>
                            <Button size='sm' onClick={() => handleEdit(item)}>עריכה</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <a href={'/addVolunteering'} className={'btn shadow-lg border-info'}>להוספת התנדבות חדשה לחץ כאן</a>

            <EditingModal item={item} setIsEditing={setIsEditing } isEditing={isEditing} setItem={setItem}
                          handleUpdate={handleUpdate}/>
        </Container>
    );
};

export default VolunteeringTable;
