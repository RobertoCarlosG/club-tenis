import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, Input } from '@material-ui/core';
import img from '../../../imagenes/Logo5.svg';

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
  document.body.style = 'background: F7F7F7;';
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  fixedHeight: {
    height: 240,
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
    flexBasis: 420
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
    letterSpacing: '-0.05px'
  },
  title: {
    fontSize: 24,
  },
}));


const Administrador = () => {
  const classes = useStyles();
  cambiarFondo();
  
  const [Xstate, setXstate] = React.useState(null);
  const [torneos, setTorneos] = React.useState([]);
  const [busqueda, setBusqueda] = React.useState('');

  const handleState = () => {
    setXstate(1);
  };

  const handleDetails=(id)=>{
    console.log(id);
    // Ir a detalles.
  }

  const handleBusqueda = (event) => {
    setBusqueda(event.target.value);
  }

  React.useEffect(() => {
      const fetchData = async () => {
          const data = await db.collection('torneos').get()
          setTorneos(data.docs.map(doc => doc.data()))
      }
      fetchData()
  }, []);  
  
  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={3} direction="row" justify="space-between">
          <Grid item xs={6} sm={4}>
            <Button
              fullWidth
              className={ classes.btn_agregar }
              variant="contained"
              onClick={ handleState }
              color="secondary"
            > 
              <AddIcon className={ classes.pIcon }/>
              Crear Torneo
            </Button>
          </Grid>
          <Grid item xs={6} sm={5}>
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
                onChange={handleBusqueda}
              />
            </Paper>
          </Grid>
        </Grid>
        <br />    
        <Grid container spacing={4}>
          { torneos.map(torneo => {
            return(
              <Grid item key={torneo.nombre} xs={12} sm={6} md={4}>
                <Card className={classes.card}
                  onClick={ () => handleDetails(torneo.nombre) }
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

      {Xstate &&
        <CreaTorneo 
          onClose={()=> setXstate(null)}
        />
      }
    </div>
  );
  
}

export default Administrador;