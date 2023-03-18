import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import axios from "axios"
function ChooseSecioty() {
    const [allsociety,setAllsociety]=useState([])
    const getallsociety = async () => {
        const { data } = await axios.get("http://localhost:8000/society")
        console.log(data)
        setAllsociety(data)
      }
      useEffect(()=>{
        getallsociety()
    },[])
    
   
  return (<>
        <Dropdown.Menu show>
     {allsociety.map(society => (
     <Dropdown.Item eventKey="1">{society.Name}</Dropdown.Item>
    ))}
 </Dropdown.Menu>
  </>);
}

export default ChooseSecioty;