import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  Container,
  Image,
  Button,
} from "react-bootstrap";
import logo from "../../assets/medium_logo.svg";
import {
  IoNotificationsOutline,
  IoBookmarksOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Link, withRouter } from "react-router-dom";

//REDUX IMPORTS
import { connect } from "react-redux";

//REDUX
const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({});

class NavBar extends Component {
  render() {
    // console.log(this.props);
    return (
      <Navbar
        style={{
          paddingTop: 24,
          display: this.props.location.pathname === "/" ? "none" : "",
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img style={{ height: 54 }} alt="medium-logo" src={logo} />
          </Navbar.Brand>
          <h5 style={{ fontWeight: "bold", marginTop: "0.6em" }}>
            Good Morning
          </h5>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/search">
                <IoSearchOutline style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="#home">
                <IoBookmarksOutline style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="#link" className="medium-icon">
                <IoNotificationsOutline style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="#link" className="medium-icon">
                <Button variant="outline-secondary">Upgrade</Button>
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="success" as="div">
                  <Image
                    style={{ height: 30 }}
                    src="https://strive.school/favicon.ico"
                    roundedCircle
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/new-story">
                    Write a story
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/stories">
                    Stories
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/stats">
                    Stats
                  </Dropdown.Item>
                  <Dropdown.Item onClick={this.props.showModal}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
