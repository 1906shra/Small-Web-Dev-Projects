import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
//import Home from './Home/Home'
function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    

    </>
  )
}

export default Layout