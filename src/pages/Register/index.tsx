import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks'
import { addUser } from 'store/othersSlice';
import md5 from 'md5';

const Register = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const loginClick = () => { navigate('/') }
  const registerClick = () => { 
    dispatch(addUser({
      userName,
      password:md5(password)
    }))
    navigate('/')
  }
  
  return (
    <div className='login-background'>
      <div className="login-card">
        <div className="login-type">
          <h3>Portal</h3>
        </div>
        <h1>Kayıt Ol</h1>
        <h2>Kullanıcı Adı</h2>
        <input name="username" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
        <h2>Şifre </h2>
        <input  name="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <button className="green-button" onClick={registerClick}>Kayıt Ol</button>
        <button className="green-button" onClick={loginClick}>Giriş Yap</button>
      </div>
    </div>
  )
}

export default memo(Register)