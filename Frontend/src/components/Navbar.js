import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';


function BasicExample() {
    const user = useSelector(state => state.users?.currentUser);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Help Me {user.FirstName} {user.LastName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="homeUser">Home</Nav.Link>
                        <Nav.Link href="search">חיפוש התנדבות</Nav.Link>
                        <Nav.Link href="#link">הגדרות</Nav.Link>
                        <Nav.Link href="#link">הודעות </Nav.Link>
                        <Nav.Link href="updateProfile">עריכת פרופיל</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;

// export default HomeNavBar;

