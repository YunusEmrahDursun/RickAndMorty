import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector,useAppDispatch } from 'store/hooks'
import type { RootState } from 'store/store';
import { loginUser } from 'store/userInfoSlice'; 
import md5 from 'md5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';

const Login = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const registerUsers = useAppSelector((state:RootState) => state["other"]["registerUsers"] );
  
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const registerClick = () => { navigate('/register') }
  const loginClick = () => { 

    const found = registerUsers.find(i=> i.userName == userName && i.password == md5(password) )
    
    if(found){

      dispatch(loginUser({
        userName,
        // böyle birşey olmaz tabiki :D 
        jwt:md5(Math.random())
      }))

      navigate('/home'); 

    }else{
      toast("Kullanıcı adı yada şifre yanlış!")
    }

  }

  return (
    <div className='login-background'>
      <div className="login-card">
        <div className="login-type">
          <h3>Portal</h3>
        </div>
        <h1>Giriş</h1>
        <h2>Kullanıcı Adı</h2>
        <input name="username" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
        <h2>Şifre </h2>
        <input  name="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <button className="green-button" onClick={loginClick}>Giriş Yap</button>
        <button className="green-button" onClick={registerClick}>Kayıt Ol</button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default memo(Login)