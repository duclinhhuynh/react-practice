import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, NavLink } from 'react-router-dom';
const Header = (props) => {
  // web smood
  const location = useLocation();
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to= '/' className='nav-link'>Home</NavLink>
                <NavLink to= '/users' className='nav-link'>Manage Users</NavLink>
              </Nav>
              <Nav>
                <NavDropdown title="Setting">
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;