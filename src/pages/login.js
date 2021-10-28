import { React, useState } from "react";
import { Row, Form, Col, Button, Container } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import RovotTitle from "../elements/rovotTitle";

import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";

import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);
  const [announcer, setAnnouncer] = useState("");

  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };

  const account = Cookies.get("account");
  if (account !== undefined) {
    return (
      <center>
        <h1></h1>
        <Paper style={{ width: 600 }} elevation={8}>
          <RovotTitle/>
          <p>Esti deja logat!</p>
          <Button
            as={Col}
            className="btn btn-primary m-2"
            variant="primary"
            onClick={(e) => {
              routeChange("/home");
            }}
          >
            Home
          </Button>
        </Paper>
      </center>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email == "" || password == "")
      setAnnouncer("Error: no field can be empty");
    else if (
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) == false
    )
      setAnnouncer("Error: invalid email address");
    else if (
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password) ==
      false
    )
      setAnnouncer(
        "Error: password must be at least 6 characters long and it must include a digit and a symbol"
      );
    else {
      try {
        getDoc(doc(db, "users", email)).then((response) => {
          if (response.exists()) {
            if (response.data()._password == password) {
              Cookies.set("account", email, { expires: 1 });
              routeChange("/vot");
            } else setAnnouncer("Status: Invalid password");
          } else
            setAnnouncer(
              "Status: There is no account associated with the specified email!"
            );
        });
      } catch (e) {
        setAnnouncer("Internal error: Couldn't log you in!");
      }
    }
  };

  return (
    <center>
      <h1></h1>
      <RovotTitle/>
      <Paper style={{ width: 600, height: 150 }} elevation={8}>
        <Container fluid>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="exemplu@adresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Parola</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Parola"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Button
                as={Col}
                className="btn btn-primary m-2"
                variant="primary"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Login
              </Button>
              <Form.Group as={Col}>
                <Form.Check
                  className="m-3"
                  type="checkbox"
                  id="rememberMe"
                  inline={true}
                  label="Remember me"
                  disabled
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(!rememberMe)}
                />
              </Form.Group>
              <Button
                as={Col}
                className="btn btn-primary m-2"
                variant="primary"
                type="submit"
                onClick={(e) => {
                  routeChange("/register");
                }}
              >
                Register
              </Button>
            </Row>

            <Row className="mb-3">
              <p>{announcer}</p>
            </Row>
          </Form>
        </Container>
      </Paper>
    </center>
  );
};

export default Login;
