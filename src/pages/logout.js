import React from "react";
import { Paper } from "@material-ui/core";
import { Button } from "react-bootstrap";
import RovotTitle from "../elements/rovotTitle";

import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

function Home() {
  const account = Cookies.get("account");

  if (account != undefined) Cookies.remove("account");

  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };

  return (
    <center>
      <h1></h1>
      <Paper style={{ width: 600 }} elevation={8}>
        <RovotTitle />
        {account == undefined ? (
          <div>
            <p>Esti delogat!</p>
            <Button
              className="btn btn-primary m-2"
              variant="primary"
              type="submit"
              onClick={(e) => {
                routeChange("/home");
              }}
            >
              Home
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
            <p>Delogat!</p>
            <Button
              className="btn btn-primary m-2"
              variant="primary"
              type="submit"
              onClick={(e) => {
                routeChange("/home");
              }}
            >
              Home
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
        )}
      </Paper>
    </center>
  );
}
export default Home;
