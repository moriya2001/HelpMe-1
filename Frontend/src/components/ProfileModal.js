import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';

const ProfileModal = ({ showModal, handleCloseModal, selectedVolunteer }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal} centered className="text-white rounded-3 shadow-lg" fullscreen={'xl-down'}>
            <Modal.Header closeButton className="bg-dark">
                <Modal.Title>
                    פרטי מתנדב: {selectedVolunteer?.idVolunteerUser?.FirstName} {selectedVolunteer?.idVolunteerUser?.LastName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <div className="d-flex justify-content-between">
                    <div>
                        <p>
                            <strong>שם פרטי:</strong> {selectedVolunteer?.idVolunteerUser?.FirstName}
                        </p>
                        <p>
                            <strong>שם משפחה:</strong> {selectedVolunteer?.idVolunteerUser?.LastName}
                        </p>
                        <p>
                            <strong>גיל:</strong> {selectedVolunteer?.idVolunteerUser?.Age}
                        </p>
                        <p>
                            <strong>מין:</strong> {selectedVolunteer?.idVolunteerUser?.Gender}
                        </p>
                        <p>
                            <strong>לבבות:</strong> {selectedVolunteer?.idVolunteerUser?.Coins || 0}
                        </p>
                        <p>
                            <strong>סטטוס מנהל:</strong>{' '}
                            {selectedVolunteer?.idVolunteerUser?.Status ? <i className={'fa fa-user'}></i> : <i className={'fa fa-user-shield'}></i>}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>כתובת אימייל:</strong> {selectedVolunteer?.idVolunteerUser?.Email}
                        </p>
                        <p>
                            <strong>תאריך לידה:</strong> {moment(selectedVolunteer?.idVolunteerUser?.Birthday).format('DD/MM/YYYY')}
                        </p>
                        <p>
                            <strong>טלפון:</strong> {selectedVolunteer?.idVolunteerUser?.Phone}
                        </p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
                <Button variant="secondary" onClick={handleCloseModal}>
                    סגור
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
