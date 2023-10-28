import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteUser} from '../services/UserService'
import {toast} from 'react-toastify'
export const ModalCofirm = (props) => {
    const {show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    const confirmDelete = async() => {
      let res = await deleteUser(dataUserDelete.id);
      if(res && +res.statusCode === 204 ){
            toast.success("delete user success")
            handleClose();
            handleDeleteUserFromModal(dataUserDelete)
      }
      else {
        toast.error("an error")
      }
      console.log("check res", res);
   }
  return (
    <div>
        <Modal show={show} onHide={handleClose}
         backdrop="static"
         keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
              Are you sure to delete this user, this action can't be undone!
              Do you want to delete <br/>
              <strong>Email = {dataUserDelete.email}</strong>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" 
          onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
