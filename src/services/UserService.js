import axios from './customize-axios';

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const  postCreateUser = (name, email) => {
    return axios.post("/api/users",{name, email});     
}
export {fetchAllUser, postCreateUser};