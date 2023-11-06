import React, { useEffect, useState, useContext } from 'react'
import { loginApi } from '../services/UserService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UseContext';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState (false);
    const [loadingApi, setLoadingApi] = useState(false);
    const { loginContext } = useContext(UserContext);
    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     if(token){
    //         navigate("/")
    //     }
    // },[])
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email or password is empty");
            return;
        }
        setLoadingApi(true);
        let res = await loginApi(email.trim(), password);
        if (res && res.token) {
            loginContext(email,res.token);
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
    const handleBack =() => {
     navigate('/')  
    }

    const handlePressEnter = (event) => {
        if(event && event.key === 'Enter'){
            handleLogin();
        }
    }
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
            onKeyDown = {(event) => handlePressEnter(event)}
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
        <i class="fa-solid fa-angle-left"></i> 
        <span onClick={()=> handleBack()}> Go back</span>
        </div>
    </div>
  )
}
export default Login;