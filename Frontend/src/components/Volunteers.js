import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const Volunteers = () => {
//   const navigate = useNavigate()
   const [volunteer, setVolunteer] = useState([])
//    const [volunteerType, setVolunteerType] = useState([])
   const getVolunteer = async () => {
      const { data } = await axios.get("http://localhost:8000/users")
      const vol=data.filter(v=>v.Status!=true)
    //   console.log(vol)
      setVolunteer(data)
   }
 
//    const deleteVolunteering = async (id) => {
//       const { data } = await axios.delete("http://localhost:8000/volunteering/" +id)
//       getVolunteering()
//    }
   // const updateVolunteering = async (id)=>{
   //    navigate("/updateVolunteer")
   // }
//    const addVolunteering = async ()=>{
//       navigate("/addVolunteering")
//    }
   useEffect(() => {
      getVolunteer()
   }, [])
   return (<div>
      <Table striped bordered hover>
         <thead>
            <tr>
               <th>#</th>
               <th>שם פרטי</th>
               <th>שם משפחה</th>
               <th>ת.ז</th>
               <th>טלפון</th>
               <th>אימייל</th>
               <th>מטבעות</th>
            </tr>
         </thead>
         <tbody>
            {volunteer && volunteer.map((item) => {
               return <tr>
                  <td></td>
                  <td>{item.FirstName}</td>
                  <td>{item.LastName}</td>
                  <td>{item.Tz}</td>
                  <td>{item.Phone}</td>
                  <td>{item.Email}</td>
                  <td>{item.Coins}</td>
                  {/* {volunteerTypeById(item.idVolunteerType)} */}
                  {/* <td>{}</td> */}
                  {/* <td><button onClick={()=>deleteVolunteering(item._id)}>מחיקה</button></td> */}
                  {/* <td><button onClick={()=>updateVolunteering(item._id)}>עריכה</button></td> */}

               </tr>
           })} 

         </tbody>
      </Table>
      
   </div>

   )
}
export default Volunteers