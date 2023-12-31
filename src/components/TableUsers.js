/* eslint-disable array-callback-return */
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import { ModalAddNew } from './ModalAddNew';
import { ModalEditUser } from './ModalEditUser';
import { ModalCofirm } from './ModalCofirm';
import _, { debounce, head } from "lodash"
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import './TableUsers.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';


const TableUsers = (props) => {
  const [listUsers , setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const[isShowModelAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortFied] = useState("id");
  const [keyword, setKeyword] = useState("");
  const [dataExport, setDataExport] = useState([]);
  
  const handleClose = () => {
    setIsShowModalAddNew(false)
    setIsShowModalEdit(false)
    setIsShowModalDelete(false)
  }

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers])
  }
  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id);
    // clone first name and email
    cloneListUsers[index].first_name = user.first_name;
    cloneListUsers[index].email = user.email;
    setListUsers(cloneListUsers);
    console.log("list user", listUsers);
    console.log("index", index);
    console.log("list clone", cloneListUsers);
    console.log("user:", user);
  }
 

  const handleEditUser= (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true)
    // handleEditUserFromModal(user)
    // console.log(user);
}
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user)
    console.log(user);
  }

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
    setListUsers(cloneListUsers);
  }
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortFied(sortField)
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers)
    // console.log("clone", cloneListUsers);
  }

  // using deboune avoid call api too much time
  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if(term){
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
      setListUsers(cloneListUsers)
      console.log(cloneListUsers);
    }else{
      getUsers(1)
    }
  },500);
  // console.log("checksort", sortBy, sortField);
   // using hook
  useEffect(() => {
    // call api 
    // axios.get('https://reqres.in/api/users?page=2').then(data=>{
    //   console.log('check data',data.data);
    // })
    getUsers(1);
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

  const getUsersExport = (event, done) => {
    let result = [];
    if(listUsers && listUsers.length > 0){
      result.push(["Id", "Email", "First name", "Last name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      })
      setDataExport(result);
      done();
    }
  }
  // using papaparse
  const handleImportCSV = (event) => {
    if(event.target && event.target.files && event.target.files[0]){
      let file = event.target.files[0];
      if(file.type !== "text/csv"){
        toast.error("only accept csv file...")
        return
      }
      console.log("file: ", file);
      Papa.parse(file, {
        // header: true,
        complete: function(results) {
          let rawCSV = results.data;
          if(rawCSV.length > 0){
            console.log('lenght raw', rawCSV[0]);
            if(rawCSV[0] && rawCSV[0].length === 3){
                if(rawCSV[0][0] !== 'email' || rawCSV[0][1] !== 'first_name' || rawCSV[0][2] !== 'last_name'){
                  toast.error("wrong format CSV file...")
                }
                else{
                  let result = [];
                  rawCSV.map((item,index) => {
                    if(index > 0 && item.length === 3){
                      let obj = {};
                      obj.email = item[0]
                      obj.first_name = item[1]
                      obj.last_name = item[2]
                      result.push(obj)
                    }
                  })
                  console.log("check rs", result);
                  setListUsers(result);
                }
            }else{
              toast.error('wrong lenght format CSV file!')
            }
          }
          console.log("Finished:", results.data);
        }
      });
    }
  }
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];
    return (<> 
    <div className='my-3 add-new'>
          <span className='px-0'>List user</span>
          <div className='group-btns'>
            <label htmlFor='test' className='btn btn-warning text-white'>
            <i class="fa-solid fa-file-import"></i>
              Import
            </label>
            <input id = 'test' type='file' hidden
              onChange={(event) => handleImportCSV(event)}
            />
            <CSVLink
             filename={"users.csv"}
             className="btn btn-primary"
             target="_blank"
             data={dataExport}
             asyncOnClick={true}
             onClick={(event, done) => getUsersExport(event, done)}
             >
              <i class="fa-solid fa-download"></i>
               Download</CSVLink>
            <button onClick={()=> setIsShowModalAddNew(true)} className='btn btn-success'>
            <i class="fa-solid fa-circle-plus"></i>
            <span> Add User</span></button>
           </div>
    </div>
    <div className='col-6 my-3 px-0'>
        <input 
        type="text"
        className='form-control' 
        placeholder='search user by email....'
        // value={keyword}
        onChange={(event)=> handleSearch(event)}
        />
    </div>
    <Table striped bordered hover>
        <thead>
          <tr>
            <th> 
              <div className='sort-header'>
                <span>ID</span> 
                <span>
                  <i className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc","id")}
                  ></i>
                  <i className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc","id")}
                  ></i>
                </span>
              </div>
            </th>
            <th >
            <div className='sort-header'>
                <span>Email</span> 
              </div>
            </th>
            <th>
              <div className='sort-header'>
                <span>First Name</span> 
                <span>
                  <i className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc","first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
            <span>Last Name</span> 
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 && 
          listUsers.map((item, index) => {
            return (
            <tr key={`users-${index}`}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>
                <button className='btn btn-warning mx-2' onClick={() => handleEditUser(item)}>Edit</button>
                <button className='btn btn-danger mx-2' onClick={()=> handleDeleteUser(item)}>Delete</button>
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
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal} // Confirm prop name
      />
      <ModalCofirm
        show= {isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete = {dataUserDelete}
        handleDeleteUserFromModal ={handleDeleteUserFromModal}
      />    
      </>)
}
export default TableUsers;