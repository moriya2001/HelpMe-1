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
  const defaultFilters = { type: '-1', city: '-1', startDate: '-1', endDate: '-1' };
  const [show, setShow] = useState(false);
  const [selectedVolunteering, setSelectedVolunteering] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [VolunteerType, setVolunteerType] = useState()
  const [volunteering, setVolunteering] = useState([])
  const [city, setCity] = useState()
  // const [sTime, setSTime] = useState(new Date())
  // const [eTime, setETime] = useState(new Date())
  const [foundAllVolunteering, setAllFoundVolunteering] = useState([])
  const [foundFilterVolunteering, setFiletrFoundVolunteering] = useState([])
  const [filters, setFiletrs] = useState(defaultFilters);
  const currentUser = JSON.parse(localStorage["user"])//useSelector((state) => state.users.currentUser);

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

  const getAllVolunteerings = async () => {
    const { data } = await axios.get("http://localhost:8000/volunteering/search")
    console.log(data)
    setAllFoundVolunteering(data)
    setFiletrFoundVolunteering(data.msg)
  }
  useEffect(() => {
    getVolunteeringType()
    getCity()
    getAllVolunteerings()
  }, [])
  const search = () => {
    const filterVol = foundAllVolunteering.msg.filter(v => {
      if (filters.type === '-1' || (filters.type && v.idVolunteerType._id === filters.type)) {
        if (filters.city === '-1' || (filters.city && v.idCity._id === filters.city)) {
          if (filters.startDate === '-1' || (filters.startDate && new Date(v.SDate) >= filters.startDate)) {
            if (filters.endDate === '-1' || (filters.endDate && new Date(v.NDate) <= filters.endDate)) {
              return true;
            }
          }
        }
      }
      return false;
    });
    setFiletrFoundVolunteering(filterVol);
  }
  const confirmVlunteering = () => {
    alert("aaaa")
  }
  const sendVolunteeringRequest = async () => {
    handleClose();
    const newVol = { ...selectedVolunteering, Status: 3, idVolunteerUser: currentUser._id }
    await axios.put(`http://localhost:8000/volunteering/${selectedVolunteering._id}`, newVol);
    console.log(currentUser)

  }
  const selectVolunteering = (item) => {
    setSelectedVolunteering(item);
    console.log(item);
    handleShow()
  }
  const onChangeFilter = (e, type) => {
    const newFilters = { ...filters };
    if (['startDate', 'endDate'].includes(type)) {
      newFilters[type] = e;
    } else {
      newFilters[type] = e.target.value;
    }
    setFiletrs(newFilters);
  }
  const clearFilters = () => {
    setFiletrFoundVolunteering(foundAllVolunteering.msg);
    setFiletrs(defaultFilters);
  }

  return (<>
    <Form.Select value={filters.type} aria-label="Default select example" onChange={(e) => { onChangeFilter(e, 'type') }}>
      <option value="-1">תבחר את סוג ההתנדבות הרצויה </option>
      {VolunteerType && VolunteerType.map((item) => {
        return <option value={item._id} >{item.Name}</option>
      }
      )}
    </Form.Select>
    <Form.Select value={filters.city} aria-label="Default select example" onChange={(e) => { onChangeFilter(e, 'city') }}>
      <option value='-1'>תבחר את העיר  </option>
      {city && city.map((item) => {
        return <option value={item._id} >{item.Name}</option>
      }
      )}
    </Form.Select>
    זמן התחלה:<DateTimePicker onChange={e => onChangeFilter(e, 'startDate')} value={filters.startDate === '-1' ? new Date() : filters.startDate} />
    זמן סיום:<DateTimePicker onChange={e => onChangeFilter(e, 'endDate')} value={filters.endDate === '-1' ? new Date() : filters.endDate} />
    <Button as="input" type="submit" value="חיפוש" onClick={search} />
    <Button as="input" type="submit" value="ניקוי החיפוש" onClick={clearFilters} />
    <div className="volunteering-cards-wrapper" >
      {foundFilterVolunteering && foundFilterVolunteering.map(item => {
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
            <Button variant="primary" onClick={() => { selectVolunteering(item) }}>אני רוצה להתנדב</Button>
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