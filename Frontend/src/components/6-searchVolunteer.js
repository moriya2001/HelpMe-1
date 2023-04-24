import axios from "axios";
import React from "react";
import Form from 'react-bootstrap/Form';
import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect } from "react";
// import { Button } from "bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const SearchVolunteering =()=>{
    const [VolunteerType,setVolunteerType]=useState()
    const [volunteering,setVolunteering]=useState([])
    const [city,setCity]=useState()
    const [sTime,setSTime]=useState(new Date())
    const [eTime,setETime]=useState(new Date())
    const [foundVolunteering,setFoundVolunteering]=useState([])
    const getVolunteeringType =async()=>{
     const {data}=await axios.get("http://localhost:8000/volunteerType")
     console.log(data)
     setVolunteerType(data)
    }
    const getVolunteering = async ()=>{
      const {data}= await axios.get("http://localhost:8000/volunteering")
      setVolunteering(data)
    }
    const getCity=async()=>{
        const {data}=await axios.get("http://localhost:8000/city")
        console.log(data)
        setCity(data)
       }
    useEffect(()=>{
        getVolunteeringType()
        getCity()
        getVolunteering()
    },[])
    const search = async()=>{
      console.log("SDate:"+ sTime)
      console.log("city:"+ city)
      console.log("TypeVolunteering:"+ VolunteerType)

        const {data}=await axios.get("http://localhost:8000/volunteering/search")
        setFoundVolunteering(data)
        console.log(data)
        
    }
   const confirmVlunteering =()=>{
       alert("aaaa")
   }
return(<>
    <Form.Select aria-label="Default select example" onChange={(e)=>{console.log(e.target.value)}}>
    <option>תבחר את סוג ההתנדבות הרצויה </option>
        {VolunteerType&&VolunteerType.map((item)=>{
          return <option value={item._id} >{item.Name}</option>
        }
 )}
</Form.Select>
<Form.Select aria-label="Default select example" onChange={(e)=>{console.log(e.target.value)}}>
    <option>תבחר את סוג העיר  </option>
        {city&&city.map((item)=>{
          return <option value={item._id} >{item.Name}</option>
        }
 )}
</Form.Select>
זמן התחלה:<DateTimePicker onChange={setSTime} value={sTime} />
זמן סיום:<DateTimePicker onChange={setETime} value={eTime} />
<Button as="input" type="submit" value="חיפוש" onClick={search}/>
<div className="volunteering-cards-wrapper" >
{volunteering&&volunteering.map(item=>{
  return <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={item.idVolunteerType} />
  <Card.Body>
    <Card.Title>{item.idVolunteerType}</Card.Title>
    <Card.Text>
     {item.Description}
    </Card.Text>
    <Card.Text>
שעת התחלה:{item.SDate}
    </Card.Text>
    <Card.Text>
     עיר:{item.idCity}
    </Card.Text>
    <Button variant="primary" onClick={confirmVlunteering}>אני רוצה להתנדב</Button>
  </Card.Body>
</Card>
})}
</div>

</>

)
}
export default SearchVolunteering