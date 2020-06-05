import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Paper,
  Typography, Button, Snackbar, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import ResultadosPartido from './resultadosPartido';
import Abandono from './abandono';

import {
  useParams, useHistory
} from 'react-router-dom';
import { db } from '../../../servicios/firebase/index';

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
    background: theme.palette.primary.main,
  },
  card_title: {
    color: theme.palette.common.white,
    fontSize: 30,
    fontWeight: 600,
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
    alignItems: 'center',
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
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [local, setLocal] = useState('');
	const [visita, setVisita] = useState('');
	const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [ganador, setGanador] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ronda, setRonda] = useState('');
  const [lugar, setLugar] = useState('');
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
        console.log(snapshot.data());
        setLocal(snapshot.data().local);
        setVisita(snapshot.data().visita);
        setFecha(snapshot.data().fecha);
        setHora(snapshot.data().hora);
        setGanador(snapshot.data().ganador);
        setDuracion(snapshot.data().duracion);
        setRonda(snapshot.data().ronda);
        setLugar(snapshot.data().lugar);
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
  
  const handleRegistrarResultados = () => {
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
      <IconButton 
          aria-label="volver" 
          size="medium"
          onClick={ handleBack }
        >
        <ArrowBackIcon className={classes.icon} />
      </IconButton>
      <Grid container spacing={2} alignItems="center">
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
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.card_title} align="center">
                { local }&nbsp;vs&nbsp;{ visita }
              </Typography>
            </CardContent>
          </Card>
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
                    { "Duración: "+duracion }
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
                  <EmojiEventsIcon className={classes.Icon} />
                  <Typography className={classes.title} align="center">
                    { "Ganador: "+ganador }
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jugadores
                  </StyledTableCell>
                  <StyledTableCell align="left">Set 1</StyledTableCell>
                  <StyledTableCell align="left">Set 2</StyledTableCell>
                  <StyledTableCell align="left">Set 3</StyledTableCell>
                  { sets == 5 && 
                    <StyledTableCell align="left">Set 4</StyledTableCell>
                  }
                  { sets == 5 &&
                    <StyledTableCell align="left">Set 5</StyledTableCell>
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key={ idPartido }>
                  <StyledTableCell component="th" scope="row" align="center">
                    <div className={classes.nameContainer}>
                      <Avatar  className={classes.color}>
                      </Avatar>&nbsp;&nbsp;&nbsp;
                      <Typography className={classes.title} >
                        { local }
                      </Typography>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">{set1.length ? set1[0] : 0}</StyledTableCell>
                  <StyledTableCell align="left">{set2.length ? set2[0] : 0}</StyledTableCell>
                  <StyledTableCell align="left">{set3.length ? set3[0] : 0}</StyledTableCell>
                  { sets == 5 && 
                    <StyledTableCell align="left">{set4.length ? set4[0] : 0}</StyledTableCell>
                  }
                  { sets == 5 && 
                    <StyledTableCell align="left">{set5.length ? set5[0] : 0}</StyledTableCell>
                  }
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">
                    <div className={classes.nameContainer}>
                      <Avatar  className={classes.color_2}>
                      </Avatar>&nbsp;&nbsp;&nbsp;
                      <Typography className={classes.title} >
                        { visita }
                      </Typography>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">{set1.length ? set1[1] : 0}</StyledTableCell>
                  <StyledTableCell align="left">{set2.length ? set2[1] : 0}</StyledTableCell>
                  <StyledTableCell align="left">{set3.length ? set3[1] : 0}</StyledTableCell>
                  { sets == 5 && 
                    <StyledTableCell align="left">{set4.length ? set4[1] : 0}</StyledTableCell>
                  }
                  { sets == 5 && 
                    <StyledTableCell align="left">{set5.length ? set5[1] : 0}</StyledTableCell>
                  }
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      { open &&
        <ResultadosPartido 
          onClose={()=> setOpen(false)}
          idPartido={ idPartido }
        />
      }
      {
        isOpen &&
        <Abandono
          onClose={() => setIsOpen(false)}
          idPartido={ idPartido }
        />
      }
    </div>
  );
};

DetallesPartido.propTypes = {
  className: PropTypes.string
};

export default DetallesPartido;