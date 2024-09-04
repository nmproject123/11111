import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Task({ task }) {
  const [taskState, setTaskState] = useState(task)

  const [iscompleted, setIsCompleted]= useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(taskState.completed===false){
          setIsCompleted(false);
        }
      } catch (error) {
        console.log(error);
      }   
    };

    fetchData();
  }, [iscompleted]);

  const completed= ()=> {
    setTaskState(prevState => ({ ...prevState, completed: true }));
    setIsCompleted(true);
  };
  return (
    <>
  <div>
  <Col xs={6}>
    <Row>
    <Col xs={12}>
    <Row className="py-3">
  <Col><Avatar label= "Title:"  /></Col>
  <Col><Avatar label={taskState.title} /></Col>
     </Row>
     </Col>
      <span>Completed: </span>
      {taskState.completed && <span>True</span>}
     
    
    {!iscompleted &&(<span>
      False
      <br/>
      <Button label="Mark Completed" raised size="small" onClick={completed} />
   </span> )}
   </Row></Col>
   </div>
    </>
  );
}

export default Task;
