import logo from '../img/icon.png'
import '../App.css';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { isAuthorized } from '../Utils/Common';

function Header() {
    const isLoggedIn: boolean = isAuthorized()
    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" variant="light">
            <Container>
            <img
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="TripleS logo"
            />
            <Navbar.Brand href="/">Snow*School</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {isLoggedIn && (
                            <div>
                                <NavLink to="/users">Users</NavLink>
                                <NavLink to="/tasks">Tasks</NavLink>
                                <NavLink to="/sessions">Sessions</NavLink>
                                <NavLink to="/backup">Backup</NavLink>
                            </div>
                        )}
                    </Nav>
                <Nav>
                    {isLoggedIn ?
                        (<NavLink to="/logout">Log Out</NavLink>) :
                        (
                            <div>
                                <NavLink to="/signin">Sign In</NavLink>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </div>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    );
}

export default Header;