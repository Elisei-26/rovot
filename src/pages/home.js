import React from "react";
import { Paper } from "@material-ui/core";
import { Button } from "react-bootstrap";
import RovotTitle from "../elements/rovotTitle";

import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

function Home() {
  const account = Cookies.get("account");

  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };

  return (
    <center>
      <h1></h1>
      <Paper style={{ width: 600 }} elevation={8}>
        <RovotTitle/>
        <p>Platforma electronica de sondaje oficiale pentru cetatenii romani.</p>
        {account === undefined ? (
          <div>
            <Button
              className="btn btn-primary m-2"
              variant="primary"
              type="submit"
              onClick={(e) => {
                routeChange("/register");
              }}
            >
              Register
            </Button>
            <Button
              className="btn btn-primary m-2"
              variant="primary"
              type="submit"
              onClick={(e) => {
                routeChange("/login");
              }}
            >
              Log in
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className="btn btn-primary m-2"
              variant="primary"
              type="submit"
              onClick={(e) => {
                routeChange("/vot");
              }}
            >
              Vot
            </Button>
            <Button
              className="btn btn-primary m-2"
              variant="primary"
              type="submit"
              onClick={(e) => {
                routeChange("/logout");
              }}
            >
              Log out
            </Button>
          </div>
        )}
      </Paper>
    </center>
  );
}
export default Home;
