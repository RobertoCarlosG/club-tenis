import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import Topbar from '../componentes/topBar';
import Sidebar from '../componentes/sideBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import ImageIcon from '@material-ui/icons/Image';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import img from '../../../imagenes/Logo5.svg';
import { IconButton } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import Avatar from '@material-ui/core/Avatar';
import ModificarTorneo from './modificar_torneo';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  },
  tabs: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(8),
  },
  btn: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
		'&:hover': {
			backgroundColor: '#3A4750',
		}
  },
  btn_2: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
  },
  card_1: {
    background: theme.palette.primary.main,
  },
  card_title: {
    color: theme.palette.common.white,
    fontSize: 48,
    fontWeight: 600,
  },
  media: {
    maxWidth: '100%',
    height: 175,
    objectFit: 'contain',
  },
  content: {
    height: 175,
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
  },
  content_2: {
    height: 45,
    paddingTop: theme.spacing(1),
    "&:last-child": {
      paddingBottom: 0
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  title: {
    color: theme.palette.common.black,
    fontSize: 24,
  },
  title_2: {
    color: '#4CAF50',
    fontSize: 74,
    fontWeight: 500,
  },
  title_3: {
    color: '#F44336',
    fontSize: 74,
    fontWeight: 500,
  },
  borde: {
    border: 1,
    borderColor: '#000',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} border={1} borderColor="#979797" borderRadius="0px 0px 5px 5px" bgcolor="#FFF">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function createData(jugador1, jugador2, estado, fecha, hora) {
  return { jugador1, jugador2, estado, fecha, hora };
}

function createD(nombre, edad, federacion, puntos, rank, av) {
  return { nombre, edad, federacion, puntos, rank, av };
}

const rows = [
  createData('Roger Federer', 'Rafael Nadal', 'Sin iniciar', '06/15/2020', '12:00'),
  createData('Pete Sampras', 'Novak Djokovic', 'Sin iniciar', '06/15/2020', '12:00'),
  createData('Rod Laver', 'Bjorn Borg', 'Sin iniciar', '06/15/2020', '12:00'),
  createData('Ivan Lendl', 'Jimmy Connors', 'Sin iniciar', '06/15/2020', '12:00'),
];

const jug = [
  createD('Roger Federer', '34 años', 'ATP', '6630', '1', 'RF'),
  createD('Rafael Nadal', '35 años', 'ATP', '6600', '2', 'RN'),
  createD('Novak Djokovic', '32 años', 'ATP', '6500', '3', 'ND'),
  createD('Pete Sampras', '29 años', 'ATP', '6400', '4', 'PS'),
  createD('Rod Laver', '27 años', 'ATP', '6350', '5', 'RL'),
  createD('Bjorn Borg', '28 años', 'ATP', '6210', '6', 'BB'),
  createD('Ivan Lendl', '29 años', 'ATP', '6000', '7', 'IL'),
  createD('Jimmy Connors', '25 años', 'ATP', '5987', '8', 'JC'),
];

const Detalles = props => {
  const { children } = props;
  const [Xstate, setXstate] = React.useState(null);

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const handleModificarTorneo = () => {
    setXstate(1);
  };

  const editIcon = (
    <IconButton onClick={ console.log("Edit") }>
      <EventIcon />
    </IconButton>
  );

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar 
        onSidebarOpen={handleSidebarOpen} 
        tipoUsuario="Administrador"
        nombre="Felipe Juan Froilán"
      />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <br />
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} sm={10} justify="center">
          <Paper square elevation={3}>
            <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="primary"
              onChange={handleChange}
              aria-label="tabs"
            >
              <Tab label="Detalles"/>
              <Tab label="Partidos" />
              <Tab label="Participantes" />
            </Tabs>
          </Paper>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Button
                      fullWidth
                      type="submit"
                      className={classes.btn}
                      variant="contained"
                      color="primary"
                      onClick={ handleModificarTorneo }
                    >
                      Mofificar torneo
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={3} >
                    <Button
                      fullWidth
                      type="submit"
                      className={classes.btn_2}
                      variant="contained"
                      color="secondary"
                      onClick={ handleModificarTorneo }
                    >
                      Finalizar torneo
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Card className={classes.card_1}>
                      <CardContent>
                        <Typography className={classes.card_title} noWrap align="center">
                          Grand Slam
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card className={classes.card_1}>
                      <CardContent className={classes.content}>
                          <CardMedia
                            className={classes.media}
                            image={ img }
                            title="Cambiar imagen"
                          />
                          <Fab aria-label="Cambiar" className={classes.fab} color="secondary">
                            <ImageIcon />
                          </Fab>
                        </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card className={classes.borde}>
                      <CardContent className={classes.content}>
                        <Typography className={classes.title} align="center">
                          Fecha inicial
                        </Typography>
                        <Typography className={classes.title_2} align="center">
                          10
                        </Typography>
                        <Typography className={classes.title} align="center">
                          Junio - 2020
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card className={classes.borde}>
                      <CardContent className={classes.content}>
                        <Typography className={classes.title} align="center">
                          Fecha Final
                        </Typography>
                        <Typography className={classes.title_3} align="center">
                          10
                        </Typography>
                        <Typography className={classes.title} align="center">
                          Junio - 2020
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card className={classes.borde}>
                      <CardContent className={classes.content_2}>
                        <Typography className={classes.title} align="center">
                          Varonil - Simple
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card className={classes.borde}>
                      <CardContent className={classes.content_2}>
                        <Typography className={classes.title} align="center">
                          16 Participantes
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card className={classes.borde}>
                      <CardContent className={classes.content_2}>
                        <Typography className={classes.title} align="center">
                          Activo
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Button
                      fullWidth
                      type="submit"
                      className={classes.btn}
                      variant="contained"
                      color="primary"
                      onClick={ handleModificarTorneo }
                    >
                      Realizar Sorteo
                    </Button>
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Jugador 1</TableCell>
                            <TableCell align="left">Jugador 2</TableCell>
                            <TableCell align="left">Estado</TableCell>
                            <TableCell align="left">Fecha</TableCell>
                            <TableCell align="left">Hora</TableCell>
                            <TableCell align="left">Editar</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.jugador1}>
                              <TableCell component="th" scope="row" align="left">
                                {row.jugador1}
                              </TableCell>
                              <TableCell align="left">{row.jugador2}</TableCell>
                              <TableCell align="left">{row.estado}</TableCell>
                              <TableCell align="left">{row.fecha}</TableCell>
                              <TableCell align="left">{row.hora}</TableCell>
                              <TableCell align="left">{editIcon}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Container>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography className={classes.title} align="center">
                      Participantes: 16
                    </Typography>
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">&nbsp;&nbsp;&nbsp;Nombre</TableCell>
                            <TableCell align="left">Edad</TableCell>
                            <TableCell align="left">Federación</TableCell>
                            <TableCell align="left">Puntos</TableCell>
                            <TableCell align="left">Rank</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {jug.map((jug) => (
                            <TableRow key={jug.nombre}>
                              <TableCell component="th" scope="row" align="center">
                                <div className={classes.nameContainer}>
                                  &nbsp;&nbsp;&nbsp;
                                  <Avatar>{jug.av}</Avatar> &nbsp;&nbsp;&nbsp;
                                  <Typography variant="body1">{jug.nombre}</Typography>
                                </div>
                              </TableCell>
                              <TableCell align="left">{jug.edad}</TableCell>
                              <TableCell align="left">{jug.federacion}</TableCell>
                              <TableCell align="left">{jug.puntos}</TableCell>
                              <TableCell align="left">{jug.rank}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Container>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
      {Xstate &&
        <ModificarTorneo 
          onClose={()=> setXstate(null)}

        />
      }
    </div>
  );
};

Detalles.propTypes = {
  children: PropTypes.node
};

export default Detalles;