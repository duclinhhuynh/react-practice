import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {postCreateUser} from '../services/UserService'
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

export const ModalAddNew = (props) => {
    const {show, handleClose, handleUpdateTable} = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleSaveUser = async() => {
      let res = await postCreateUser(name, email);
        console.log("check ", res);
      if(isEmpty(res.name) || isEmpty(res.email)){
          toast.error('An error');
      }  
      else if(res && res.id){
        handleClose();
        setName('');
        setEmail('');
        toast.success('A user is created succeed');
        props.handleUpdateTable({first_name: name, id: res.id, email: email})
        // success
      }
      else{
        toast.error('An error');
      }
   }
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text"
                         className="form-control"
                         value={name}
                         onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text"
                         className="form-control" 
                         value={email}
                         onChange={(event) => setEmail(event.target.value)}
                         
                         />
                    </div>
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" 
          onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
