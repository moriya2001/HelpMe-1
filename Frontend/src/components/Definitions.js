import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useNavigate} from "react-router-dom"
import {Card, Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";

const Definitions = () => {
    const navigate = useNavigate()
    const myVolunteerings = () => {
        navigate("/myVolunteerings");
    }
    return (
        <Container className={"justify-content-center justify-content-center my-5"}>
            <Row className={"justify-content-center justify-content-center my-5"}>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className={'text-center display-6'}>
                                הגדרות
                            </Card.Title>
                            <Card.Text>
                                <ButtonGroup horizontal="true" className={'d-flex justify-content-center'}>
                                    <Button className={'btn mx-2'} onClick={myVolunteerings}>התנדבויות שלי</Button>
                                    <Button className={'btn'}>מטבעות</Button>
                                </ButtonGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Definitions
