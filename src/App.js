import Header from './components/Header';
import './App.scss';
import Container from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext,useEffect } from 'react';
import { UserContext } from './context/UseContext';
import AppRoutes from './routes/AppRoute';



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
      <AppRoutes/>
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
