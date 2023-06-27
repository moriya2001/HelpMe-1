import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Definitions = ()=>{
  const updateProfile = ()=>{

  }
    return(<>
   <ButtonGroup vertical>
      <Button onClick={updateProfile}>עריכת פרופיל</Button>
      <Button>התנדבויות שלי</Button>
      <Button>מטבעות</Button>
   </ButtonGroup>
    </>

    )
}
export default Definitions