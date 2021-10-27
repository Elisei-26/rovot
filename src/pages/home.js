import React from 'react';
//import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';

import { useHistory } from "react-router-dom";

import Cookies from 'js-cookie'

export const getAccessToken = () => Cookies.get('access_token')
export const getRefreshToken = () => Cookies.get('refresh_token')
export const isAuthenticated = () => !!getAccessToken()

function Home() {
  return (
    <center>
      <h1></h1>
      <Paper style={ { width: 1000 } } elevation={8}>
        <h1 size="10"><font color="blue">R</font><font color="blue">o</font><font color="#cccc00">V</font><font color="red">o</font><font color="red">t</font></h1>
        <button type="button" className="btn btn-warning btn-outline-danger m-4"><a href="/register">Register</a></button>
        <button type="button" className="btn btn-danger btn-outline-primary m-4"><a href="/login">Log in</a></button>
      </Paper>
    </center>
  );
}
export default Home;