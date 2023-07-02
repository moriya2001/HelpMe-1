import React, { useEffect, useState } from "react";
import animal from'../images/animal.jpg';
import food from '../images/food.jpg';
import helpFamily from '../images/helpFamily.jpg';
import old from '../images/old.jpg';
import patsient from '../images/patsient.jpg';
import './7-UserHome.css'
import axios from "axios"

const UserHome = () => {
    const [volunteering, setVolunteering] = useState([]);
    useEffect(() => {
        getVolunteering()
    }, []);
    const getVolunteering = async () => {
        const { data } = await axios.get("http://localhost:8000/volunteerType")
        console.log(data)
        setVolunteering(data)
        // console.log(volunteering)
    }
    const img1 = [animal,food , helpFamily, old, patsient];
    return <div style={{backgroundColor : "pink"}}>
              {/* <img src="../images/חיות.jpg" /> */}
        {img1.map(v => (
         <img src={v} className="imgae1"/>
           
        
))
        }
        {/* {volunteering?.map(v => (
            <div className="card" style={{ width: '18rem' }}>
                <div>{v.Name}</div>
                <div className="card-img-top" style={{ backgroundImage: `url(${v.Url})` }}></div>
                <div className="card-body">
                    <p className="card-text">{v.description}</p>
                </div>
            </div>
        ))
        } */}
    </div>

}
export default UserHome;