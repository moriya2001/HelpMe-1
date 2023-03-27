import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React,{useState, useEffect} from 'react';
import DateTimePicker from 'react-datetime-picker';

import axios from 'axios';
function AddVolunteering() {
  const [sTime,setSTime]=useState(new Date())
  const [eTime,setETime]=useState(new Date())
  const [VolunteerType,setVolunteerType]=useState()
  const [city,setCity]=useState()
    const [volunteering,setVolunteering]=useState({})
    const addVolunteering =()=>{
      // volunteering.SDate=sTime
      console.log(volunteering)
    //  const {data}= await axios.post("http://localhost:8000/volunteering" ,volunteering)
       
    }
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
  return (
      <div style={{ backgroundColor: "white" }}>
    <Form>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
        <Form.Select aria-label="Default select example" onChange={(e)=>{console.log(e.target.value)}}>
    <option>סוג התנדבות </option>
        {VolunteerType&&VolunteerType.map((index,item)=>{
          return <option key={item.id} value={item.id} >{item.Name}</option>
        }
 )}
</Form.Select>
          {/* לשאול האם כדאי לעשות select */}
          {/* <Form.Control type="text" placeholder="Enter type volunteering" onChange={e=>setNameVolunteering({Name:e.target.value})}/> */}
        </Form.Group>
        <Form.Select aria-label="Default select example" onChange={(e)=>{console.log(e.target.value)}}>
    <option>תבחר את סוג העיר  </option>
        {city&&city.map((index, item)=>{
          return <option key={item.id} value={item.id} >{item.Name}</option>
        }
 )}
</Form.Select>
        </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>זמן התחלה:</Form.Label>

          <DateTimePicker onChange={setSTime} value={sTime} />   
               </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>זמן סיום:</Form.Label>
<DateTimePicker onChange={setETime} value={eTime} />
        </Form.Group>

    </Row>
   <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>כתובת</Form.Label>
        <Form.Control placeholder="1234 Main St" type='text'onChange={(e)=>setVolunteering({...volunteering,Adress:e.target.value})}/>
      </Form.Group>

    

      <Row className="mb-3">
    

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>תאור</Form.Label>
        <Form.Control as="textarea" rows={3} type='text'onChange={e=>setVolunteering({...volunteering,Description:e.target.value})}/>
      </Form.Group>
      </Row>
    <Button variant="primary" type="submit" onClick={()=>{addVolunteering()}} style={{ backgroundColor: "#0FFE0" }}>
       הוספת התנדבות
      </Button>
    </Form>
    </div>
  );
}

export default AddVolunteering;