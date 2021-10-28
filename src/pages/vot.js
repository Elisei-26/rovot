import React, { useState, useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import RovotTitle from "../elements/rovotTitle";
import { Row, Form, Col, Button, Container } from "react-bootstrap";

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

  function trimiteVotul(n) {
    updateDoc(doc(collection(db, "users"), Cookies.get("account")), {
      _votStatus: n,
    }).then((r) => {
      routeChange("/vot");
    });
  }

  function VoteCard(props) {
    return (
      <Paper style={{ width: 400, height: 300 }} elevation={8}>
        <h1>Partid: {props.partid}</h1>
        <h1>Candidat: {props.candidat}</h1>
        <Button
          className="btn btn-primary m-2"
          variant="primary"
          onClick={(e) => {
            trimiteVotul(props.candidat);
          }}
        >
          Voteaza
        </Button>
      </Paper>
    );
  }

  useEffect(() => {
    try {
      getDoc(doc(db, "users", Cookies.get("account"))).then((response) => {
        setVot(response.data()._votStatus);
      });
    } catch (e) {
      setVot(-2);
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
        <h1></h1>
        <Paper style={{ width: 600 }} elevation={8}>
          <RovotTitle />
          <p>Trebuie sa fi logat pentru a vota!</p>
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
        </Paper>
      </center>
    );
  } else if (vot !== "None") {
    return (
      <center>
        <h1></h1>
        <Paper style={{ width: 600 }} elevation={8}>
          <RovotTitle />
          <p>Votul a fost deja trimis!</p>
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
        </Paper>
      </center>
    );
  }

  return (
    <center>
      <h1></h1>
      <RovotTitle />
        <Grid container spacing={3} style={{ width: 1320 }}>
          <Grid item xs={4}>
            <VoteCard partid="GGG" candidat="Andrei Ioan" />
          </Grid>
          <Grid item xs={4}>
            <VoteCard partid="WoW" candidat="Garcea Mihaiescu" />
          </Grid>
          <Grid item xs={4}>
            <VoteCard partid="RAM" candidat="Araf George" />
          </Grid>
        </Grid>
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
    </center>
  );
};

export default Vot;
