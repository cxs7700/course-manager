import React from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
  NavLink, Container, Row, Col, Jumbotron, Button 
} from 'reactstrap';
import Course from './Course';

class CourseList extends React.Component {
  constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
          isOpen: false,
          data: ""
      };
  }
  
  fetchData() {
    fetch('/coursedata').then(
      response => response.json() 
    ).then(courses => {
        this.updateData(courses)
    })
  }
  
  updateData = (apiResponse) => {
    this.setState({data: apiResponse})
  }
  
  componentDidMount() {
    this.fetchData();
}

toggle() {
    this.setState({
        isOpen: !this.state.isOpen
    });
}

render() {
    return (
          <div>
              <Navbar color="inverse" light expand="md">
                  <NavbarBrand href="/">reactstrap</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                          <NavItem>
                              <NavLink href="https://reactstrap.github.io/components">Components</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
                          </NavItem>
                      </Nav>
                  </Collapse>
              </Navbar>
              <Jumbotron>
                  <Container>
                      <Row>
                          <Col>
                              <h1>Welcome to React</h1>
                              <p>
                                  <Button
                                      tag="a"
                                      color="success"
                                      size="large"
                                      href="http://reactstrap.github.io"
                                      target="_blank"
                                  >
                                      View Reactstrap Docs
                                  </Button>
                              </p>
                          </Col>
                      </Row>
                  </Container>
              </Jumbotron>
              <Container>
                  <Course 
                      courses={this.state.data}
                  />
              </Container>
          </div>
      );
  }
}

export default CourseList;