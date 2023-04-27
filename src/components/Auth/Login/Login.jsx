import React, {useState} from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var navigate = useNavigate()
  const submit = (event)=>{
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate('/home')
    })
    .catch((error) => {
      console.error(error);
    });
  }
  return (
    <>
        <p style={{textAlign: "center", fontSize:"32px"}}>Login</p>
      <br />
      <br />
        <div className="login_main_container">
          <form className="form-control" onSubmit={submit}>
            <a href="/sign">
              <p className="register_link">create an account</p>
            </a>
            <label>EMAIL ADDRESS</label>
            <input
              className="inp_login"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>PASSWORD</label>
            <input
              className="inp_login"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="submit" type="submit">
              Continue
            </button>
          </form>
        </div>
    </>
  );
};

export default Login;
