import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom"

const Definitions = () => {
  const navigate = useNavigate()
  const myVolunteerings = () => {
    navigate("/myVolunteerings");
  }
  return (<>
    <ButtonGroup vertical>
      <Button onClick={myVolunteerings}>התנדבויות שלי</Button>
      <Button>מטבעות</Button>
    </ButtonGroup>
  </>

  )
}
export default Definitions