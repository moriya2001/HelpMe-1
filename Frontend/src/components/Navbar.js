import React from 'react';
import {useSelector} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';

function BasicExample() {
    const user = useSelector(state => state.users?.currentUser);
    return (
        <Navbar expand="md" className="bg-light sticky-top border-bottom rounded border p-2 rounded-6 shadow-lg"
                style={{zIndex: 1000, position: 'sticky', top: 0, left: 0, right: 0, fontStyle: 'monospace'}}>
            <Navbar.Brand href="/" className="d-flex align-items-center p-2 mr-2">Help
                Me {user.FirstName} {user.LastName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="homeUser"><i className="fas fa-home"></i></Nav.Link>
                    <Nav.Link href="Definitions"><i className="fas fa-cog"></i></Nav.Link>
                    <Nav.Link href="updateProfile"><i className="fas fa-user-edit"></i></Nav.Link>
                    <Nav.Link href="search">חיפוש התנדבות</Nav.Link>
                    {/* <Nav.Link href="#link">הודעות </Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default BasicExample;
