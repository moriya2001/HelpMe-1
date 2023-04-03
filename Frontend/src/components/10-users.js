import axios from "axios";
import React,{useState,useEffect} from "react";
import Table from 'react-bootstrap/Table';

const User = () =>{
const [users,setUsers]= useState([])
const getUser = async()=>{
    const {data}= await axios.get("http://localhost:8000/users")
    const data2=data.filter(user=>user.Status==false)//מתנדב
    setUsers(data)
}
useEffect(() => {
    getUser()
 }, [])
 return<div>
 <Table striped bordered hover>
         <thead>
            <tr>
               <th>#</th>
               <th>שם פרטי</th>
               <th>שם משפחה</th>
               <th>ת.ז</th>
               <th>שנת לידה</th>
               <th>טלפון</th>
               <th>מייל</th>
          
            </tr>
        
         </thead>
         <tbody>
            {users && users.map((item) => {
               return <tr>
                  <td></td>
                  <td>{item.FirstName}</td>
                  <td>{item.LastName}</td>
                  <td>{item.Tz}</td>
                  <td>{item.BirthYear}</td>
                  <td>{item.Phone}</td>
                  <td>{item.Email}</td>
               {/* <td><button onClick={()=>deleteVolunteering(item._id)}>מחיקה</button></td> */}
               </tr>
           })} 

         </tbody>
      </Table>
 </div>
}
export default User