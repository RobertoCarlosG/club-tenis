import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { 
  Grid, Paper, Button, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton,
  Typography
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import { db, realizarSorteo } from '../../../../servicios/firebase/index';
import EditarPartido from './editarPartido';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  btnSorteo: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
		'&:hover': {
			backgroundColor: '#3A4750',
		}
  },
  title: {
    fontSize: 30,
    textTransform: 'none',
  },
  title_2: {
    color: theme.palette.common.black,
    fontSize: 24,
    textTransform: 'none',
  },
  titleAccept: {
    color: '#4CAF50',
    textTransform: 'none',
    fontSize: 24,
    fontWeight: 500,
  },
  titleDialog: {
    color: '#364756',
    textTransform: 'none',
    fontSize: 24,
    fontWeight: 500,
  },
  table: {
    minWidth: 600,
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

const PartidosTorneo = props => {
  const { className, idTorneo, ...rest } = props;
  const classes = useStyles();

  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [sorteo, setSorteo] = useState(false);
  const [inscritos, setInscritos] = useState(false);
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const torneoRef = db.collection('torneos').doc(idTorneo);
    torneoRef.onSnapshot( snapshot => {
      setSorteo(snapshot.data().sorteo);
      setInscritos(snapshot.data().inscritos);
    });

    const partidosRef = db.collection('partidos').where("torneo", "==", idTorneo);
    partidosRef.onSnapshot( snapshot => {
      var datos = [];
      snapshot.forEach(doc => {
        const {
          nombre, local, visita,
          torneo, fecha, hora,
          ganador, puntos_local,
          puntos_visita, ronda
        } = doc.data();
        datos.push({
          id: doc.id,
          nombre, local, visita,
          torneo, fecha, hora,
          ganador, puntos_local,
          puntos_visita, ronda
        });
      });
      console.log(datos);
      setPartidos(datos);
    });

  }, []);

  const handleSorteo = () => {
    setOpenDialog(true);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleOk = () => {
    realizarSorteo(idTorneo);
    setOpenDialog(false);
  };

  const handleEdit = (id) => {
    console.log(id);
    setId(id);
    setOpen(true);
  };

  if(!inscritos) {
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

  if (!sorteo) {
    return (
      <div className={ classes.root }>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              type="submit"
              className={classes.btnSorteo}
              variant="contained"
              color="primary"
              onClick={ handleSorteo }
            >
              Realizar Sorteo
            </Button>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Typography className={classes.title}>
              No se ha realizado el sorteo.
            </Typography>
          </Grid>
          <br />
        </Grid>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          aria-labelledby="confirmation-dialog-title"
          open={openDialog}
        >
          <DialogTitle>
            <Typography className={classes.title_2} align="center">
              Realizar sorteo
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <br />
            <Typography className={classes.title_2} align="justify">
              ¿Está seguro de que desea realizar el sorteo?
            </Typography>
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOk} color="primary">
              <Typography className={classes.titleAccept} align="center">
                Aceptar
              </Typography>
            </Button>
            <Button autoFocus onClick={handleCancel} color="primary">
              <Typography className={classes.titleDialog} align="center">
                Cancelar
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div className={ classes.root }>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Jugador 1</StyledTableCell>
                  <StyledTableCell align="left">Jugador 2</StyledTableCell>
                  <StyledTableCell align="left">Fecha</StyledTableCell>
                  <StyledTableCell align="left">Hora</StyledTableCell>
                  <StyledTableCell align="left">Ronda</StyledTableCell>
                  <StyledTableCell align="left">Editar</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {partidos.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row" align="left">
                      {row.local}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.visita}</StyledTableCell>
                    <StyledTableCell align="left">
                      { (row.fecha
                        ? row.fecha
                        : 'No asignada'
                      ) }
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      { (row.hora
                        ? row.hora
                        : 'No asiganada'
                      ) }
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.ronda}</StyledTableCell>
                    <StyledTableCell align="left">
                      <IconButton 
                        onClick={ () => handleEdit(row.id) }
                      >
                        <EventIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {open &&
        <EditarPartido 
          onClose={()=> setOpen(false)}
          id={ id }
        />
      }

    </div>
  );
};

export default PartidosTorneo;