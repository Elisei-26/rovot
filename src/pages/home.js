import React from "react";
import { Paper } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

function Home() {
  const account = Cookies.get("account");

  if (account === undefined) {
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
          <button type="button" className="btn btn-ligth btn-outline-info m-4">
            <a href="/register">Register</a>
          </button>
          <button type="button" className="btn btn-ligth btn-outline-info m-4">
            <a href="/login">Log in</a>
          </button>
        </Paper>
      </center>
    );
  }

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
        <button type="button" className="btn btn-ligth btn-outline-info m-4">
          <a href="/vot">Vot</a>
        </button>
        <button type="button" className="btn btn-ligth btn-outline-info m-4">
          <a href="/logout">Log out</a>
        </button>
      </Paper>
    </center>
  );
}
export default Home;
