import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import emailjs from '@emailjs/browser';
import moment from 'moment';

const HomeDirector = () => {
   const statuses = [
      {
         id: 1,
         name: 'approve'
      },
      {
         id: 2,
         name: 'not approve'
      },
      {
         id: 3,
         name: 'pending'
      }
   ];
   const [volunteeringTovolunteer, setVolunteeringTovolunteer] = useState([])
   const [volunteeringTovolunteerUpdate, setVolunteeringTovolunteerUpdate] = useState({})
   const getVolunteeringToVolunteer = async () => {
      const { data } = await axios.get("http://localhost:8000/volunteering/getPendingVolunteerings")
      // let data2=data.filter(user=>user.Status==true)
      console.log(data)
      setVolunteeringTovolunteer(data)
      console.log(volunteeringTovolunteer)
   }
   const updateStatus = async (id) => {
      volunteeringTovolunteerUpdate.Status = true
      // const { data } = await axios.put(`http://localhost:8000/volunteering/updateVolunteeringApprove/${id}`).then(res => {
      // if (res.status == 200) {
      const selectedVol = volunteeringTovolunteer.find(v => v._id === id);
      const filteredApproves = volunteeringTovolunteer.filter(v => v._id !== id);
      setVolunteeringTovolunteer(filteredApproves);
      emailjs.send("service_7rzvtwg", "approve", {
         to_user: selectedVol.idVolunteerUser?.FirstName,
         vol_type: selectedVol.idVolunteerType.Name,
         vol_adress: selectedVol.Address,
         vol_date: moment(selectedVol.SDate).format('DD-MM-YYYY HH:mm'),
         vol_endDate: moment(selectedVol.NDate).format('DD-MM-YYYY HH:mm'),
         userEmail: selectedVol.idVolunteerUser.Email,
      }, 'cubY8Y-jimY937YfV');

      // }
      // })

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
               <th></th>
               {/* <th>עיר</th> */}

            </tr>
         </thead>
         <tbody>
            {volunteeringTovolunteer.map((item) => {
               return (
                  <tr>
                     <td></td>
                     <td>{item.idVolunteerType.Name}</td>
                     <td>{item.idVolunteerUser?.FirstName}</td>
                     {/* {setVolunteeringTovolunteerUpdate(item)}             */}

                     {/* <td>{}</td> */}
                     {/* <td><button onClick={()=>deleteVolunteering(item._id)}>מחיקה</button></td> */}
                     <td><button onClick={() => updateStatus(item._id)}>אישור</button></td>
                  </tr>

               )
            })}

         </tbody>
      </Table>
   </div>

   )
}
export default HomeDirector