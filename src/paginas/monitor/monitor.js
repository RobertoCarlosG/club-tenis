import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  Container, Grid, List, ListItem, ListItemText,
  Card, CardHeader, CardActionArea, CardContent,
  CardMedia, Divider, Typography, Paper
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import img from '../../imagenes/Logo10.svg';
import { TorneoContext } from '../../contexto/ctx_torneo';
import { db, watchMatchesToday, watchSingleTorneo } from '../../servicios/firebase';

function cambiarFondo() {
  document.body.style = 'background: #F7F7F7;';
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  lista: {
    width: '100%',
    maxWidth: 360,
    minHeight: 550,
    backgroundColor: theme.palette.background.paper,
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    background: theme.palette.primary.main,
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 400,
    textAlign: 'center',
  },
  selected: {
    fontSize: 20,
    fontWeight: 500,
    color: '#039BE5',
    textAlign: 'center',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
  },
  instruccion: {
    fontSize: 14,
    padding: 'none',
    margin: 'none',
  },
  estado: {
    fontSize: 14,
    color: theme.palette.secondary.main,
    paddingTop: theme.spacing(1),
  },
  fecha: {
    background: '#fff',
  },
}));

// Obtener fecha actual.
const curday = function(sp) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //As January is 0.
  var yyyy = today.getFullYear();
  
  if(dd<10) dd='0'+dd;
  if(mm<10) mm='0'+mm;
  return (dd+sp+mm+sp+yyyy);
};

const getFecha = function(sp, date) {
  var dd = date.getDate();
  var mm = date.getMonth()+1; //As January is 0.
  var yyyy = date.getFullYear();
  
  if(dd<10) dd='0'+dd;
  if(mm<10) mm='0'+mm;
  return (dd+sp+mm+sp+yyyy);
};

function Monitor () {
  const classes = useStyles();
  const history = useHistory();
  cambiarFondo();

  const { torneos } = useContext(TorneoContext);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tournament, setTournament] = useState([]);
  const [idTorneo, setIdTorneo] = useState('');
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const handleDate = (date) => {
    setDate(date);
    setLoading(false);
    var fecha = getFecha('/', date);
    watchMatchesToday(idTorneo, fecha, (partidos) => {
      setPartidos(partidos);
      setLoading(true);
    });
  } 

  const handleListItemClick = (id, index) => {
    setLoading(false);
    var fecha = curday('/');

    watchMatchesToday(id, fecha, (partidos) => {
      setPartidos(partidos);
      setLoading(true);
    });

    watchSingleTorneo(id, (torneo) => {
      setMinDate(torneo.fecha_inicio.toDate());
      setMaxDate(torneo.fecha_fin.toDate());
      setDate(torneo.fecha_inicio.toDate());
    });

    setIdTorneo(id);
    setSelectedIndex(index);
  };

  const handleDetails = (id) => {
    console.log(id);

    const ruta = '/monitor/detalles/'+id;
    history.push(ruta);
  }

  useEffect(() => {
    var fecha = curday('/');
    
    const torneosRef = db.collection("torneos");

    torneosRef.onSnapshot((snapshot) => {
      const info = [];
      
      snapshot.forEach((information) => {
        const data = information.data();
            
        info.push({
            ...data,
            id: information.id,
        });
      });
      setTournament(info);
      setMinDate(info[0].fecha_inicio.toDate());
      setMaxDate(info[0].fecha_fin.toDate());

      if (info[0] != undefined) {
        watchMatchesToday(info[0].id, fecha, (partidos) => {
          setPartidos(partidos);
          setLoading(true);
        });
      }
    });
  }, []); 

  return(
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={6} sm={3}>
            <Card>
              <CardHeader
                className={classes.cardHeader}
                title="Torneos"
              >
              </CardHeader>
              <Divider />
              <List className={classes.lista} dense component="nav">
              { torneos.map( (torneo, index) => {
                  return (
                    <ListItem
                      button
                      key={ torneo.id }
                      className={ classes.listItem }
                      selected={selectedIndex === index}
                      onClick={() => handleListItemClick(torneo.id, index)}
                    >
                      <ListItemText 
                        primary={ torneo.nombre }
                        classes={{
                          primary: selectedIndex === index 
                                   ? classes.selected
                                   : classes.itemText,
                        }}
                      >
                        { torneo.nombre }
                      </ListItemText>
                    </ListItem>
                  );
                })
              }
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    inputVariant="outlined" variant="inline"
                    format="dd/MM/yyyy" margin="normal"
                    id="FechaInicio" label="Fecha de los partidos"
                    className={classes.fecha}
                    minDate={ minDate }
                    maxDate={ maxDate }
                    value={ date }
                    onChange={ handleDate }
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
            { loading ? (
              partidos.length ? (
                  partidos.map(partido => {
                    return(
                      <Grid item key={partido.id} xs={12} sm={6} md={4}>
                        <Card 
                          className={classes.card}
                          onClick={ () => handleDetails(partido.id) }
                        >
                          <CardActionArea> 
                            <CardMedia
                              className={ classes.cardMedia }
                              image={ img }
                              title="Image title"
                            />
                          
                            <CardContent className={ classes.cardContent} >
                              <center>
                                <Typography gutterBottom>
                                  { partido.fecha }
                                </Typography>
                                <Typography className={classes.title }>
                                  { partido.local }&nbsp;vs
                                </Typography>
                                <Typography className={classes.title }>
                                  { partido.visita }
                                </Typography>
                                <Typography className={classes.estado }>
                                  { partido.estado }
                                </Typography>
                              </center>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })
                ) : ( 
                  <Typography className={ classes.title }>
                  <br />
                    &nbsp;&nbsp;Este torneo no tiene partidos en la fecha seleccionada. :(
                  <br />
                  </Typography>
                )
              ) : (
                <div>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Skeleton variant="rect" width={210} height={118} />
                      <Skeleton variant="text" width={210} />
                      <Skeleton variant="text" width={210} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Skeleton variant="rect" width={210} height={118} />
                      <Skeleton variant="text" width={210} />
                      <Skeleton variant="text" width={210} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Skeleton variant="rect" width={210} height={118} />
                      <Skeleton variant="text" width={210} />
                      <Skeleton variant="text" width={210} />
                    </Grid>
                  </Grid>
                </div>
              )
            }
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Monitor;
