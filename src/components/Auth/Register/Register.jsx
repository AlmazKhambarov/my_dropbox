import React, {useState} from "react";
import { auth } from "../../../firebase/firebase";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Header from '../../Header/Header'
const Register = () => {
  const [email, setUserEmail] = useState("")
  const [password, setUserPassword] = useState("")
  const [userName, setUserName] = useState('')
  var navigate = useNavigate()
const submit = (e)=>{
  e.preventDefault();
  try {
    createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    updateProfile(auth.currentUser, {displayName:userName})
  } catch (error) {
    console.log(error.message)
  }
  navigate("/home");
}
console.log(auth.currentUser)
  return (
    <>
    <Header/>
    <p style={{textAlign: "center", fontSize:"32px"}}>Register</p>
    <div className="login_main_container">
      <form className="form-control" onSubmit={submit}>
        <a href="/">
          <p className="register_link">have an account? Login</p>
        </a>
        <label>User Name</label>
        <input
          className="inp_login"
          type="text"
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>EMAIL ADDRESS</label>
        <input
          className="inp_login"
          type="text"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          className="inp_login"
          type="password"
          placeholder="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button className="submit" type="submit">
          Continue
        </button>
      </form>
    </div>
    </>
  );
};

export default Register;
