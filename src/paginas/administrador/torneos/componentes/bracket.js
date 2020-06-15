import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';

import { db } from '../../../../servicios/firebase';

function cambiarFondo() {
  document.body.style = 'background: #F7F7F7;';
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  team_1: {
    display: 'flex',
    padding: theme.spacing(2),
    minWidth: 288,
    borderRadius: 12,
    border: '1px solid #C4C4C4',
    borderLeft: '3px solid #039BE5',
    boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
    '& > *:nth-child(1)': {
      marginRight: theme.spacing(2),
    },
    '& > *:nth-child(2)': {
      flex: 'auto',
    },
  },
  team_2: {
    display: 'flex',
    padding: theme.spacing(2),
    minWidth: 288,
    borderRadius: 12,
    border: '1px solid #C4C4C4',
    borderLeft: '3px solid #F44336',
    boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
    '& > *:nth-child(1)': {
      marginRight: theme.spacing(2),
    },
    '& > *:nth-child(2)': {
      flex: 'auto',
    },
  },
  ganador: {
    display: 'flex',
    padding: theme.spacing(2),
    minWidth: 288,
    borderRadius: 12,
    border: '1px solid #C4C4C4',
    borderLeft: '3px solid #039BE5',
    borderRight: '3px solid #039BE5',
    boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
    '& > *:nth-child(1)': {
      marginRight: theme.spacing(2),
    },
    '& > *:nth-child(2)': {
      flex: 'auto',
    },
  },
  perdedor: {
    display: 'flex',
    padding: theme.spacing(2),
    minWidth: 288,
    borderRadius: 12,
    border: '1px solid #C4C4C4',
    borderLeft: '3px solid #F44336',
    borderRight: '3px solid #F44336',
    background: '#F5F5F5',
    boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
    '& > *:nth-child(1)': {
      marginRight: theme.spacing(2),
    },
    '& > *:nth-child(2)': {
      flex: 'auto',
    },
  },
  btn: {
    margin: theme.spacing(1, 1, 1),
    background: theme.palette.primary.main,
    color: '#FFF',
		textTransform: 'none',
    borderRadius: '0px',
    border: '1px solid #FFF',
    fontSize: 18,
		'&:hover': {
			backgroundColor: '#3A4750',
		}
  },
  title: {
    color: theme.palette.common.black,
    fontSize: 18,
    textAlign: 'center',
  },
  header: {
    color: theme.palette.common.black,
    fontSize: 16,
    textAlign: 'center',
  },
}));

const rounds = ['Ronda 1', 'Ronda 2', 'Ronda 3'];

const games = [];

const BracketView = () => {
  const classes = useStyles();
  cambiarFondo();

  const [rondas, setRondas] = useState([]);
  const [numRondas, setNumRondas] = useState(0);
  const [idTorneo, setIdTorneo] = useState("GrandSlam");

  useEffect(() => {
    const torneoRef = db.collection('torneos').doc(idTorneo);
    torneoRef.onSnapshot( snapshot => {
      console.log(snapshot.data());
      setNumRondas(snapshot.data().numRondas);
    });

    const partidosRef = db.collection('partidos').where("id_torneo", "==", idTorneo);
    partidosRef.onSnapshot((snapshot) => {
      const info = [];
      
      snapshot.forEach((information) => {
        const data = information.data();
            
        info.push({
            ...data,
            id: information.id,
        });
      });

      setRondas(info);
    });
  }, []);

  return (
    <div className={ classes.root }>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        { rondas.map((ronda) => {
            return (
              <Grid item xs={12} sm={12/numRondas}>
                <Button variant="contained" className={ classes.btn } fullWidth>
                  { ronda.nombre }
                </Button>
              </Grid>
            );
          })
        }
      </Grid>
      <br />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
      { rondas.map(ronda => {
        return (
          <Grid item={12} sm={12/numRondas} id={ronda.id}>
            { ronda.partidos.map(partido => {
              return (
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <div onMouseDown={e => alert(ronda.id+' '+partido.numero) }>
                    <Grid item>
                      <Typography className={classes.header} gutterBottom>
                        {partido.estado}
                      </Typography>
                      <Paper className={classes.team_1}>
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                        >
                          <Typography className={classes.title}>
                            {partido.local}
                          </Typography>
                          <Typography className={classes.title}>
                            {partido.puntos_local}
                          </Typography>
                        </Grid>
                      </Paper>
                      <Paper className={classes.team_2}>
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                        >
                          <Typography className={classes.title}>
                            {partido.visita}
                          </Typography>
                          <Typography className={classes.title}>
                            {partido.puntos_visita}
                          </Typography>
                        </Grid>
                      </Paper>
                    </Grid>
                  </div>
                  <br /><br />
                </Grid>
              );})
            }
          </Grid>
          ); 
        })
      }
      </Grid>
    </div>
  );
}

export default BracketView;