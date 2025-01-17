import React from 'react';
import {useSelector} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

function NavbarApp() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.users?.currentUser);
    const [activeUser, setActiveUser] = React.useState(localStorage['user'] ?? null);

    const logout = () => {
        localStorage.removeItem('user'); // Remove the 'user' item from localStorage when logging out
        console.log('logout', localStorage['user'])
        navigate('/login');
    };

    const getHomeLink = () => {
        const user = JSON.parse(localStorage['user'] ?? null);
        if (user) {
            return user.Status ? "/homeDirector" : "/homeUser";
        }
        return "/";
    }
    return (
        <Navbar
            expand="md"
            className="bg-light sticky-top border-bottom rounded border p-2 rounded-6 shadow-lg"
            style={{
                zIndex: 1000,
                position: 'sticky',
                top: 0,
                left: 0,
                right: 0,
                fontStyle: 'monospace',
            }}
        >
            <Navbar.Brand href="/" className="d-flex align-items-center p-2 mr-2">
                Help Me {user?.FirstName} {user?.LastName}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href={getHomeLink()}>
                        <i className="fas fa-home"></i>
                    </Nav.Link>

                    {activeUser ? (
                            <>
                                <Nav.Link href="Definitions" data-toggle="tooltip" title="הגדרות">
                                    <i className="fas fa-cog"></i>
                                </Nav.Link>
                                <Nav.Link href="updateProfile" data-toggle="tooltip" title="עדכון פרטים">
                                    <i className="fas fa-user-edit"></i>
                                </Nav.Link>
                                {activeUser.Status ?
                                    <Nav.Link href="homeDirector" data-toggle="tooltip" title="ניהול מתנדבים">
                                        <i className="fas fa-list-check"></i>
                                    </Nav.Link>
                                    :
                                    <Nav.Link href="search"> חיפוש התנדבות</Nav.Link>
                                }
                                <Nav.Link href="homeDirector" data-toggle="tooltip" title="ניהול מתנדבים">
                                    <i className="fas fa-list-check"></i>
                                </Nav.Link>

                                <Button onClick={logout} className={'btn btn-sm btn-light'} data-toggle="tooltip"
                                        title="התנתק">
                                    <i className="fa fa-md fa-sign-out" aria-hidden="true"></i>
                                </Button>
                            </>
                        ) :
                        <a className={'btn btn-sm btn-light'} href={'/login'}>
                            <i className="fa fa-md fa-sign-in" aria-hidden="true"></i>
                        </a>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarApp;
