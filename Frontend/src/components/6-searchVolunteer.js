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
    const [city,setCity]=useState()
    const [sTime,setSTime]=useState(new Date())
    const [eTime,setETime]=useState(new Date())
    const [foundVolunteering,setFoundVolunteering]=useState([])
    const getVolunteering =async()=>{
     const {data}=await axios.get("http://localhost:8000/volunteerType")
     console.log(data)
     setVolunteerType(data)
    }
    const getCity=async()=>{
        const {data}=await axios.get("http://localhost:8000/city")
        console.log(data)
        setCity(data)
       }
    useEffect(()=>{
        getVolunteering()
        getCity()
    },[])
    const search = async()=>{
        const {data}=await axios.get("http://localhost:8000/volunteering/search")
        setFoundVolunteering(data)
    }
   const confirmVlunteering =()=>{
       alert("aaaa")
   }
return(<>
    <Form.Select aria-label="Default select example" onChange={(e)=>{console.log(e.target.value)}}>
    <option>תבחר את סוג ההתנדבות הרצויה </option>
        {VolunteerType&&VolunteerType.map((item)=>{
          return <option value={item.id} >{item.Name}</option>
        }
 )}
</Form.Select>
<Form.Select aria-label="Default select example" onChange={(e)=>{console.log(e.target.value)}}>
    <option>תבחר את סוג העיר  </option>
        {city&&city.map((item)=>{
          return <option value={item.id} >{item.Name}</option>
        }
 )}
</Form.Select>
זמן התחלה:<DateTimePicker onChange={setSTime} value={sTime} />
זמן סיום:<DateTimePicker onChange={setETime} value={eTime} />
<Button as="input" type="submit" value="Submit" onClick={search}/>
<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" onClick={confirmVlunteering}>Go somewhere</Button>
      </Card.Body>
    </Card>
</>

)
}
export default SearchVolunteering