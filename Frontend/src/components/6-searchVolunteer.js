import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form';
import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
// import { Button } from "bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import store from "../Redux-toolkit/store";
import { selectUserId } from "../Redux-toolkit/usersSlice";
const SearchVolunteering = () => {
  const [show, setShow] = useState(false);
  const [selectedVolunteering, setSelectedVolunteering] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [VolunteerType, setVolunteerType] = useState()
  const [volunteering, setVolunteering] = useState([])
  const [city, setCity] = useState()
  const [sTime, setSTime] = useState(new Date())
  const [eTime, setETime] = useState(new Date())
  const [foundVolunteering, setFoundVolunteering] = useState([])
  const currentUser = useSelector((state) => state.users.currentUser);

  const getVolunteeringType = async () => {
    const { data } = await axios.get("http://localhost:8000/volunteerType")
    console.log(data)
    setVolunteerType(data)
  }
  // const getVolunteering = async () => {
  //   const { data } = await axios.get("http://localhost:8000/volunteering")
  //   setVolunteering(data)
  // }
  const getCity = async () => {
    const { data } = await axios.get("http://localhost:8000/city")
    console.log(data)
    setCity(data)
  }
  useEffect(() => {
    getVolunteeringType()
    getCity()
  }, [])
  const search = async () => {


    const { data } = await axios.get("http://localhost:8000/volunteering/search")
    console.log(data)
    setFoundVolunteering(data)

  }
  const confirmVlunteering = () => {
    alert("aaaa")
  }
  const sendVolunteeringRequest = () => {
    handleClose();
    // const x = selectCurrentUser()
    console.log(currentUser)

  }
  const selectVolunteering = (id) => {
    setSelectedVolunteering(id);
    console.log(id);
    handleShow()
  }
  return (<>
    <Form.Select aria-label="Default select example" onChange={(e) => { console.log(e.target.value) }}>
      <option>תבחר את סוג ההתנדבות הרצויה </option>
      {VolunteerType && VolunteerType.map((item) => {
        return <option value={item._id} >{item.Name}</option>
      }
      )}
    </Form.Select>
    <Form.Select aria-label="Default select example" onChange={(e) => { console.log(e.target.value) }}>
      <option>תבחר את סוג העיר  </option>
      {city && city.map((item) => {
        return <option value={item._id} >{item.Name}</option>
      }
      )}
    </Form.Select>
    זמן התחלה:<DateTimePicker onChange={setSTime} value={sTime} />
    זמן סיום:<DateTimePicker onChange={setETime} value={eTime} />
    <Button as="input" type="submit" value="חיפוש" onClick={search} />
    <div className="volunteering-cards-wrapper" >
      {foundVolunteering.msg && foundVolunteering.msg.map(item => {
        return <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={item.idVolunteerType} />
          <Card.Body>
            <Card.Title>{item.idVolunteerType.Name}</Card.Title>
            <Card.Text>
              {item.Description}
            </Card.Text>
            <Card.Text>
              שעת התחלה:{new Date(item.SDate).toLocaleString()}
            </Card.Text>
            <Card.Text>
              שעת סיום:{new Date(item.NDate).toLocaleString()}
            </Card.Text>
            <Card.Text>
              עיר:{item.idCity.Name}
            </Card.Text>
            <Button variant="primary" onClick={() => { selectVolunteering(item._id) }}>אני רוצה להתנדב</Button>
          </Card.Body>
        </Card>
      })}
    </div>
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendVolunteeringRequest}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  </>

  )
}
export default SearchVolunteering