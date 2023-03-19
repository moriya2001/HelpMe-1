import react from "react"
import { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
const Register =()=>{
   const [user,setUser]=useState({})
    const navigate=useNavigate()
    const register = async()=>{
         const {data}= await axios.post("http://localhost:8000/users" ,user)
            navigate("/")
     }
    //  const [justifyActive, setJustifyActive] = useState('tab1');;

    //  const handleJustifyClick = (value) => {
    //    if (value === justifyActive) {
    //      return;
    //    }
   
    //    setJustifyActive(value);
    //  };
  
   return(<div>
 {/* <h1>Register Page</h1><br/>
    First name:<input className="form-control" type={"text"} onChange={(e)=>setUser({...user,FirstName:e.target.value})}/><br/>
    Last name:<input type={"text"} onChange={(e)=>setUser({...user,LastName:e.target.value})}/><br/>
    Tz:<input type={"text"}onChange={(e)=>setUser({...user,Tz:e.target.value})}/><br/>
    BirthYear:<input type={"text"}onChange={(e)=>setUser({...user,BirthYear:e.target.value})}/><br/>
    Phone:<input type={"text"}onChange={(e)=>setUser({...user,Phone:e.target.value})}/><br/>
    Password:<input type={"text"}onChange={(e)=>setUser({...user,Password:e.target.value})}/><br/>
    if you volunteer?:<input type={"checkbox"}onChange={(e)=>setUser({...user,Status:e.target.checked})}/><br/>
    Coins:<input type={"text"}onChange={(e)=>setUser({...user,Coins:e.target.value})}/><br/>
    Email:<input type={"email"}onChange={(e)=>setUser({...user,Email:e.target.value})}/><br/> */}

<MDBContainer className="p-3 my-5 d-flex flex-column w-50">


{/* 
<MDBTabsContent> */}

  


  

    <MDBInput wrapperClass='mb-4' label='שם פרטי' id='form1' type='text' onChange={(e)=>setUser({...user,FirstName:e.target.value})}/>
    <MDBInput wrapperClass='mb-4' label='שם משפחה' id='form1' type='text'onChange={(e)=>setUser({...user,LastName:e.target.value})}/>
    <MDBInput wrapperClass='mb-4' label='אימייל' id='form1' type='email' onChange={(e)=>setUser({...user,Email:e.target.value})}/>
    <MDBInput wrapperClass='mb-4' label='סיסמא' id='form1' type='password' onChange={(e)=>setUser({...user,Password:e.target.value})}/>
    <MDBInput wrapperClass='mb-4' label='ת.ז' id='form1' type='text'onChange={(e)=>setUser({...user,Tz:e.target.value})}/>
    <MDBInput wrapperClass='mb-4' label='תאריך לידה' id='form1' type='date' onChange={(e)=>setUser({...user,BirthYear:e.target.value})}/>
    <MDBInput wrapperClass='mb-4' label='מס טלפון ' id='form1' type='text' onChange={(e)=>setUser({...user,Phone:e.target.value})}/>

    <div className='d-flex justify-content-center mb-4'>
      <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='האם אתה מתנדב?' onChange={(e)=>setUser({...user,Status:e.target.checked})}/>
    </div>

    <MDBBtn className="mb-4 w-100" onClick={register}>הירשם</MDBBtn>


{/* </MDBTabsContent> */}

</MDBContainer>
</div>

);
}
export default Register