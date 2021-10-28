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

import uuid from "react-uuid";
import db from "../firebase";
import Cookies from "js-cookie";

function VoteCard(props) {
  let selection = props.selection;

  return (
    <Paper style={{ width: 300, height: 200 }} elevation={8}>
      <p style={{ fontSize: 30 }}>{props.candidat}</p>
      <p style={{ fontSize: 20 }}>Partid: {props.partid}</p>
      <Button
        className="btn btn-primary m-2"
        variant="primary"
        onClick={(e) => {
          if (selection[props.index] == 0)
            selection[props.index] = Math.max(...selection) + 1;
          else {
            for (var i = 0; i < 3; i++) {
              if (selection[props.index] < selection[i] && i != props.index)
                selection[i] = selection[i] - 1;
            }
            selection[props.index] = 0;
          }

          props.setSelection(selection);
        }}
      >
        Alege
      </Button>
      {selection[props.index] == 0 ? (
        <p></p>
      ) : (
        <p>Pozitie votat: {selection[props.index]}</p>
      )}
    </Paper>
  );
}

const Vot = () => {
  const [vot, setVot] = useState(-1);
  const [selection, setSelection] = useState([0, 0, 0]);
  const [votes, setVotes] = useState([]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function updateSelection(sel) {
    setSelection(sel);
    forceUpdate(); //foarte naspa, dont do this
  }

  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };

  const votanti = [
    ["Andrei Ioan", "Garcea Mihaiescu", "Araf George"],
    ["GGG", "WoW", "RAM"],
  ];

  function trimiteVotul() {
    const voteID = uuid();

    updateDoc(doc(collection(db, "users"), Cookies.get("account")), {
      _votStatus: voteID,
    }).then((r) => {
      var listaFinala = ["", "", ""];
      for (var i = 0; i < 3; i++) {
        if (selection[i] != 0) listaFinala[selection[i] - 1] = votanti[0][i];
      }
      setDoc(doc(db, "voturi", voteID), {
        _selection: listaFinala,
      }).then((rs) => {
        routeChange("/vot");
      });
    });
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
    if (votes.length == 0) {
      getDocs(collection(db, "voturi")).then((response) => {
        var votesData = [];
        response.forEach((doc) => {
          votesData.push(doc.data()._selection);
        });

        setVotes(votesData);
      });

      return (
        <center>
          <p>Loading...</p>
        </center>
      );
    }

    var singleVotes = [0, 0, 0];
    votes.forEach((vote) => {
      for (var j = 0; j < 3; j++) {
        if (vote[0] == votanti[0][j]) singleVotes[j]++;
      }
    });
    const classicWinner =
      votanti[0][singleVotes.indexOf(Math.max(...singleVotes))];
    //console.log(singleVotes)

    const alternativeLoser =
      votanti[0][singleVotes.indexOf(Math.min(...singleVotes))];
    var alternativeTotalVotes = singleVotes;
    votes.forEach((vote) => {
      for (var i = 0; i < 3; i++) {
        if (vote[i] == alternativeLoser) {
          for (var j = 0; j < 3; j++) {
            if (vote[i + 1] == votanti[0][j]) alternativeTotalVotes[j]++;
          }
        }
      }
    });

    //console.log(alternativeTotalVotes);
    const alternativeWinner =
      votanti[0][singleVotes.indexOf(Math.max(...singleVotes))];

    return (
      <center>
        <h1></h1>
        <Paper style={{ width: 600 }} elevation={8}>
          <RovotTitle />
          <p>Votul a fost deja trimis, acestea sunt rezultatele actuale: </p>
          <Row>
          <Form.Group as={Col}>
              <h6>Dupa votul clasic:</h6>
              <h6>
                {votanti[0][0]}: {singleVotes[0]}
              </h6>
              <h6>
                {votanti[0][1]}: {singleVotes[1]}
              </h6>
              <h6>
                {votanti[0][2]}: {singleVotes[2]}
              </h6>
              </Form.Group>
            <Form.Group as={Col}>
              <h6>Dupa votul alternativ:</h6>
              <h6>
                {alternativeWinner} (+
                {alternativeTotalVotes[
                  singleVotes.indexOf(Math.max(...singleVotes))
                ] - singleVotes[singleVotes.indexOf(Math.max(...singleVotes))]}
                )
              </h6>
              </Form.Group>
          </Row>
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
      <Paper elevation={8} style={{ width: 1100 }}>
        <Container fluid>
          <Row className="mb-3">
            <h1></h1>
            <Form.Group as={Col}>
              <VoteCard
                partid={votanti[1][0]}
                candidat={votanti[0][0]}
                index={0}
                selection={selection}
                setSelection={updateSelection}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <VoteCard
                partid={votanti[1][1]}
                candidat={votanti[0][1]}
                index={1}
                selection={selection}
                setSelection={updateSelection}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <VoteCard
                partid={votanti[1][2]}
                candidat={votanti[0][2]}
                index={2}
                selection={selection}
                setSelection={updateSelection}
              />
            </Form.Group>
          </Row>
          <center className="mb-3">
            <Button
              as={Col}
              className="btn btn-primary m-2"
              variant="primary"
              type="submit"
              onClick={(e) => {
                trimiteVotul();
              }}
            >
              Vote
            </Button>
            <Button
              as={Col}
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
        </Container>
      </Paper>
    </center>
  );
};

export default Vot;
