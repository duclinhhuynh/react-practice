import Header from './components/Header';
import './App.scss';
import TableUsers from './components/TableUsers';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  return (
   <div className='app-container'>
    <Container>
      <Row>
        <Header/>
        <TableUsers/>
      </Row>
    </Container>
   </div>
  );
}

export default App;
