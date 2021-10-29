import { React } from "react";
import { useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import RovotTitle from "../elements/rovotTitle";

function Logout() {
  if (Cookies.get("account") !== undefined)
    Cookies.remove("account");

  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };

  return (
    <center>
      <h1></h1>
      <Paper style={{ width: 600 }} elevation={8}>
        <RovotTitle />
        <div>
          <p>Esti deja delogat!</p>
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
      </Paper>
    </center>
  );
}
export default Logout;
