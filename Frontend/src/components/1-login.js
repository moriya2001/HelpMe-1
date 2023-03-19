import React from 'react'
import "./1-login.css"
import { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

const LoginPage = ()=>{
 const [userName,setUserName]=useState()
 const [password,setPassword]=useState()
  const navigate=useNavigate()
  const login = async ()=>{
      const {data}= await axios.get("http://localhost:8000/users")
      let user = data.find(user =>{
          return user.Email==userName&&user.Password==password
      })
      if(user){
          navigate("/home")
        console.log("yesss")
      }
      else{
          navigate("register")
     }
  }

  return(<div >
  <h1>Login Page</h1><br/>
   <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

<MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={e=>setUserName(e.target.value)}/>
<MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'onChange={e=>setPassword(e.target.value)}/>

<div className="d-flex justify-content-between mx-3 mb-4">
</div>

<MDBBtn className="mb-4" onClick={login}>Sign in</MDBBtn>

<div className="text-center">
  <p>Not a member? <a href="register">Register</a></p>

  </div>
  </MDBContainer>
  </div>
   
 
 
  )
}
export default LoginPage;