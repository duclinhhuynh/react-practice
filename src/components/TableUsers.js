import axios from 'axios';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import { ModalAddNew } from './ModalAddNew';
import { ModalEditUser } from './ModalEditUser';

const TableUsers = (props) => {
  const [listUsers , setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const[isShowModelAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({})
  const handleClose = () => {
    setIsShowModalAddNew(false)
    setIsShowModalEdit(false)
  }

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers])
  }
  const handleEditUser= (user) => {
      setDataUserEdit(user);
      setIsShowModalEdit(true)
      console.log(user);
  }

  // using hook
  useEffect(() => {
    // call api 
    // axios.get('https://reqres.in/api/users?page=2').then(data=>{
    //   console.log('check data',data.data);
    // })
    getUsers();
  }, [])
  const getUsers = async(page) => {
      let res = await fetchAllUser(page);
      if(res && res.data){
          // console.log('total:',res);
          setTotalUsers(res.total)
          setListUsers(res.data)
          setTotalPages(res.total_pages)
      }
      
  }
  // console.log("check", listUsers);
  const handlePageClick = (event) => {
    console.log("event", event);
    getUsers(+event.selected + 1);
  }
    return (<> 
    <div className='my-3 add-new'>
          <span></span>
          <button onClick={()=> setIsShowModalAddNew(true)} className='btn btn-success'>Add user</button>
        </div>
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Action</th>
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
              <td>
                <button className='btn btn-warning mx-2' onClick={() => handleEditUser(item)}>Edit</button>
                <button className='btn btn-danger mx-2'>Delete</button>
              </td>
            </tr>
            )
          })     
          }
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}

        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />
      <ModalAddNew
      show = {isShowModelAddNew}
      handleClose = {handleClose}
      handleUpdateTable = {handleUpdateTable}
      />
      <ModalEditUser
      show={isShowModalEdit}
      dataUserEdit = {dataUserEdit}
      handleClose = {handleClose}
      />
          
      </>)
}
export default TableUsers;