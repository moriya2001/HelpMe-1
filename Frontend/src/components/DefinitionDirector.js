import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom"

const DefinitionsDirector = () => {
  const navigate = useNavigate()
  const volunteering = () => {
    navigate("/volunteeringTable");
  }
  const volunteers = () =>{
    navigate("/volunteers");
  }
  return (<>
    <ButtonGroup vertical>
      <Button onClick={volunteering}>התנדבויות</Button>
      <Button onClick={volunteers}>מתנדבים</Button>
    </ButtonGroup>
  </>

  )
}
export default DefinitionsDirector