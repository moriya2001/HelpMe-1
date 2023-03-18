import React from 'react'
import { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
const LoginPage = ()=>{
  const [FirstName,setFirstName]=useState()
  const [LastName,setLastName]=useState()
  const [password,setPassword]=useState()
  const navigate=useNavigate()
  const login = async ()=>{
      const {data}= await axios.get("http://localhost:8000/users")
      let user = data.find(user =>{
          return user.Email==FirstName&&user.Password==password
      })
      if(user){
          navigate("/home")
        // console.log("yesss")
      }
      else{
          navigate("register")
        // console.log("noooo")
      }
  }
  const newRegister =()=>{
    navigate("/register")
  }
  return(
    <div >
   <h1>Login Page</h1><br/>
    Email<input type={"email"} onChange={(e)=>setLastName(e.target.value)}/><br/>
    Password:<input type={"text"}onChange={(e)=>setPassword(e.target.value)}/><br/>
    <button onClick={login} >Login</button>
    <button onClick={newRegister} >New Register</button>
  </div>
  )
}
export default LoginPage;