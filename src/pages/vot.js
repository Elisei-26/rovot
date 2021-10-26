import React, { useState } from 'react';
import { Paper, Grid } from '@material-ui/core';

function Vot() {
  const [vot, setVot] = useState(0);

  function trimiteVotul(n) {
    //alert(vot);
    setVot(1);
    console.log(vot);
    //alert(vot);
  }

  if (vot === 0) {
    return (
      <center>
        <h1></h1>
        <Grid container spacing={3} style={ { width: 1320 } }>
          <Grid item xs={4}>
            <Paper style={ { width: 400, height: 400 } } elevation={8}>
              <h1>Partid:</h1>
              <h1>Candidat:</h1>
              <button type="button" className="btn btn-info m-4" onClick={() => trimiteVotul(1)}>VOTEAZA</button>
              <h4>
                !!!Atentie!!!
              </h4>
              <h5>
                Apăsand butonul de deasupra butonului veti vota candidatul:
              </h5>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={ { width: 400, height: 400 } } elevation={8}>
              <h1>Partid:</h1>
              <h1>Candidat:</h1>
              <button type="button" className="btn btn-info m-4" onClick={() => trimiteVotul(2)}>VOTEAZA</button>
              <h4>
                !!!Atentie!!!
              </h4>
              <h5>
                Apăsand butonul de deasupra butonului veti vota candidatul:
              </h5>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={ { width: 400, height: 400 } } elevation={8}>
              <h1>Partid:</h1>
              <h1>Candidat:</h1>
              <button type="button" className="btn btn-info m-4" onClick={() => trimiteVotul(3)}>VOTEAZA</button>
              <h4>
                !!!Atentie!!!
              </h4>
              <h5>
                Apăsand butonul de deasupra butonului veti vota candidatul:
              </h5>
            </Paper>
          </Grid>
        </Grid>
        <button type="button" className="btn btn-outline-primary m-4"><a href="/home">Log out</a></button>
      </center>
    );
  } else {
    return (
      <center>
        <h1></h1>
        <h1>
          Votul a fost trimis!
        </h1>
        <button type="button" className="btn btn-outline-primary m-4"><a href="/home">Log out</a></button>
      </center>
    );
  }
}

export default Vot;