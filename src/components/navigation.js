import React from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from "react-bootstrap";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      authorization: ""
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log("my cookies:", document.cookie);
    if (
      document &&
      document.cookie &&
      JSON.parse(document.cookie) &&
      JSON.parse(document.cookie).email
    ) {
      this.setState({
        email: JSON.parse(document.cookie).email,
        authorization: JSON.parse(document.cookie).authorization
      });
    }
  }

  logout() {
    const token = this.state.authorization;

    console.log("logout", token);
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };

    axios.delete("https://test-api.inizio.cz/api/user");
    document.cookie = "";

    window.location.href = "/";
  }

  render() {
    console.log("props", this.props);
    return (
      <div>
        <Nav variant="pills" defaultActiveKey={"/" + this.props.url}>
          <Nav.Item>
            <Nav.Link href="/">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/list">List</Nav.Link>
          </Nav.Item>
          {this.state.email.length === 0 && (
            <React.Fragment>
              <Nav.Item>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav.Item>
            </React.Fragment>
          )}

          {this.state.email.length > 0 && (
            <React.Fragment>
              <Nav.Item>
                <NavItem>User - {this.state.email}</NavItem>
              </Nav.Item>
              <Nav.Item onClick={this.logout}>
                <Button>Logout</Button>
              </Nav.Item>
            </React.Fragment>
          )}
        </Nav>
      </div>
    );
  }
}