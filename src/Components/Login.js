import { Backdrop, Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(true);
  const [loading, setLoading] = useState(false);

  const [loginStatus, setLoginStatus] = useState({ msg: " ", key: " " });
  const [signupStatus, setSignupStatus] = useState({ msg: " ", key: " " });

  const navigate=useNavigate();

  function login() {
    setSignup((prev) => !prev);
  }

  async function loginhandler(e) {
    e.preventDefault()
    setLoading(true);
    try {    
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "https://hilfee-backend.onrender.com/login",
        {
          email,
          password
        },
        config
      );
      console.log(response);
      if(response.status==204){
        alert('Enter all the fields')
      }   
      else{
      localStorage.setItem("userdata", JSON.stringify(response));
      setSignupStatus({ msg: "Success", key: Math.random() });
      navigate('/app')
      }
      setLoading(false);
    } catch (err) {
      console.log('error',err);
      alert("Invalid Email or Password");
      setSignupStatus({ msg: err, key: Math.random() });
      setLoading(false);
    }
  }

  async function signuphandler(e) {
    setLoading(true);
    try {
      
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "https://hilfee-backend.onrender.com/signup",
        {
          email,
          password,
          cpassword,
        },
        config
      );
      console.log(response);
      if(response.status==204){
        alert('Enter all the fields')
      }   
        
      else{
      localStorage.setItem("userdata", JSON.stringify(response));
      setSignupStatus({ msg: "Success", key: Math.random() });
      navigate('/app')
      }
      
      setLoading(false);
    } catch (err) {
      console.log('error',err);
      
      if(err.message==='Request failed with status code 409'){
        alert('User already exist')
      }
      else if(err.message==='Request failed with status code 403'){
        alert(`passwords doesn't match`)
      }
      else{
        alert("Something went wrong");
      }
      setSignupStatus({ msg: err, key: Math.random() });
      setLoading(false);
    }
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="login-main">
      <div style={{ display: signup ? "none" : "" }} className="login-page">
        <h1 className="login-text">Login</h1>
        
        <TextField
          id="standard-basic"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
        />
        
        <TextField
          id="standard-basic"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          variant="standard"
        />
        <div className="btn">
        <Button onClick={loginhandler} variant="contained">
          Login
        </Button>
        </div>
        <span>Don't have an account?</span>
        <p style={{cursor:'pointer'}} onClick={login}>Signup</p>
      </div>
      </div>

      <div className="login-main">
      <div style={{ display: signup ? "" : "none" }} className="login-page">
        <h1 className="login-text">Signup</h1>
        <TextField
          id="standard-basic"
          label="email"
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
        />
        <TextField
          id="standard-basic"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          variant="standard"
        />
        <TextField
          id="standard-basic"
          label="Confirm Password"
          onChange={(e) => setCpassword(e.target.value)}
          variant="standard"
        />
        <div className="btn">
        <Button onClick={signuphandler} variant="contained">
          Signup
        </Button>
        </div>
        <span>Already a user?</span>
        <p style={{cursor:'pointer'}} onClick={login}>Login</p>
      </div>
      </div>
    </>
  );
}
export default Login;
