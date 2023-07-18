import React from 'react';
import './1-login.css';
import {useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Alert, Form, Button, Row} from 'react-bootstrap';
import {setCurrentUser} from '../Redux-toolkit/usersSlice';
import Col from 'react-bootstrap/Col';

const LoginPage = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async () => {
        const {data} = await axios.get('/users');
        let user = data.find((user) => {
            return user.Email == userName && user.Password == password;
        });
        if (user) {
            localStorage['user'] = JSON.stringify(user);
            if (user.Status === true) {
                navigate('/homeUser');
            } else {
                navigate('/homeDirector');
            }

            dispatch(setCurrentUser(user));
            console.log(user);
        } else {
            alert('יש טעות במייל או הסיסמה');
            // navigate("/register")
        }
    };

    return (
        <Row className="login align-items-center justify-content-center text-start">
            <Col xs={6} className="p-5 rounded-3 bg-white  shadow-lg">
                <h2 className="text-center mb-4 rouded-3 p-3 mb-5 bg-white rounded
                ">Sign in</h2>
                <Form className="form1">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            id="form1"
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="form2"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Button onClick={login}
                            className="btn btn-sm btn-primary mx-auto d-block w-100">
                        Submit
                    </Button>
                </Form>
                <br/>

                <Alert variant="info text-center">
                    Not a member?{' '}
                    <Alert.Link href="/register">Register</Alert.Link>
                </Alert>
            </Col>
        </Row>
    );
};

export default LoginPage;
