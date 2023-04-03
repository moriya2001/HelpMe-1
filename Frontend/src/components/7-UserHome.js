import React, { useEffect, useState } from "react";
import '../images/login.jpg';
import './7-UserHome.css'
import axios from "axios"
const UserHome = () => {
    const [volunteering, setVolunteering] = useState([]);
    useEffect(() => {
        getVolunteering()
     },[]);
    const getVolunteering =async()=>{
        const {data}=await axios.get("http://localhost:8000/volunteerType")
        console.log(data)
        setVolunteering(data)
        // console.log(volunteering)
    }
    return <div className="volunteering-cards-wrapper">
        {volunteering?.map(v => (
            <div className="card" style={{ width: '18rem' }}>
                <div>{v.Name}</div>
                <div className="card-img-top" style={{ backgroundImage: `url(${v.Url})` }}></div>
                <div className="card-body">
                    <p className="card-text">{v.description}</p>
                </div>
            </div>
        ))
        }
    </div>

}
export default UserHome;