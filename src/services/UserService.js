import axios from './customize-axios';

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const  postCreateUser = (name, email) => {
    return axios.post("/api/users",{name, email});     
}

const putUpdateUser = (userID, name, job) => {
    return axios.put(`/api/users/${userID}`, { name, job });
}
export {fetchAllUser, postCreateUser, putUpdateUser};