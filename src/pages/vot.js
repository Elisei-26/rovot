import React, { useState, useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase";

import Cookies from "js-cookie";

const Vot = () => {
  const [vot, setVot] = useState(-1);

  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };

  useEffect(() => {
    try {
      getDoc(doc(db, "users", Cookies.get("account"))).then((response) => {
        setVot(response.data()._votStatus);
      });
    } catch (e) {
      //setAnnouncer("Internal error");
    }
  });

  if (vot == -1) {
    return (
      <center>
        <p>Loading...</p>
      </center>
    );
  } else if (vot == -2) {
    return (
      <center>
        <p>Internal error</p>
      </center>
    );
  }

  function trimiteVotul(n) {
    updateDoc(doc(collection(db, "users"), Cookies.get("account")), {
      _votStatus: n,
    }).then((r) => {
      routeChange("/vot");
    });
  }

  if (vot !== "None") {
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
          <p>Votul a fost deja trimis!</p>
          <button type="button" className="btn btn-ligth btn-outline-info m-4">
            <a href="/logout">Log out</a>
          </button>
        </Paper>
      </center>
    );
  }

  return (
    <center>
      <h1></h1>
      <Grid container spacing={3} style={{ width: 1320 }}>
        <Grid item xs={4}>
          <Paper style={{ width: 400, height: 300 }} elevation={8}>
            <h1>Partid: GGG</h1>
            <h1>Candidat: Andrei Ioan</h1>
            <button
              type="button"
              className="btn btn-info m-4"
              onClick={() => trimiteVotul("Andrei Ioan")}
            >
              VOTEAZA
            </button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ width: 400, height: 300 }} elevation={8}>
            <h1>Partid: WoW</h1>
            <h1>Candidat: Garcea Mihaiescu</h1>
            <button
              type="button"
              className="btn btn-info m-4"
              onClick={() => trimiteVotul("Garcea Mihaiescu")}
            >
              VOTEAZA
            </button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ width: 400, height: 300 }} elevation={8}>
            <h1>Partid: RAM</h1>
            <h1>Candidat: Araf George</h1>
            <button
              type="button"
              className="btn btn-info m-4"
              onClick={() => trimiteVotul("Araf George")}
            >
              VOTEAZA
            </button>
          </Paper>
        </Grid>
      </Grid>
      <button type="button" className="btn btn-outline-primary m-4">
        <a href="/logout">Log out</a>
      </button>
    </center>
  );
};

export default Vot;
