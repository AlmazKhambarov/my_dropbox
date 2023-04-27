import { useState } from "react";
import {Route, Routes } from "react-router";
import Register from './components/Auth/Register/Register'
import "./App.css";
import BackGround from "./components/NonAuth/BackGround";
import Home from "./components/Authentication/Home/Home";
import { auth } from "./firebase/firebase";

function App() {
  const [user, setUser] = useState('')
  auth.onAuthStateChanged((user)=>{
    setUser(user)
  })
  return(
<Routes>
  <Route path='/sign' element={<Register/>}/>
  <Route path='/' element={<BackGround/>}/>
  <Route path='/home'element={user?<Home user={user}/>:<BackGround/>}/>
</Routes>
  )
}

export default App;
