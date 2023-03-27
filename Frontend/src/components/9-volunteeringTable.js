import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
const VolunteeringTable = () => {
   const [volunteering, setVolunteering] = useState([])
   const getVolunteering = async () => {
      const { data } = await axios.get("http://localhost:8000/volunteering")
      setVolunteering(data)
   }
   const deleteVolunteering = async () => {

   }
   useEffect(() => {
      getVolunteering()
   }, [])
   return (<div>
      <Table striped bordered hover>
         <thead>
            <tr>
               <th>#</th>
               <th>volunteering type</th>
               <th>Sdate</th>
               <th>Sdate</th>
               <th>city</th>
               <th>Address</th>
               <th>Description</th>
            </tr>
         </thead>
         <tbody>
            {volunteering && volunteering.map((index, item) => {
               return <tr>
                  <td>{index}</td>
                  <td>{item.idVolunteerType}</td>
                  <td>{item.SDate}</td>
                  <td>{item.NDate}</td>
                  <td>{item.City}</td>
                  <td>{item.Address}</td>
                  <td>{item.Description}</td>
                  {/* <td>{}</td> */}
                  <td><button onClick={deleteVolunteering}>מחיקה</button></td>
               </tr>
            })}

         </tbody>
      </Table>
   </div>

   )
}
export default VolunteeringTable