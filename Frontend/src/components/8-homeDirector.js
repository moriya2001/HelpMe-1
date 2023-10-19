import {Container, Modal} from 'react-bootstrap';
import VolunteeringToApprove from "./VolunteeringsToApprove";
import UsersToApprove from "./UsersToApprove";
import {useState} from "react";

const HomeDirector = () => {
    const [msg, setMsg] = useState('');
    return (<Container className="align-items-center justify-content-center bg-light min-vh-100"
                       aria-labelledby="contained-modal-title-vcenter"
        >
            <VolunteeringToApprove setMsg={setMsg}/>
            <UsersToApprove setMsg={setMsg}/>
            <Modal show={!!msg} onHide={() => setMsg('')} className="text-right text-white" centered>
                <Modal.Header closeButton className="bg-dark">
                    <Modal.Title>הודעה</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {msg}
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default HomeDirector

