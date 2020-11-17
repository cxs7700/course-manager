import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardFooter, CardBody, CardText, Button, 
  CardHeader, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Course = ({ courses }) => {
  const [selected, setSelected] = useState([]);
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");
  
  // Changes border color on addition or removal
  useEffect(() => {
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      if (selected.includes(cards[i].id)) {
        cards[i].style.border = "3px solid blue";
      } else {
        cards[i].style.border = "1px solid rgba(0,0,0,.125)";
      }
    }
  }, [selected])

  const [modal, setModal] = useState(false);
  const toggle = e => {
    if (modalHeader && modalBody) {
      setModalBody("");
      setModalHeader("");  
    }
    setModal(!modal);
    let id = e.target.id;
    if (id && courses) {
      setModalHeader(courses[id][1]);
      setModalBody(courses[id][3]);
    }
  };
  
  const handleClick = e => {
    let id = e.target.id;
    let formData = new FormData();
    if (e.target.innerText === "Add") {
      e.target.innerText = "Remove";
      setSelected(selected.concat(id))
      formData.set('selected', true)
      fetch(`/coursedata/${id}/update`, {
        method: 'PUT',
        body: formData
      }).then(response => response.json())
      .then(data => console.log(data))
    } else {
      e.target.innerText = "Add";
      setSelected(selected.filter(x => x !== id))
      formData.set('selected', false)
      fetch(`/coursedata/${id}/update`, {
        method: 'PUT',
        body: formData
      }).then(response => response.json())
      .then(data => console.log(data))
    }
  }
  
  const allCourses = () => {
    let result = [];
    for (let i = 0; i < courses.length; i++) {
      result.push(
        <Col className="text-center">
          <Card id={i}>
            <CardHeader>
              {courses[i][1] + " "}
              {/* eslint-disable-next-line */}
              <HelpOutlineIcon id={i} focusable={true} onClick={toggle} style={{verticalAlign: "bottom", cursor: "pointer"}} color="primary" fontSize="medium"/>
            </CardHeader>
            <CardBody>
              <CardText>{courses[i][2]}</CardText>
            </CardBody>
            <CardFooter><Button id={i} color="primary" onClick={handleClick}>Add</Button></CardFooter>
          </Card>
        </Col>
      )
    }
    return result
  }
  
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalHeader}</ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Close</Button>{' '}
        </ModalFooter>
      </Modal>
      <Card>
        <CardHeader>Courses</CardHeader>
        <CardBody>
          <Row>{ allCourses() }</Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Your Selections</CardHeader>
        <CardBody>
          <Row>
            <Col className="text-center">
              {selected.map(selection => {
                return (
                  <div>{courses[selection][1] + " -- " + courses[selection][2]}</div>
                )
              })}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default Course;