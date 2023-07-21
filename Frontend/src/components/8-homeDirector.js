import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Modal, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import emailjs from 'emailjs-com';
import moment from 'moment';
import {STASUSES, DATE_FORMATE, MAX_DESCRIPTION_LEN} from './constants'
import Table from "react-bootstrap/Table";

const getDate = (date) => date.slice(0, 10)
const getHour = (date) => date.slice(11, 16)
const HomeDirector = () => {
    const [volunteeringTovolunteer, setVolunteeringTovolunteer] = useState([]);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [msg, setMsg] = useState('');
    const getVolunteeringToVolunteer = async () => {
        try {
            const volunteersResponse = await axios.get('/volunteering/getPendingVolunteerings');
            const typesResponse = await axios.get('/volunteerType');

            const volunteers = volunteersResponse.data;
            const types = typesResponse.data;

            const volunteerTypesMap = {};

            types.forEach((type) => {
                volunteerTypesMap[type._id] = {
                    idVolunteerType: type,
                    volunteers: [],
                    users: {}
                };
            });
            volunteers.forEach((volunteer) => {
                const typeId = volunteer.idVolunteerType._id;
                if (volunteerTypesMap[typeId]) {
                    volunteerTypesMap[typeId].volunteers.push(volunteer);

                    // Group users within each category
                    const userId = volunteer.idVolunteerUser?._id;
                    if (!volunteerTypesMap[typeId].users[userId]) {
                        volunteerTypesMap[typeId].users[userId] = [];
                    }
                    volunteerTypesMap[typeId].users[userId].push(volunteer.idVolunteerUser);
                }
            });

            for (const typeId in volunteerTypesMap) {
                const usersObj = volunteerTypesMap[typeId].users;
                for (const userId in usersObj) {
                    usersObj[userId].sort((a, b) => a.idVolunteerUser?.FirstName.localeCompare(b.idVolunteerUser?.FirstName));
                }
            }

            const groupedVolunteersArray = Object.values(volunteerTypesMap);
            setVolunteeringTovolunteer(groupedVolunteersArray);
            const initialOpenSections = {};
            volunteeringTovolunteer.forEach((volunteer, index) => {
                initialOpenSections[index] = false;
            });
            setOpenSections(initialOpenSections);
            console.log(groupedVolunteersArray)
            setMsg('')
        } catch (error) {
            setMsg('An error occurred while fetching data');
        }
    };


    const handleToggleSection = (index) => {
        setOpenSections((prevOpenSections) => ({
            ...prevOpenSections,
            [index]: !prevOpenSections[index],
        }));
    };

    const updateStatus = async (id) => {
        try {
            // Update the volunteer status to "approve"
            await axios.put(`/volunteering/${id}`, {Status: 'approve'});
            // Find the volunteer with the given id and update the status in the local state
            setVolunteeringTovolunteer((prevVolunteers) =>
                prevVolunteers.map((volunteer) =>
                    volunteer._id === id ? {...volunteer, Status: 'approve'} : volunteer
                )
            );

            // Send the approval email
            const selectedVol = volunteeringTovolunteer.find((v) => v._id === id);
            await emailjs.send(
                'service_7rzvtwg', 'approve',
                {
                    to_user: selectedVol.idVolunteerUser?.FirstName,
                    vol_type: selectedVol.idVolunteerType.Name,
                    vol_adress: selectedVol.Address,
                    vol_date: moment(selectedVol.SDate).format(DATE_FORMATE),
                    vol_endDate: moment(selectedVol.NDate).format(DATE_FORMATE),
                    userEmail: selectedVol.idVolunteerUser.Email,
                },
                'cubY8Y-jimY937YfV'
            );
            setMsg('Volunteer status updated successfully!');
        } catch (error) {
            setMsg('An error occurred while updating volunteer status.');
        }
    };

    useEffect(() => {
        getVolunteeringToVolunteer();
    }, []);

    // Group volunteers by user ID
    const volunteersByUser = volunteeringTovolunteer.reduce((groups, volunteer) => {
        const userId = volunteer.idVolunteerUser?._id;
        if (!groups[userId]) {
            groups[userId] = [];
        }
        groups[userId].push(volunteer);
        return groups;
    }, {});

    const handleOpenModal = (users, name) => setSelectedVolunteer(users);

    return (
        <Container className="align-items-center justify-content-center bg-light min-vh-100">
            <h2 className="text-center mb-4 rounded-3 p-3 mb-5 bg-white rounded">התנדבויות ממתינות לאישור</h2>
            <Button className={'btn-sm shadow-lg mx-5'} onClick={() => setOpenSections((prevOpenSections) => {
                const allOpen = Object.values(prevOpenSections).every((isOpen) => isOpen);
                const newOpenState = Object.keys(prevOpenSections).reduce((acc, index) => {
                    acc[index] = !allOpen;
                    return acc;
                }, {});
                return newOpenState;
            })}>
                {Object.values(openSections).every((isOpen) => isOpen) ? "Collapse All" : "Expand All"}
            </Button> <Row>
            {msg && <Alert variant={'danger'} className={'col-6 mx-auto text-start'}
                           onClose={() => setMsg('')}>{msg}</Alert>}
        </Row>
            <Row>
                <Col xs={10} className={'p-5 mx-auto'}>
                    <>
                        {volunteeringTovolunteer.map((volunteer, index) => {
                            return (
                                <section key={index}>
                                    <h4 className={'text-center'}>{volunteer.idVolunteerType?.Name}
                                    </h4>
                                    <Button size={'sm'} onClick={() => handleToggleSection(index)} variant="secondary">
                                        <i className={`fa fa-${openSections[index] ? 'minus' : 'plus'}`}></i>
                                    </Button>
                                    {openSections[index] && (
                                        <VolunteerTable volunteer={volunteer} handleOpenModal={handleOpenModal}/>)}
                                    <hr/>
                                </section>
                            );
                        })}
                    </>
                </Col>
            </Row>
            <VolunteerModal selectedVolunteer={selectedVolunteer} onHide={() => setSelectedVolunteer(null)}
                            handleOpenModal={handleOpenModal} updateStatus={updateStatus}/>
        </Container>
    );
};

