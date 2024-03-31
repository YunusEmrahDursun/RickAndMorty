import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Empty = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(()=> { navigate('/') },2000)
  }, [])
  
  return (
    <div className='container'>
        <h1>Yetkiniz bulunmamaktadır</h1>
    </div>
  )
}

export default Empty