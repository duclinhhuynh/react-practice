import Header from './components/Header';
import './App.scss';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom"
import Login from './components/Login';
import { useContext,useEffect } from 'react';
import { UserContext } from './context/UseContext';



function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log(user);
  useEffect(()=> {
    if( localStorage.getItem("token")){
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
   <div className='app-container'>
   
    <Container>
    <Header/>
    <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/users" element={ <TableUsers/> } />
        <Route path='/login' element = {<Login/>}/>
    </Routes>
      <Row>
        {/* <TableUsers/> */}
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
