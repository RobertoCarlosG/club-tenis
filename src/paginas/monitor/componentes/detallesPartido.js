import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Flag from 'react-world-flags';
import { Card, CardContent, Grid, Paper,
  Typography, Button, Snackbar, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, CardMedia
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MuiAlert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ResultadosPartido from './resultadosPartido';
import Abandono from './abandono';

import {
  useParams, useHistory
} from 'react-router-dom';
import { db } from '../../../servicios/firebase/index';
import img from '../../../imagenes/Copa.svg';
import image from '../../../imagenes/transparente.svg';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  btnRegistrar: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
		'&:hover': {
			backgroundColor: '#3A4750',
		}
  },
  btnAbandono: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
  },
  card: {
    background: 'linear-gradient(180deg, rgba(3, 155, 229, 0.15) 0%, rgba(255, 255, 255, 0) 100%), #192D3E',
    margin: 'auto',
    borderRadius: theme.spacing(1), // 16px
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100,
  },
  media: {
    height: 100,
    width: 100,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
  },
  cardContent: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card_title: {
    color: theme.palette.common.white,
    fontSize: 32,
    fontWeight: 600,
    margin: 'auto',
  },
  content: {
    height: 44,
    paddingTop: theme.spacing(1),
    alignItems: 'center',
    display: 'flex',
    "&:last-child": {
      paddingBottom: 6
    },
  },
  title: {
    color: theme.palette.common.black,
    fontSize: 20,
    textTransform: 'none',
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    margin: 'auto',
    alignItems: 'center',
  },
  Icon: {
    color: theme.palette.icon,
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  icon: {
    color: theme.palette.text.primary
  },
  color: {
    color: '#FFF',
    backgroundColor: theme.palette.secondary.main,
  },
  color_2: {
    color: '#FFF',
    backgroundColor: '#F44336',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const DetallesPartido = props => {
  const { idPartido } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [idTorneo, setIdTorneo] = useState('');
  const [estado, setEstado] = useState('');
  const [local, setLocal] = useState('');
	const [visita, setVisita] = useState('');
	const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [ganador, setGanador] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ronda, setRonda] = useState('');
  const [lugar, setLugar] = useState('');
  const [bandera1, setBandera1] = useState('');
  const [bandera2, setBandera2] = useState('');
  const [puntosLocal, setPuntosLocal] = useState(0);
  const [puntosVisita, setPuntosVisita] = useState(0);
  const [sets, setSets] = useState(0);
  const [set1, setSet1] = useState([]);
  const [set2, setSet2] = useState([]);
  const [set3, setSet3] = useState([]);
  const [set4, setSet4] = useState([]);
  const [set5, setSet5] = useState([]);
  
  useEffect(() => {
    try {
      const partidoRef = db.collection('partidos').doc(idPartido);

      partidoRef.onSnapshot( snapshot => {
        setIdTorneo(snapshot.data().id_torneo);
        setEstado(snapshot.data().estado);
        setLocal(snapshot.data().local);
        setVisita(snapshot.data().visita);
        setFecha(snapshot.data().fecha);
        setHora(snapshot.data().hora);
        setGanador(snapshot.data().ganador);
        setDuracion(snapshot.data().duracion);
        setRonda(snapshot.data().nombre_ronda);
        setLugar(snapshot.data().lugar);
        setBandera1(snapshot.data().bandera1);
        setBandera2(snapshot.data().bandera2);
        setPuntosLocal(snapshot.data().puntos_local);
        setPuntosVisita(snapshot.data().puntos_visita);
        setSets(snapshot.data().setsMax);
        setSet1(snapshot.data().set1);
        setSet2(snapshot.data().set2);
        setSet3(snapshot.data().set3);
        if (snapshot.data().setsMax == 5) {
          setSet4(snapshot.data().set4);
          setSet5(snapshot.data().set5);
        }
      });

    } catch (err) {
      console.log(err);
    }

  }, []);

  const closeAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleRegistrarResultados = () => {
    console.log("torneo", idTorneo);
    setOpen(true);
  };

  const handleAbandono = () => {
    setIsOpen(true);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={ classes.root }>
      <Grid container spacing={2} direction="row" justify="center" alignItems="center">
        <Grid item xs={2} justify="center">
          <IconButton 
            aria-label="volver" 
            size="medium"
            onClick={ handleBack }
          >
            <ArrowBackIcon className={classes.icon} />
          </IconButton>
        </Grid>
        <Grid item xs={8} justify="center">
          <Typography className={classes.title}>
            <b>{ local }</b>&nbsp;vs&nbsp;<b>{ visita }</b>
          </Typography>
        </Grid>
        <Grid item xs={2} justify="center">
          <Typography>
            {" "}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
      { estado !== "Terminado" &&
        <Grid item xs={6} sm={3}>
          <Button
            fullWidth
            type="submit"
            className={ classes.btnRegistrar }
            variant="contained"
            color="primary"
            onClick={ handleRegistrarResultados }
          >
            Registrar resultados
          </Button>
        </Grid>
      }
      { estado !== "Terminado" &&
        <Grid item xs={6} sm={3} >
          <Button
            fullWidth
            type="submit"
            className={classes.btnAbandono}
            variant="contained"
            color="secondary"
            onClick={ handleAbandono }
          >
            Abandono de jugador
          </Button>
        </Grid>
      }
      { ganador !== "" &&
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia 
              className={classes.media}
              image={ img }
            />
            <CardContent className={classes.cardContent}>
              <Typography className={classes.card_title} align="center">
                { "Ganador: "}&nbsp;{ ganador }
              </Typography>
            </CardContent>
            <CardMedia 
              className={classes.media}
              image={ image }
            />
          </Card>
        </Grid>
      }
        <Grid item xs={12}>
            <Typography>{""}</Typography>
          </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" alignItems="center" justifyContent="center">
            <Card>
              <CardContent className={classes.content}>
              <div className={classes.cardContainer} >
                <AccountTreeIcon className={classes.Icon} />&nbsp;
                <Typography className={classes.title} align="center">
                  { ronda }
                </Typography>
              </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card>
              <CardContent className={classes.content}>
                <div className={classes.cardContainer} >
                  <CalendarTodayIcon className={classes.Icon} />
                  <Typography className={classes.title} align="center">
                    { fecha }
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card className={classes.borde}>
              <CardContent className={classes.content}>
                <div className={classes.cardContainer} >
                  <PlaceIcon className={classes.Icon} />
                  <Typography className={classes.title} align="center">
                    { lugar }
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card>
              <CardContent className={classes.content}>
                <div className={classes.cardContainer} >
                  <AccessTimeIcon className={classes.Icon} />
                  <Typography className={classes.title} align="center">
                    { "Inicio: "+hora }
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card>
              <CardContent className={classes.content}>
                <div className={classes.cardContainer} >
                  <AccessTimeIcon className={classes.Icon} />
                  <Typography className={classes.title} align="center">
                    { "Duración: "}
                    { duracion !== "" ? duracion : "Por definirse"}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card>
              <CardContent className={classes.content}>
                <div className={classes.cardContainer} >
                  <EventAvailableIcon className={classes.Icon} />
                  <Typography className={classes.title} align="center">
                    { estado }
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Jugadores
                  </StyledTableCell>
                  <StyledTableCell align="center">Set 1</StyledTableCell>
                  <StyledTableCell align="center">Set 2</StyledTableCell>
                  <StyledTableCell align="center">Set 3</StyledTableCell>
                  { sets == 5 && 
                    <StyledTableCell align="center">Set 4</StyledTableCell>
                  }
                  { sets == 5 &&
                    <StyledTableCell align="center">Set 5</StyledTableCell>
                  }
                  <StyledTableCell align="center">Puntuación</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key={ idPartido }>
                  <StyledTableCell component="th" scope="row" align="center">
                    <div className={classes.nameContainer}>
                      &nbsp;&nbsp;&nbsp;
                      { bandera1 !== "" &&
                        <Flag code={ bandera1 } height="16"/>
                      }
                      &nbsp;&nbsp;&nbsp;
                      <Typography className={classes.title} >
                        { local }
                      </Typography>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{set1.length ? set1[0] : 0}</StyledTableCell>
                  <StyledTableCell align="center">{set2.length ? set2[0] : 0}</StyledTableCell>
                  <StyledTableCell align="center">{set3.length ? set3[0] : 0}</StyledTableCell>
                  { sets == 5 && 
                    <StyledTableCell align="center">{set4.length ? set4[0] : 0}</StyledTableCell>
                  }
                  { sets == 5 && 
                    <StyledTableCell align="center">{set5.length ? set5[0] : 0}</StyledTableCell>
                  }
                  <StyledTableCell align="center">{ puntosLocal }</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">
                    <div className={classes.nameContainer}>
                      &nbsp;&nbsp;&nbsp;
                      { bandera2 !== "" &&
                        <Flag code={ bandera2 } height="16"/>
                      }
                      &nbsp;&nbsp;&nbsp;
                      <Typography className={classes.title} >
                        { visita }
                      </Typography>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{set1.length ? set1[1] : 0}</StyledTableCell>
                  <StyledTableCell align="center">{set2.length ? set2[1] : 0}</StyledTableCell>
                  <StyledTableCell align="center">{set3.length ? set3[1] : 0}</StyledTableCell>
                  { sets == 5 && 
                    <StyledTableCell align="center">{set4.length ? set4[1] : 0}</StyledTableCell>
                  }
                  { sets == 5 && 
                    <StyledTableCell align="center">{set5.length ? set5[1] : 0}</StyledTableCell>
                  }
                  <StyledTableCell align="center">{ puntosVisita }</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      { open &&
        <ResultadosPartido 
          onClose={() => setOpen(false)}
          onOpen={() => setOpenAlert(true)}
          idPartido={ idPartido }
          idTorneo={ idTorneo }
        />
      }
      {
        isOpen &&
        <Abandono
          onClose={() => setIsOpen(false)}
          onOpen={() => setOpenAlert(true)}
          idPartido={ idPartido }
          idTorneo={ idTorneo }
        />
      }
      <Snackbar 
        open={ openAlert }
        autoHideDuration={ 6000 } 
        onClose={ closeAlert }
        anchorOrigin={ {vertical: 'top', horizontal: 'center'} }
      >
        <Alert onClose={ closeAlert } severity="success">
          Resultados registrados.
        </Alert>
      </Snackbar>
    </div>
  );
};

DetallesPartido.propTypes = {
  className: PropTypes.string
};

export default DetallesPartido;