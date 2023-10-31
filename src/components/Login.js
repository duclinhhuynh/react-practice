import React, { useEffect, useState } from 'react'
import { loginApi } from '../services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState (false);
    const [loadingApi, setLoadingApi] = useState(false);
    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token){
            navigate("/")
        }
    },[])
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email or password is empty");
            return;
        }
        setLoadingApi(true);
        let res = await loginApi(email, password);
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            navigate("/")
        }
        else {
            if(res && res.status === 400){
                toast.error(res.data.error)
            }
        }
        setLoadingApi(false)
        console.log(">>> check login: ", res);
    };
    useEffect(()=> {
        
    })
  return (
    <div className='login-container col-12 col-sm-4'>
        <div className='title'> Log in</div>
        <div className='text'>Email or Username eve.holt@reqres.in</div>
        <input 
        className='input-1'
        type='text' 
        placeholder='Email or Username'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        />
        <div className='input-2'>
            <input
            type={isShowPassword === true ? 'text' : "password" }
            placeholder='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
            <i class={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                onClick={() => setIsShowPassword(!isShowPassword)}
            ></i>
        </div>
        <button 
            className={email && password ? "active" : ""}
            disabled={email && password ? false : true}
            onClick={() => handleLogin()}
        >
       {loadingApi && <i class="fa-solid fa-sync fa-spin"></i>} Log in</button>
        <div className='back'>
        <i class="fa-solid fa-angle-left"></i> Go back</div>
    </div>
  )
}
export default Login;