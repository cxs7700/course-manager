import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardFooter, CardBody, CardText, Button, 
  CardHeader, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Course = () => {
  const [selected, setSelected] = useState([]);
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");

  let data = [ 
    {name: 'swen-250', desc: 'personal software eng', details: 'C and fun with vi and command line'},
    {name: 'swen-331', desc: 'secure software', details: 'Fuzzer - you will love it, you will fear it!'},
    {name: 'swen-440', desc: 'system architecture', details: 'Services?  What what\'s a service?  I need do do math for metrics?'},
    {name: 'swen-344', desc: 'web engineering', details: 'You mean web pages, right?  Wait, there\'s more?'}
  ];
  
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
    if (id && data) {
      setModalHeader(data[id].name);
      setModalBody(data[id].details);
    }
  };
  
  const handleClick = e => {
    if (e.target.innerText === "Add") {
      e.target.innerText = "Remove";
      setSelected(selected.concat(e.target.id))
    } else {
      e.target.innerText = "Add";
      setSelected(selected.filter(x => x !== e.target.id))
    }
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
          <Row>
            {data.map((entry, idx) => {
              return (
                <Col className="text-center">
                  <Card id={idx}>
                    <CardHeader>
                      {entry.name + " "}
                      {/* eslint-disable-next-line */}
                      <HelpOutlineIcon id={idx} focusable={true} onClick={toggle} style={{verticalAlign: "bottom", cursor: "pointer"}} color="primary" fontSize="medium"/>
                    </CardHeader>
                    <CardBody>
                      <CardText>{entry.desc}</CardText>
                    </CardBody>
                    <CardFooter><Button id={idx} color="primary" onClick={handleClick}>Add</Button></CardFooter>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Your Selections</CardHeader>
        <CardBody>
          <Row>
            <Col className="text-center">
              {selected.map(selection => {
                return (
                  <div>{data[selection].name + " -- " + data[selection].desc}</div>
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