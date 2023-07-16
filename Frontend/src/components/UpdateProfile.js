import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Card, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateProfile = () => {
    const userBeforeChanges = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(userBeforeChanges);
    const navigate = useNavigate();

    const saveChanges = async () => {
        try {
            const {data} = await axios.put(`http://localhost:8000/users/${user._id}`, user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/Definitions');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container-fluid py-3 my-5 min-vh-100">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h3 className="text-center">עדכון פרטים</h3>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>שם פרטי</Form.Label>
                                    <Form.Control type="text" placeholder="שם פרטי" value={user?.FirstName || ''}
                                                  id={"firstName"}
                                                  onChange={(e) => setUser({...user, FirstName: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>שם משפחה</Form.Label>
                                    <Form.Control type="text" placeholder="שם משפחה" value={user?.LastName || ''}
                                                  id={"lastName"}
                                                  onChange={(e) => setUser({...user, LastName: e.target.value})}/>
                                </Form.Group>
                                <div className="mb-3 form-check">
                                    <Form.Group className="mb-3" controlId="status">
                                        <div className="d-flex align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                label="האם אתה מתנדב?"
                                                checked={!user?.Status || false}
                                                onChange={(e) => setUser({ ...user, Status: !e.target.checked })}
                                            />
                                            <span className="mx-2">{!user?.Status ? 'כן' : 'לא'}</span>
                                        </div>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={saveChanges}>
                                        שמור שינויים
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default UpdateProfile;
