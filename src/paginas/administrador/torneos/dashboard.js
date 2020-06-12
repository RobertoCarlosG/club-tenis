import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, Input } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom';

import img from '../../../imagenes/Logo5.svg';
import { TorneoContext } from '../../../contexto/ctx_torneo';

//CARTAS
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

//CREAR TORNEO
import CreaTorneo from './CreaTorneo';

//BASE DE DATOS
import { db } from '../../../servicios/firebase/index';

function cambiarFondo() {
  document.body.style = 'background: #F7F7F7;';
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
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
  btn_agregar:{
    padding: theme.spacing(1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
  },
  paper: {
    borderRadius: '5px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    borderColor: '#192D3E'
  },
  pIcon: {
    color: theme.palette.icon,
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
  title: {
    fontSize: 24,
  },
}));


const Administrador = () => {
  const classes = useStyles();
  const history = useHistory();
  cambiarFondo();
  
  // State
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [busqueda, setBusqueda] = React.useState('');

  // Context
  const { torneos } = useContext(TorneoContext);
  console.log(torneos);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleCreartorneo = () => {
    setOpen(true);
  }

  const handleDetails = (id) => {
    console.log(id);

    const ruta = '/administrador/detalles/'+id;
    history.push(ruta);
  }

  const handleBusqueda = (event) => {
    var busq = event.target.value; 
    setBusqueda(busq);
  }

  const resultados = !busqueda
    ? torneos
    : torneos.filter(torneo =>
        torneo.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );  

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid 
          container
          spacing={2}
          direction="row" 
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              className={ classes.btn_agregar }
              variant="contained"
              onClick={ handleCreartorneo }
              color="secondary"
              startIcon={ <AddIcon /> }
            >
              Crear torneo
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Paper
              variant="outlined"
              className={classes.paper}
            >
              <SearchIcon className={classes.icon} />
              <Input
                fullWidth
                className={classes.input}
                disableUnderline
                placeholder="Buscar torneo..."
                value={busqueda}
                onChange={handleBusqueda}
              />
            </Paper>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={4}>
          { resultados.map(torneo => {
            return(
              <Grid item key={torneo.nombre} xs={12} sm={6} md={4}>
                <Card 
                  className={classes.card}
                  onClick={ () => handleDetails(torneo.id) }
                >
                  <CardActionArea> 
                    <CardMedia
                      className={classes.cardMedia}
                      image={img}
                      title="Image title"
                    />
                  
                    <CardContent className={ classes.cardContent} >
                      <center>
                        <Typography className={classes.title } gutterBottom>
                          {torneo.nombre}
                        </Typography>
                        <Typography>
                          {torneo.categoria} - {torneo.tipo}
                        </Typography>
                      </center>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
        })}
        </Grid>
      </Container>

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Torneo registrado.
        </Alert>
      </Snackbar>

      {open &&
        <CreaTorneo 
          onClose={()=> setOpen(false)}
          onOpen={ () => setOpenAlert(true) }
        />
      }
    </div>
  );
  
}

export default Administrador;