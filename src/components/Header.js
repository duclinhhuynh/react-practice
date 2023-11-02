import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UseContext';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
const Header = (props) => {
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);
  const [hideHeader, setHideHeader] = useState(false);
  // web smood
  const handleLogout = () => {
    logout();
    navigate('/') ;
    toast.success("logout success");
  }
  const location = useLocation();
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth || window.location.pathname ==='/')&& 
            <>
              <Nav className="me-auto">
                <NavLink to= '/' className='nav-link'>Home</NavLink>
                <NavLink to= '/users' className='nav-link'>Manage Users</NavLink>
              </Nav>
              <Nav>
                {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                <NavDropdown title="Setting" >
                    {user && user.auth === true
                    ?
                    <NavDropdown.Item onClick={()=> handleLogout()}>
                    Logout
                  </NavDropdown.Item>
                  : <NavLink to= '/login' className='dropdown-item'>Login</NavLink>}
                </NavDropdown>
              </Nav>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;