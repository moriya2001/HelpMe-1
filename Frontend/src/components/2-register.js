import react from "react"
import { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
const Register =()=>{
   const [user,setUser]=useState({})
    const navigate=useNavigate()
    const register = async()=>{

        const {data}= await axios.post("http://localhost:8000/users" ,user)
            navigate("/")
     }
  
   return(<div>
       <h1>Register Page</h1><br/>
    First name:<input className="form-control" type={"text"} onChange={(e)=>setUser({...user,FirstName:e.target.value})}/><br/>
    Last name:<input type={"text"} onChange={(e)=>setUser({...user,LastName:e.target.value})}/><br/>
    Tz:<input type={"text"}onChange={(e)=>setUser({...user,Tz:e.target.value})}/><br/>
    BirthYear:<input type={"text"}onChange={(e)=>setUser({...user,BirthYear:e.target.value})}/><br/>
    Phone:<input type={"text"}onChange={(e)=>setUser({...user,Phone:e.target.value})}/><br/>
    Password:<input type={"text"}onChange={(e)=>setUser({...user,Password:e.target.value})}/><br/>
    if you volunteer?:<input type={"checkbox"}onChange={(e)=>setUser({...user,Status:e.target.checked})}/><br/>
    Coins:<input type={"text"}onChange={(e)=>setUser({...user,Coins:e.target.value})}/><br/>
    Email:<input type={"email"}onChange={(e)=>setUser({...user,Email:e.target.value})}/><br/>
    
   
   
   
   
    
    <button onClick={register} >continue</button>
   </div>
    


);
}
export default Register