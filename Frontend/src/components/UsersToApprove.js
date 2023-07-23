import React, {useEffect, useState} from 'react';
import {Table, Row} from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import emailjs from '@emailjs/browser';
import axios from 'axios';

const UsersToApprove = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const getPendingUsers = async () => {
        const {data} = await axios.get("/users/getPendingUsers");
        console.log(data)
        setPendingUsers(data)
    }
    useEffect(() => {
        getPendingUsers()
    }, []);

    const updateStatus = async (id, isApproved) => {
        const selectedUser = pendingUsers.find(v => v._id === id);
        const filteredApproves = pendingUsers.filter(v => v._id !== id);
        await axios.put(`/users/updateUserApprove/${selectedUser._id}`, {isApproved})
        setPendingUsers(filteredApproves);
        console.log("selectedUser", selectedUser)
        const title = isApproved === 3 ? 'אישור מתנדב' : 'הודעת סירוב';
        const noApproveContent = 'נפסלה מומעמדותך להתנדבות';
        const approvedContent = 'המשתמש נוצר בהצלחה במערכת\n תודה על הצטרפותך!!';
        emailjs.send("service_7rzvtwg", "approve_email", {
            to_user: selectedUser.FirstName,
            to_email: selectedUser.Email,
            title,
            content: isApproved === 3 ? approvedContent : noApproveContent
        }, 'cubY8Y-jimY937YfV');

    }
    return <>{pendingUsers.length && <>
        <h2 className="text-center mb-4 rouded-3 p-3 mb-5 bg-white rounded">מתנדבים הממתינים לאישור</h2>
        <Row>
            <Col xs={6} className={"p-5 mx-auto"}>
                <Table striped bordered responsive hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>שם מתנדב</th>
                        <th>גיל</th>
                        <th>טלפון</th>
                        <th>מייל</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendingUsers.map((item, index) => {
                        const nowYear = new Date().getFullYear();
                        const age = nowYear - item.BirthYear;
                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{`${item.FirstName} ${item.LastName}`}</td>
                                <td>{age}</td>
                                <td>{item.Phone}</td>
                                <td>{item.Email}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => updateStatus(item._id, 3)}>אישור
                                    </button>
                                    <button className="btn btn-primary" onClick={() => updateStatus(item._id, 2)}>סירוב
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

export default UsersToApprove;
