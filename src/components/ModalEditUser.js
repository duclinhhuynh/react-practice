import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {postCreateUser} from '../services/UserService'
import { toast } from 'react-toastify';

export const ModalEditUser = (props) => {
    const {show, handleClose, dataUserEdit} = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleEditUser = () => {

    }
    // using hook
    useEffect (() =>{
        if(show){
            setName(dataUserEdit.first_name)
        }
    },[dataUserEdit])
    // console.log("check props", dataUserEdit);
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Modal user</Modal.Title>
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
          onClick={() => handleEditUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
