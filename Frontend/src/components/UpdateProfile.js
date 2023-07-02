import react from "react"
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
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
const UpdateProfil = () => {
   const userBeforeChanges = JSON.parse(localStorage["user"]);
   const [user, setUser] = useState(userBeforeChanges);
   const navigate = useNavigate()
   const saveChanges = async () => {
      const { data } = await axios.put(`http://localhost:8000/users/${user._id}`, user);
      navigate("/Definitions");
      localStorage["user"] = JSON.stringify(user);
   }

   return (<div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
         <MDBInput wrapperClass='mb-4' value={user.FirstName} label='שם פרטי' id='form1' type='text' onChange={(e) => setUser({ ...user, FirstName: e.target.value })} />
         <MDBInput wrapperClass='mb-4' value={user.LastName} label='שם משפחה' id='form1' type='text' onChange={(e) => setUser({ ...user, LastName: e.target.value })} />
         <MDBInput wrapperClass='mb-4' value={user.Email} label='אימייל' id='form1' type='email' onChange={(e) => setUser({ ...user, Email: e.target.value })} />
         <MDBInput wrapperClass='mb-4' value={user.Password} label='סיסמא' id='form1' type='password' onChange={(e) => setUser({ ...user, Password: e.target.value })} />
         <MDBInput wrapperClass='mb-4' value={user.Tz} label='ת.ז' id='form1' type='text' onChange={(e) => setUser({ ...user, Tz: e.target.value })} />
         <MDBInput wrapperClass='mb-4' value={user.BirthYear} label='שנת לידה' id='form1' type='text' onChange={(e) => setUser({ ...user, BirthYear: e.target.value })} />
         <MDBInput wrapperClass='mb-4' value={user.Phone} label='מס טלפון ' id='form1' type='text' onChange={(e) => setUser({ ...user, Phone: e.target.value })} />

         <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='האם אתה מתנדב?' onChange={(e) => setUser({ ...user, Status: e.target.checked })} />
         </div>

         <MDBBtn className="mb-4 w-100" onClick={saveChanges}>שמור שינויים</MDBBtn>
      </MDBContainer>
   </div>
   );
}
export default UpdateProfil