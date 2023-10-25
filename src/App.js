import Header from './components/Header';
import './App.scss';
import TableUsers from './components/TableUsers';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {tableUsers} from './components/TableUsers'


function App() {
  return (
    <>
   <div className='app-container'>
    <Container>
      <Row>
        <Header/>
        <TableUsers/>
      </Row>
    </Container>
    
    {/* toastify */}
   </div>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
   </>
  );
}

export default App;
