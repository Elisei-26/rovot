import { React, useState, Component } from "react";
import { Row, Form, Col, Button, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import LinkContainer from "react-router-bootstrap";
import { Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { collection, doc, setDoc } from "firebase/firestore";
import db from "../firebase";

import judete from "../constData";
import Cookies from "js-cookie";

import "react-datepicker/dist/react-datepicker.css";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cnp, setCnp] = useState("");
  const [sex, setSex] = useState("F");
  const [date, setDate] = useState(new Date());
  const [judet, setJudet] = useState("Sibiu");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [agreed, setAgreed] = useState(false);
  const [cnpverified, setCnpVerified] = useState(false);
  const [announcer, setAnnouncer] = useState("");

  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  }; //cnp ex:2690627131268

  const account = Cookies.get("account");
  if (account !== undefined) {
    return (
      <center>
        <h1></h1>
        <Paper style={{ width: 1000 }} elevation={8}>
          <h1 size="10">
            <font color="blue">R</font>
            <font color="blue">o</font>
            <font color="#cccc00">V</font>
            <font color="red">o</font>
            <font color="red">t</font>
          </h1>
          <p>Esti deja logat!</p>
          <button type="button" className="btn btn-ligth btn-outline-info m-4">
            <a href="/home">Home</a>
          </button>
        </Paper>
      </center>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email == "" || name == "" || password == "")
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
    else if (!cnpverified) setAnnouncer("Error: CNP is not valid.");
    else if (password != passwordConfirm)
      setAnnouncer("Error: passwords don't match");
    else if (!agreed) setAnnouncer("Error: you must agree to the terms");
    else {
      //everything is alright
      try {
        setAnnouncer("Status: Registering you...");
        setDoc(doc(collection(db, "users"), email), {
          _email: email,
          _name: name,
          _password: password,
          _cnp: cnp,
          _sex: sex,
          _judet: judet,
          _birthDate: date,
          _votStatus: "None",
        }).then((r) => {
          alert("inregistrat!");
          routeChange("");
        });
      } catch (e) {
        setAnnouncer("Internal error: user not registered");
      }
    }
  };

  const CNPChange = (cnp) => {
    if (cnp.length !== 13) return;

    const verifyConstantNumber = "279146358279";

    var totalAdunat = 0;
    for (var i = 0; i < 12; i++) {
      totalAdunat = totalAdunat + cnp[i] * verifyConstantNumber[i];
    }

    var verifyDigit = totalAdunat % 11;
    if (verifyDigit === 10) verifyDigit = 1;

    if (/^\d+$/.test(cnp) && verifyDigit == cnp[12]) {
      const s = cnp[0];
      var aa = cnp[1] + cnp[2];
      const ll = cnp[3] + cnp[4];
      const zz = cnp[5] + cnp[6];
      const jj = cnp[7] + cnp[8];
      const nnn = cnp[9] + cnp[10] + cnp[11];

      if (s % 2 == 1) setSex("M");
      else setSex("F");

      if (s == 1 || s == 2) aa = 19 + aa;
      else if (s == 3 || s == 4) aa = 18 + aa;
      else if (s == 5 || s == 6) aa = 20 + aa;

      setDate(new Date(aa, ll - 1, zz));
      setJudet(judete[jj - 1]);

      setCnpVerified(true);
    } else {
      //invalid cnp
      setCnpVerified(false);
    }
  };

  return (
    <center>
      <h1></h1>
      <Paper style={{ height: 500, width: 600 }} elevation={8}>
        <Container fluid>
          <Form onSubmit={handleSubmit}>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Adresa de email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="exemplu@adresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Nume complet</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Popescu Ioan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Parola</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Parola"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Label>Confirmare parola</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Parola"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="formGridCNP">
                <Form.Label>Cod Numeric Personal</Form.Label>
                <Form.Control
                  placeholder="1223344550006"
                  value={cnp}
                  onChange={(e) => {
                    setCnp(e.target.value);
                    CNPChange(e.target.value);
                  }}
                  maxLength={13}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSex">
                <Form.Label>Sex</Form.Label>
                <Form.Select disabled defaultValue="F" value={sex}>
                  <option value="F">F</option>
                  <option value="M">M</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDate">
                <Form.Label>Data nasterii</Form.Label>
                <DatePicker
                  selected={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled
                  className="form-control"
                  customInput={
                    <input
                      type="text"
                      id="validationCustom01"
                      placeholder="First name"
                    />
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Judet</Form.Label>
                <Form.Select disabled defaultValue="Sibiu" value={judet}>
                  {judete.map((judet) => (
                    <option value={judet}>{judet}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <center className="mb-3">
              <Form.Group as={Col}>
                <Form.Check
                  required
                  className="d-flex justify-content-center"
                  name="terms"
                  label="Agree to terms and conditions"
                  feedbackTooltip
                  checked={agreed}
                  onChange={(e) => setAgreed(!agreed)}
                />
              </Form.Group>

              <Button
                as={Col}
                className="btn btn-primary m-2"
                variant="primary"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Register
              </Button>

              <Button
                as={Col}
                className="btn btn-primary m-2"
                variant="primary"
                onClick={(e) => {
                  routeChange("/login");
                }}
              >
                Login
              </Button>
            </center>

            <Row className="mb-3">
              <p>{announcer}</p>
            </Row>
          </Form>
        </Container>
      </Paper>
    </center>
  );
}

export default Register;
//<button type="button" className="btn btn-warning btn-outline-danger m-4"><a href="/register">Register</a></button>
