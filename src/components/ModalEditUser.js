import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { putUpdateUser,postCreateUser } from '../services/UserService'; 

export const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
  //   const putUpdateUser = async (userID, name, job) => {
  //     try {
  //         const response = await axios.put(`https://reqres.in/api/users/${userID}`, { name, job });
  //         return response.data;
  //     } catch (error) {
  //         console.error('Update failed:', error);
  //         throw error; // You can choose to handle the error as needed
  //     }
  // }

    const handleEditUser = async () => {
      console.log('name:', name);
      console.log('dataUserEdit.id:', dataUserEdit.id);
      // try {
        let res = await putUpdateUser(+dataUserEdit.id, name, email); // Update the email in the PUT request
        console.log("API response:", res); // Log the full API response
        // if (res && res.updateAt) {
            console.log("Update successful");
            const updatedUser = {
                first_name: name,
                email: email,
                id: dataUserEdit.id,
            };
            console.log("Updated user:", updatedUser);
            handleEditUserFromModal(updatedUser);
            handleClose();
        // } else {
        //     console.log("Update not successful");
        // }
    // } catch (error) {
    //     console.error("API request failed:", error);
    // }
    };
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
