import axios from './customize-axios';

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const  postCreateUser = (name, email) => {
    return axios.post("/api/users",{name, email});     
}

const putUpdateUser = (userID, name, email) => {
    return axios.put(`/api/users/${userID}`, { name, email });
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
}
export {fetchAllUser, postCreateUser, putUpdateUser, deleteUser};