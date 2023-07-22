import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Row } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import moment from 'moment';
import Col from "react-bootstrap/Col";

const VolunteeringsToApprove = () => {
    const [volunteeringTovolunteer, setVolunteeringTovolunteer] = useState([])
    const getVolunteeringToVolunteer = async () => {
        const { data } = await axios.get("/volunteering/getPendingVolunteerings")
        // let data2=data.filter(user=>user.Status==true)
        console.log(data)
        console.log("11111")
        setVolunteeringTovolunteer(data)


    }
    const updateStatus = async (id) => {
        console.log("id", id)
        const selectedVol = volunteeringTovolunteer.find(v => v._id === id);
        const filteredApproves = volunteeringTovolunteer.filter(v => v._id !== id);
        await axios.put(`/volunteering/updateVolunteeringApprove/${selectedVol._id}`)
        setVolunteeringTovolunteer(filteredApproves);
        console.log("selectedVol", selectedVol)
        emailjs.send("service_7rzvtwg", "approve", {
            to_user: selectedVol.idVolunteerUser?.FirstName,
            vol_type: selectedVol.idVolunteerType.Name,
            vol_adress: selectedVol.Address,
            vol_date: moment(selectedVol.SDate).format('DD-MM-YYYY HH:mm'),
            vol_endDate: moment(selectedVol.NDate).format('DD-MM-YYYY HH:mm'),
            userEmail: selectedVol.idVolunteerUser.Email,
        }, 'cubY8Y-jimY937YfV');
        console.log("url", `/users/${selectedVol.idVolunteerUser._id}/volunteer-approved`)
        axios.put(`/users/${selectedVol.idVolunteerUser._id}/volunteer-approved`)
    }


    useEffect(() => {
        getVolunteeringToVolunteer()
    }, [])
    const sortByDate = () => {
        return volunteeringTovolunteer.sort((a,b)=>{
            return new Date(a.SDate).getTime() - new Date(b.SDate).getTime()
        })
    }
    return <>
        {sortByDate().length &&
            <><h2 className="text-center mb-4 rouded-3 p-3 mb-5 bg-white rounded">התנדבויות ממתינות לאישור</h2>
                <Row>
                    <Col xs={6} className={"p-5 mx-auto"}>
                        <Table striped bordered responsive hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>התנדבות</th>
                                    <th>מתנדב</th>
                                    <th>תאריך התחלה</th>
                                    <th>תאריך סיום</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteeringTovolunteer.map((item, index) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.idVolunteerType.Name}</td>
                                            <td>{item.idVolunteerUser?.FirstName}</td>
                                            <td>{item.SDate}</td>
                                            <td>{item.NDate}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => updateStatus(item._id)}>אישור
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row></>}
    </>
}
export default VolunteeringsToApprove;
