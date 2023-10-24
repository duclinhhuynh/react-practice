import Header from './components/Header';
import './App.scss';
import TableUsers from './components/TableUsers';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap';
import { ModalAddNew } from './components/ModalAddNew';
import { useState } from 'react';


function App() {
  const[isShowModelAddNew, SetIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    SetIsShowModalAddNew(false)
  }
  return (
   <div className='app-container'>
    <Container>
      <Row>
        <Header/>
        <div className='my-3 add-new'>
          <span></span>
          <button onClick={()=> SetIsShowModalAddNew(true)} className='btn btn-success'>Add user</button>
        </div>
        <TableUsers/>
      </Row>
    </Container>
    <ModalAddNew
      show = {isShowModelAddNew}
      handleClose = {handleClose}
    />
   </div>
  );
}

export default App;
