import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { 
  Grid, Paper, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton,
  Typography, Dialog, DialogTitle, DialogActions, 
  DialogContent
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

import Flag from 'react-world-flags';
import { db, realizarSorteoSimple } from '../../../../servicios/firebase/index';
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
  dialogTitle: {
    textTransform: 'none',
    fontSize: 30,
    fontWeight: 500,
    textAlign: 'center'
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
  text: {
    textTransform: 'none',
    fontSize: 18,
    textAlign: 'center'
  },
  ok: {
    background: theme.palette.secondary.dark,
    borderRadius: '4px',
    color: '#FFF',
    textTransform: 'none',
    fontSize: 18,
    '&:hover': {
			backgroundColor: theme.palette.secondary.light,
		}
  },
  cancel: {
    color: '#646464',
    borderRadius: '4px',
    border: '1px solid #AFAFAF',
    textTransform: 'none',
    fontSize: 18,
    '&:hover': {
			backgroundColor: '#C4C4C4',
		}
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

const PartidosTorneo = props => {
  const { className, idTorneo, ...rest } = props;
  const classes = useStyles();

  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [sorteo, setSorteo] = useState(false);
  const [inscritos, setInscritos] = useState(false);
  const [partidos, setPartidos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [local, setLocal] = useState('');
  const [visita, setVisita] = useState('');

  useEffect(() => {
    const torneoRef = db.collection('torneos').doc(idTorneo);
    torneoRef.onSnapshot( snapshot => {
      setSorteo(snapshot.data().sorteo);
      setInscritos(snapshot.data().inscritos);
      setFechaInicio(snapshot.data().fecha_inicio.toDate());
      setFechaFin(snapshot.data().fecha_fin.toDate());
    });

    const partidosRef = db.collection('partidos')
      .where("id_torneo", "==", idTorneo)
      .orderBy("ronda");
    partidosRef.onSnapshot((snapshot) => {
      const info = [];
      
      snapshot.forEach((information) => {
        const data = information.data();
            
        info.push({
            ...data,
            id: information.id,
        });
      });

      setPartidos(info);
    });
  }, []);

  const handleSorteo = () => {
    setOpenDialog(true);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleOk = () => {
    realizarSorteoSimple(idTorneo);
    setOpenDialog(false);
    props.onSorteo();
  };

  const handleEdit = (id, local, visita) => {
    setId(id);
    setLocal(local);
    setVisita(visita);
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
          disableBackdropClick disableEscapeKeyDown
          maxWidth="xs" aria-labelledby="confirmation-dialog-title"
          open={ openDialog }
        >
          <DialogTitle id="confirmation-dialog-title">
            <Typography className={classes.dialogTitle}>
              Confirmación
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Typography className={classes.text} justify="center">
              ¿Está seguro de que desea realizar el sorteo?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOk} className={classes.ok}>
              &nbsp;Aceptar&nbsp;
            </Button>
            <Button autoFocus onClick={handleCancel} className={classes.cancel}>
              Cancelar
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
              { partidos.map(row => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row" align="left">
                        <div className={classes.nameContainer}>
                          { row.bandera1 !== "" &&
                            <Flag code={ row.bandera1 } height="16"/>
                          }
                          <Typography variant="body1">
                            &nbsp;&nbsp;{row.local}
                          </Typography>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.nameContainer}>
                          { row.bandera1 !== "" &&
                            <Flag code={ row.bandera2 } height="16"/>
                          }
                          <Typography variant="body1">
                            &nbsp;&nbsp;{row.visita}
                          </Typography>
                        </div>
                      </StyledTableCell>
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
                      <StyledTableCell align="left">{row.nombre_ronda}</StyledTableCell>
                      <StyledTableCell align="left">
                        <IconButton 
                          onClick={ () => handleEdit(row.id, row.local, row.visita) }
                        >
                          <EventIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {open &&
        <EditarPartido 
          onClose={()=> setOpen(false)}
          onOpen={ () => props.onPartido() }
          id={ id }
          fechaInicio={ fechaInicio }
          fechaFin={ fechaFin }
          local={ local }
          visita={ visita }
        />
      }

    </div>
  );
};

export default PartidosTorneo;