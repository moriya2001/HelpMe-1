import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Modal, Row, Table} from 'react-bootstrap';
import axios from 'axios';
import emailjs from 'emailjs-com';
import moment from 'moment';
import {
    APPROVED_SUCCESSFULLY,
    DATE_FORMATE,
    EMAIL_SERVICE_ID,
    EMAIL_USER_ID,
    FETCH_ERROR,
    MAX_DESCRIPTION_LEN,
    UPDATE_ERROR,
    BUTTONS
} from './constants'
import ProfileModal from "./ProfileModal";


const getDate = (date) => date.slice(0, 10)
const getHour = (date) => date.slice(11, 16)
const VolunteeringToApprove = (props) => {
    const [volunteeringVolunteer, setVolunteeringVolunteer] = useState([]);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [openSections, setOpenSections] = useState([]);
    const [userToDisplay, setUserToDisplay] = useState(null);
    const [isToExpandAll, setIsToExpandAll] = useState(true);
    const {setMsg} = props;

    const handleToggleSection = (index) =>
        setOpenSections((prevOpenSections) => {
            const openSections = {...prevOpenSections};
            openSections[index] = !openSections[index];
            return openSections;
        })
    const sortByFullName = (a, b) => {
        return (a?.FirstName.localeCompare(b?.FirstName)
            || a?.LastName.localeCompare(b?.LastName));
    }
    const sortByStartEndDate = (a, b) => (moment(a.SDate).diff(moment(b.SDate)) || moment(a.NDate).diff(moment(b.NDate)));
    const sortUsersAndVolunteerings = (volunteersByType) => {
        Object.values(volunteersByType).forEach((type) => {
            // sort by date
            // type.volunteers.sort(sortByStartEndDate);
            type.volunteers.forEach((volunteer) => {
                volunteer.Users = volunteer.Users.sort((a, b) => sortByFullName(a.user, b.user));
            });
        });
    };
    const getVolunteeringToVolunteer = async () => {
        try {
            const volunteersResponse = await axios.get('/volunteering/getPendingVolunteerings');
            const typesResponse = await axios.get('/volunteerType');
            const volunteersToApprove = volunteersResponse.data;
            const volTypes = typesResponse.data;
            const volunteersByType = volTypes.reduce((acc, type) => {
                acc[type._id] = {
                    idVolunteerType: type._id,
                    typeName: type.Name,
                    volunteers: []
                }
                return acc;
            }, {});
            // Map volunteers to their types
            volunteersToApprove.forEach((volunteer) => {
                const type = volunteer.idVolunteerType;
                // check if valid type
                if (!type || !volTypes.find((volType) => volType._id === type._id)) {
                    return;
                }
                const currVolType = volunteersByType[type._id];
                let currVolunteers = currVolType.volunteers;
                // Add volunteer to the relevant type if not already there
                if (!currVolunteers.find((volunteering) => volunteering._id === volunteer._id))
                    currVolunteers.push(volunteer);
            });
            // sorting users and volunteerings
            sortUsersAndVolunteerings(volunteersByType);

            setVolunteeringVolunteer(Object.values(volunteersByType));
            // Init all sections to be closed
            setOpenSections(Array(Object.values(volunteersByType).length).fill(false));
        } catch (e) {
            setMsg(FETCH_ERROR);
        }
    }
    const sendEmail = async (user, selectedVol) => {
        await emailjs.send(EMAIL_SERVICE_ID, 'approve', {
            to_user: `${user?.FirstName} ${user.LastName}`,
            userEmail: user.Email,
            vol_type: selectedVol.idVolunteerType.Name,
            vol_address: selectedVol.Address,
            vol_date: moment(selectedVol.SDate).format(DATE_FORMATE),
            vol_endDate: moment(selectedVol.NDate).format(DATE_FORMATE),
            from_name: 'מערכת התנדבויות',
            message: `התנדבותך ל${selectedVol.idVolunteerType?.Name} אושרה בהצלחה!`
        }, EMAIL_USER_ID);
    }
    const updateStatus = async (userObj, status) => {
        try {
            const volunteer = selectedVolunteer.volunteer;
            await axios.put(`/volunteering/updateStatus/${volunteer._id}`, {
                idVolunteerUser: userObj._id,
                status: status
            });
            console.log(1)
            const type = volunteeringVolunteer.find((type) => type.idVolunteerType === volunteer.idVolunteerType._id);
            console.log("then", type)
            // delete the user volunteering from the list
            let currVolunteering = type.volunteers.find((volunteering) => volunteering._id === volunteer._id);

            console.log(2)
            if (currVolunteering.Users.length === 1) {
                console.log(12)

                // remove it
                const index = type.volunteers.indexOf(currVolunteering);
                if (index !== -1)
                    type.volunteers.splice(index, 1);
            } else {
                console.log(11)

                const userIndex = currVolunteering.Users.findIndex((user) => user._id === userObj._id);
                if (userIndex !== -1)
                    currVolunteering.Users.splice(userIndex, 1);
            }
            console.log(3)

            setVolunteeringVolunteer((prev) => {
                const toUpdate = {...prev};
                toUpdate[volunteer.idVolunteerType._id] = type;
                return toUpdate;
            })
            //TODO: add reject msg emailjs!!!
            await sendEmail(userObj, volunteer);
            // update the volunteeringVolunteer
            setMsg(APPROVED_SUCCESSFULLY);
        } catch
            (e) {
            setMsg(UPDATE_ERROR);
        }

    }
    useEffect(() => {
        getVolunteeringToVolunteer();
    }, []);
    // ====================================================================================================

    const handleOpenModal = (users, volunteer) => setSelectedVolunteer({users: users, volunteer: volunteer});
    const handleCloseModal = () => setUserToDisplay(null);
    const handleShowProfile = (user) => setUserToDisplay(user);
    const isSectionsExpanded = () => Object.keys(openSections).length > 0 && !Object.values(openSections).some((isOpen) => !isOpen);
    const toggleExpandedAll = () => {
        setIsToExpandAll(!isSectionsExpanded());
        setOpenSections(Array(Object.keys(openSections).length).fill(isToExpandAll));
    };

    return (
        <Container className="align-items-center justify-content-center bg-light min-vh-100">
            <h2 className="text-center mb-4 rounded-3 p-3 mb-5 bg-white rounded">התנדבויות ממתינות לאישור</h2>
            <Button className={'btn-sm shadow-lg mx-5 mb-5'} onClick={toggleExpandedAll} variant="secondary">
                <i className={`fa fa-${isToExpandAll ? 'expand' : 'compress'}`}></i> {isSectionsExpanded() ? 'כווץ הכל' : 'הרחב הכל'}
            </Button>
            <Row>
                <Col className={'p-5 mx-auto'}>
                    <>
                        {Object.values(volunteeringVolunteer).map((volunteer, index) => {
                            return (
                                <section key={index}>
                                    <h4 className={'text-center'}>{volunteer.typeName}</h4>
                                    <Button size={'sm'} onClick={() => handleToggleSection(index)}
                                            variant="secondary">
                                        <i className={`fa fa-${openSections[index] ? 'minus' : 'plus'}`}></i>
                                    </Button>
                                    {openSections[index] && (
                                        <VolunteerTable volunteer={volunteer} handleOpenModal={handleOpenModal}/>
                                    )}
                                    <hr/>
                                </section>
                            );
                        })}
                    </>
                </Col>
            </Row>
            <VolunteerModal selectedVolunteer={selectedVolunteer} onHide={() => setSelectedVolunteer(null)}
                            handleOpenModal={handleShowProfile} updateStatus={updateStatus}/>
            <ProfileModal handleCloseModal={handleCloseModal} showModal={!!userToDisplay}
                          selectedVolunteer={userToDisplay}/>

        </Container>
    );
}
const VolunteerModal = ({selectedVolunteer, handleOpenModal, updateStatus, onHide}) => {
    return (
        <Modal show={!!selectedVolunteer} onHide={onHide} size="lg" centered>
            <Modal.Body className={'text-center'}>
                <Modal.Title>רשימת המתנדבים</Modal.Title>
                <Table striped color={'dark'} bordered hover responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>שם פרטי</th>
                        <th>שם משפחה</th>
                        <th>גיל</th>
                        <th>מין</th>
                        <th>לבבות</th>
                        <th>צפייה בפרטים</th>
                        <th>אישור</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedVolunteer && selectedVolunteer.users.map((userObj, index) => {
                        const {user} = userObj;
                        if (!user) return null;
                        return (
                            <tr key={index + user.FirstName}>
                                <td>{index + 1}</td>
                                <td>{user.FirstName}</td>
                                <td>{user.LastName}</td>
                                <td>{user.Age}</td>
                                <td>{user.Gender}</td>
                                <td>{user.Coins || 0}</td>
                                <td><Button
                                    variant="light"
                                    className="btn btn-sm"
                                    onClick={() => handleOpenModal(user)}
                                ><i className="fa fa-light fa-user fa-sm"></i>
                                </Button></td>
                                <td>
                                    <Row className={'mx-auto'}>
                                        <>
                                            {BUTTONS.map((item, index) => {
                                                return (
                                                    <Col xs={6} key={index}>
                                                        <Button className="btn btn-sm" variant="transparent"
                                                                onClick={() => updateStatus(userObj, item.status)}>
                                                            <i className={`fa fa-${item.icon} fa-md`}
                                                               style={{color: item.color}}></i>
                                                        </Button>
                                                    </Col>
                                                )
                                            })}
                                        </>
                                    </Row>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}


const VolunteerTable = ({volunteer, handleOpenModal}) => {
    return (
        <Table striped color={'dark'} bordered hover responsive>
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
                <th>צפייה במתנדבים</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(volunteer.volunteers).map((volunteering, index) => {
                return (
                    <tr key={volunteering._id}>
                        <td>{index + 1}</td>
                        <td>{volunteering.idVolunteerType?.Name}</td>
                        <td>{getDate(volunteering.SDate)}</td>
                        <td>{getHour(volunteering.SDate)}</td>
                        <td>{getDate(volunteering.NDate)}</td>
                        <td>{getHour(volunteering.NDate)}</td>
                        <td>{volunteering.idCity?.Name}</td>
                        <td>{volunteering.Address}</td>
                        <td>
                            {volunteering.Description?.slice(0, MAX_DESCRIPTION_LEN)}{' '}
                            {volunteering.Description?.length > MAX_DESCRIPTION_LEN ? '...' : ''}
                        </td>
                        <td>
                            <Button
                                variant="light"
                                className="btn btn-primary btn-sm"
                                onClick={() => handleOpenModal(volunteering.Users, volunteering)}
                            >
                                <i className="fa fa-inbox"></i>
                            </Button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}


export default VolunteeringToApprove;
