import axios from "axios";
import React from "react";
import Form from 'react-bootstrap/Form';
import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect } from "react";
const SearchVolunteering =()=>{
    const [VolunteerType,setVolunteerType]=useState()
    const [selectVolunteering,setSelectVolunteering]=useState()
    const [sTime,setSTime]=useState()
    const [eTime,setETime]=useState()
    const [value, onChange] = useState(new Date());
    const getVolunteering =async()=>{
     const {data}=await axios.get("http://localhost:8000/society")
     console.log(data)
     setVolunteerType(data)
    }
    useEffect(()=>{
        getVolunteering()
    },[])
return(<>
    <Form.Select aria-label="Default select example" onChange={(e)=>{console.log(e.target.value)}}>
    <option>תבחר את סוג ההתנדבות הרצויה </option>
        {VolunteerType&&VolunteerType.map((item)=>{
          return <option value={item.id} >{item.Name}</option>
        }
 )}
</Form.Select>
זמן התחלה:<DateTimePicker onChange={onChange} value={value} />
זמן סיום:<DateTimePicker onChange={onChange} value={value} />
</>

)
}
export default SearchVolunteering