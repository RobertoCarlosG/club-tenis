import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { 
  Grid, Paper, Table, Typography,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import { db } from '../../../../servicios/firebase/index';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  title: {
    fontSize: 30,
    textTransform: 'none',
  },
  table: {
    minWidth: 600,
  },
  color: {
    color: '#FFF',
    backgroundColor: theme.palette.secondary.main,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Participantes = props => {
  const { idTorneo, ...rest } = props;
  const classes = useStyles();

  const [inscritos, setInscritos] = useState(false);
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const torneoRef = db.collection('torneos').doc(idTorneo);
    torneoRef.onSnapshot( snapshot => {
      setInscritos(snapshot.data().inscritos);
    });

    const jugadoresRef = db.collection('jugadores').where("torneo", "==", idTorneo);
    jugadoresRef.onSnapshot( snapshot => {
      var datos = [];
      snapshot.forEach(doc => {
        const {
          nombre, apellido, edad,
          federacion, nacionalidad,
          ranking, puntos,
        } = doc.data();
        datos.push({
          id: doc.id,
          nombre, apellido, edad,
          federacion, nacionalidad,
          ranking, puntos,
        });
      });
      console.log(datos);
      setJugadores(datos);
    });

  }, []);

  if (!inscritos) {
    return (
      <div className={ classes.root }>
        <Grid container spacing={2} alignItems="center">
          <br />
          <Grid item xs={12}>
            <Typography className={classes.title}>
              No se han inscrito los participantes.
            </Typography>
          </Grid>
          <br />
        </Grid>
      </div>
    );
  }

  return (
    <div className={ classes.root }>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Participante
                  </StyledTableCell>
                  <StyledTableCell align="left">Edad</StyledTableCell>
                  <StyledTableCell align="left">Nacionalidad</StyledTableCell>
                  <StyledTableCell align="left">Federación</StyledTableCell>
                  <StyledTableCell align="left">Puntos</StyledTableCell>
                  <StyledTableCell align="left">Ranking</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jugadores.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row" align="left">
                      <div className={classes.nameContainer}>
                        <Avatar  className={classes.color}>
                          {row.nombre[0]}
                        </Avatar>&nbsp;&nbsp;&nbsp;
                        <Typography variant="body1">
                          {row.nombre}&nbsp;{row.apellido}
                        </Typography>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.edad}</StyledTableCell>
                    <StyledTableCell align="left">{row.nacionalidad}</StyledTableCell>
                    <StyledTableCell align="left">{row.federacion}</StyledTableCell>
                    <StyledTableCell align="left">{row.puntos}</StyledTableCell>
                    <StyledTableCell align="left">{row.ranking}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Participantes;