import React, {useState} from 'react'
import logo from '../../components/assets/images/logo.png'

import '../assets/styles/Header.css'
import { useNavigate } from 'react-router'
const Header = ({logout,logoutUser}) => {
var navigate=useNavigate()
  return (
    <div className="header">
        <img src={logo} className="logo_image" alt="#"/>
        <p>Dropbox</p>
        <div className="registerLink">
            <button onClick={logoutUser} className='regis'>{logout? "Logout" : "Register"}</button>  
        </div>
    </div>
  )
}
  
export default Header