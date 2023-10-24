import axios from 'axios';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import { fetchAllUser } from '../services/UserService';
const TableUsers = (props) => {
  const [listUsers , setListUsers] = useState([]);

  // using hook
  useEffect(() => {
    // call api 
    // axios.get('https://reqres.in/api/users?page=2').then(data=>{
    //   console.log('check data',data.data);
    // })
    getUsers();
  }, [])
  const getUsers = async() => {
      let res = await fetchAllUser();
      if(res && res.data){
          setListUsers(res.data)
      }
      
  }
  console.log("check", listUsers);
    return (<> 
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>FirstName</th>
            <th>LastName</th>
          </tr>
        </thead>
        <tbody>
          {listUsers&& listUsers.length > 0 && 
          listUsers.map((item, index) => {
            return (
            <tr key={`users-${index}`}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
            </tr>
            )
          })     
          }
        </tbody>
      </Table></>)
}
export default TableUsers;