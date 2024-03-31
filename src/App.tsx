import React, { memo } from 'react';
import { HashRouter, Route, Routes, Outlet } from 'react-router-dom';

import { useAppSelector } from 'store/hooks'
import type { RootState } from 'store/store';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Favorites from './pages/Favorites'
import Detail from './pages/Detail'

import Header from 'components/Header';
import NoAuthorization from 'components/NoAuthorization';

const App = () => {

  const jwt = useAppSelector((state:RootState) => state["user"]["jwt"] );

  return  (
      <HashRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Route>
          { jwt != "" ? <Route element={<Layout/>}>
            <Route path='/home' element={<Home />} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/detail/:id" element={<Detail/>} />
          </Route> : <Route path="*" element={<NoAuthorization/>} /> }
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