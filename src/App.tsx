import React, { memo } from 'react';
import { HashRouter, Route, Routes, Outlet } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Favorites from './pages/Favorites'
import Detail from './pages/Detail'

import Header from 'components/Header';

const App = () => {
  return  (
      <HashRouter>
        <Routes>
          <Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Route>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home />} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/detail/:id" element={<Detail/>} />
          </Route>
        </Routes>
      </HashRouter>
  )
}

const Layout = () => {
  return (
    <>
      <Header/> 
      <div className='wrapper'>
        <Outlet/>
      </div>
    </>
  )
}

export default memo(App);