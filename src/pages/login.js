import { React, useState, Component } from "react";
import {
  Row,
  Form,
  Col,
  Button,
  Container,
} from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("loggin in...");
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="exemplu@adresa.com" value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Group>

		  <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Parola</Form.Label>
            <Form.Control type="password" placeholder="Parola" value={password} onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
        </Row>

		<Row className="mb-3">
			<Button as={Col} variant="primary" type="submit" onClick={e => {handleSubmit(e)}}>
					Login
			</Button>
			<Form.Group as={Col}>
				<Form.Check
                    type="checkbox"
                    id="rememberMe"
                    label="Remember me"
                />
            </Form.Group>
			<Button as={Col} variant="primary" type="submit" onClick={e => { }}>
				Register
			</Button>
		</Row>
      </Form>
    </Container>
  );
};

export default Login;