export default HomeDirector;

const VolunteerModal = ({selectedVolunteer, handleOpenModal, updateStatus, onHide}) => {
    return (
        <Modal show={!!selectedVolunteer} onHide={onHide}>
            <Modal.Body>
                <Modal.Title>רשימת המתנדבים</Modal.Title>
                <Table striped color={'dark'}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>התנדבות</th>
                        <th>מתנדב</th>
                        <th>גיל</th>
                        <th>מין</th>
                        <th>לבבות</th>
                        <th>צפייה בפרטים</th>
                        <th>אישור</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedVolunteer &&
                        Object.values(selectedVolunteer).map(([item, key], index) => (
                            <tr key={index + item.FirstName}>
                                <td>{index + 1}</td>
                                <td>{item?.Name}</td>
                                <td>{item.FirstName}</td>
                                <td>{item.Age}</td>
                                <td>{item.Gender}</td>
                                <td>{item.Coins || 0}</td>
                                <td>
                                    <Button
                                        variant="light"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleOpenModal(item)}
                                    >
                                        <i className="fa fa-light fa-user fa-sm"></i>
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        className="btn btn-primary btn-sm btn-light"
                                        onClick={() => updateStatus(item._id)}
                                    >
                                        <i className={'fa fa-check fa-sm'}></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}

const VolunteerTable = ({volunteer, handleOpenModal}) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>סוג התנדבות</th>
                <th>תאריך התחלה</th>
                <th>שעת התחלה</th>
                <th>תאריך סיום</th>
                <th>שעת סיום</th>
                <th>עיר</th>
                <th>רחוב</th>
                <th>תאור</th>
                <th>צפייה</th>
            </tr>
            </thead>
            <tbody>
            {volunteer.volunteers.map((item, index) => {
                return (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.idVolunteerType?.Name}</td>
                        <td>{getDate(item.SDate)}</td>
                        <td>{getHour(item.SDate)}</td>
                        <td>{getDate(item.NDate)}</td>
                        <td>{getHour(item.NDate)}</td>
                        <td>{item.idCity?.Name}</td>
                        <td>{item.Address}</td>
                        <td>
                            {item.Description?.slice(0, MAX_DESCRIPTION_LEN)}{' '}
                            {item.Description?.length > MAX_DESCRIPTION_LEN ? '...' : ''}
                        </td>
                        <td>
                            <Button
                                variant="light"
                                className="btn btn-primary btn-sm"
                                onClick={() => handleOpenModal(volunteer.users, item.idVolunteerType?.Name)}
                            >
                                <i className="fa fa-inbox"></i>
                            </Button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </Table>
    )
}
