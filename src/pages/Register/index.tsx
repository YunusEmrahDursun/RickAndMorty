import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  
  const navigate = useNavigate();

  const loginClick = () => { navigate('/login') }

  return (
    <div className='login-background'>
      <div className="login-card">
        <div className="login-type">
          <h3>Portal</h3>
        </div>
        <h1>Kayıt Ol</h1>
        <h2>Kullanıcı Adı</h2>
        <input name="username"/>
        <h2>Şifre </h2>
        <input  name="password" type="password"/>
        <button className="green-button">Kayıt Ol</button>
        <button className="green-button" onClick={loginClick}>Giriş Yap</button>
      </div>
    </div>
  )
}

export default memo(Register)