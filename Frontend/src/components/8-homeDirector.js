import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
const HomeDirector = () => {
   const [volunteeringTovolunteer, setVolunteeringTovolunteer] = useState([])
   const [volunteeringTovolunteerUpdate, setVolunteeringTovolunteerUpdate] = useState({})
   const getVolunteeringToVolunteer = async () => {
      const { data } = await axios.get("http://localhost:8000/volunteerToVolunteer")
      let data2=data.filter(user=>user.Status==true)
      setVolunteeringTovolunteer(data2)
   }
   const updateStatus = async (id) =>{
      volunteeringTovolunteerUpdate.Status=true
      const {data}= await axios.put("http://localhost:8000/volunteerToVolunteer/"+id,{
         Status:true
      })
      getVolunteeringToVolunteer()
   }
 
   useEffect(() => {
    getVolunteeringToVolunteer()
   }, [])
   return (<div>
      <Table striped bordered hover>
         <thead>
            <tr>
               <th>#</th>
               <th>התנדבות</th>
               <th> מתנדב</th>
               <th>תאריך</th>
               <th>עיר</th>
               
            </tr>
         </thead>
         <tbody>
            {volunteeringTovolunteer.msg && volunteeringTovolunteer.msg.map((item) => {
               return(
                  <tr>
                  <td></td>
                  <td>{item.idVolunteer.idVolunteerType.Name}</td>
                  <td>{item.idUser.FirstName}</td>
                  {/* {setVolunteeringTovolunteerUpdate(item)}             */}

                  {/* <td>{}</td> */}
                  {/* <td><button onClick={()=>deleteVolunteering(item._id)}>מחיקה</button></td> */}
                  <td><button onClick={()=>updateStatus(item._id)}>אישור</button></td>
               </tr>
              
               )
           })} 

         </tbody>
      </Table>
   </div>

   )
}
export default HomeDirector