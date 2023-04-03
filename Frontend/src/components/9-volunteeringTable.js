import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
const VolunteeringTable = () => {
   const [volunteering, setVolunteering] = useState([])
   const [volunteerType, setVolunteerType] = useState([])
   const getVolunteering = async () => {
      const { data } = await axios.get("http://localhost:8000/volunteering")
      console.log(data)
      setVolunteering(data)
   }
   const volunteerTypeById = async(id)=>{
      const {data}=await axios.get("http://localhost:8000/volunteerType/" +id)
     setVolunteerType(data.value)
     console.log(volunteerType)
     
   }
   const deleteVolunteering = async (id) => {
      const { data } = await axios.delete("http://localhost:8000/volunteering/" +id)
      getVolunteering()
   }
   
   useEffect(() => {
      getVolunteering()
   }, [])
   return (<div>
      <Table striped bordered hover>
         <thead>
            <tr>
               <th>#</th>
               <th>סוג התנדבות</th>
               <th>תאריך התחלה</th>
               <th>תאריך סיום</th>
               <th>עיר</th>
               <th>רחוב</th>
               <th>תאור</th>
            </tr>
         </thead>
         <tbody>
            {volunteering && volunteering.map((item) => {
               return <tr>
                  <td></td>
                  <td>{item.idVolunteerType}</td>
                  <td>{item.SDate}</td>
                  <td>{item.NDate}</td>
                  <td>{item.idCity}</td>
                  <td>{item.Address}</td>
                  <td>{item.Description}</td>
                  {/* {volunteerTypeById(item.idVolunteerType)} */}
                  {/* <td>{}</td> */}
                  <td><button onClick={()=>deleteVolunteering(item._id)}>מחיקה</button></td>
               </tr>
           })} 

         </tbody>
      </Table>
   </div>

   )
}
export default VolunteeringTable