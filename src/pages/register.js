import { React, useState, Component } from "react";
import {
  Row,
  Form,
  Col,
  Button,
  Container,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import LinkContainer from "react-router-bootstrap";

import judete from "../constData";

import "react-datepicker/dist/react-datepicker.css";


const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cnp, setCnp] = useState("");
	const [sex, setSex] = useState("F");
  const [date, setDate] = useState(new Date());
	const [judet, setJudet] = useState("Sibiu");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(date);
  };

  const CNPChange = (cnp) => {
		if(cnp.length !== 13)
			return;

		const verifyConstantNumber = "279146358279";

		var totalAdunat = 0;
		for(var i = 0; i < 12; i++) {
			totalAdunat = totalAdunat + cnp[i] * verifyConstantNumber[i];
		}

		var verifyDigit = totalAdunat % 11;
		if(verifyDigit === 10)
			verifyDigit = 1;

    if (/^\d+$/.test(cnp) && verifyDigit == cnp[12]) {	//valid cnp
			const s = cnp[0];
			var aa = cnp[1] + cnp[2];
			const ll = cnp[3] + cnp[4];
			const zz = cnp[5] + cnp[6];
			const jj = cnp[7] + cnp[8];
			const nnn = cnp[9] + cnp[10] + cnp[11];
			
			if(s % 2 == 1)
				setSex("M");
			else
				setSex("F");

			if(s == 1 || s == 2)
				aa = 19 + aa;
			else if(s == 3 || s == 4)
				aa = 18 + aa;
			else if(s == 5 || s == 6)
				aa = 20 + aa;

			setDate(new Date(aa, ll - 1, zz));
			setJudet(judete[jj - 1]);
		} else { //invalid cnp
			alert("invalid");
		}
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Adresa de email</Form.Label>
            <Form.Control type="email" placeholder="exemplu@adresa.com" value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nume complet</Form.Label>
            <Form.Control type="text" placeholder="Popescu Ioan" value={name} onChange={e => setName(e.target.value)}/>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Parola</Form.Label>
            <Form.Control type="password" placeholder="Parola" value={password} onChange={e => setPassword(e.target.value)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridConfirmPassword">
            <Form.Label>Confirmare parola</Form.Label>
            <Form.Control type="password" placeholder="Parola" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
          </Form.Group>
        </Row>

        <Row className="mb-3">
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
              onChange={e => setDate(e.target.value)}
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

				<Row className="mb-3">
					<Form.Group as={Col}>
							<Form.Check
								required
								name="terms"
								label="Agree to terms and conditions"
								feedbackTooltip
							/>
					</Form.Group>

					<Button as={Col} variant="primary" type="submit" onClick={e => {handleSubmit(e)}}>
						Register
					</Button>

					
						<Button as={Col} variant="primary" onClick={e => { }}>
							Login
						</Button>
					
				</Row>
      </Form>
    </Container>
  );
};

export default Register;
