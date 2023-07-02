import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const MyVolunteerings = () => {
    const [volunteering, setVolunteering] = useState([])
    const [volunteerType, setVolunteerType] = useState([])
    const user = JSON.parse(localStorage["user"]);
    const getVolunteering = async () => {
        const { data } = await axios.get(`http://localhost:8000/volunteering/getVolunteeringsByUserId/${user._id}`)
        console.log(data)
        setVolunteering(data)
    }
    const deleteVolunteering = async (id) => {
        const userId = user._id;
        const { data } = await axios.put(`http://localhost:8000/volunteering/updateVolunteeringRemoveUser/${id}`, {userId})
        const filteredVols = volunteering.filter(v => v._id !== id);
        setVolunteering(filteredVols);
    }

    useEffect(() => {
        getVolunteering()
    }, [])
    return (<div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>סוג התנדבות</th>
                    <th>תאריך התחלה</th>
                    <th>תאריך סיום</th>
                    <th>עיר</th>
                    <th>רחוב</th>
                    <th>תאור</th>
                </tr>
            </thead>
            <tbody>
                {volunteering && volunteering.map((item) => {
                    return <tr>
                        <td></td>
                        <td>{item.idVolunteerType?.Name}</td>
                        <td>{item.SDate}</td>
                        <td>{item.NDate}</td>
                        <td>{item.idCity?.Name}</td>
                        <td>{item.Address}</td>
                        <td>{item.Description}</td>
                        {/* {volunteerTypeById(item.idVolunteerType)} */}
                        {/* <td>{}</td> */}
                        <td><button onClick={() => deleteVolunteering(item._id)}>מחיקה</button></td>
                    </tr>
                })}

            </tbody>
        </Table>
    </div>

    )

}
export default MyVolunteerings;