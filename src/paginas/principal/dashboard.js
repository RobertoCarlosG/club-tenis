import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, Input } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


import img from '../../imagenes/Logo5.svg';
import { TorneoContext } from '../../contexto/ctx_torneo';
//CARTAS
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Detalles from'./verTorneo';
import Topbar from './BarraSuperior';

function cambiarFondo() {
  document.body.style = 'background: F7F7F7;';
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '7px',
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


const Principal = () => {
  const classes = useStyles();
  const history = useHistory();
  cambiarFondo();
  // Context
  const { torneos } = useContext(TorneoContext);
  console.log(torneos);

  const handleDetails = (id) => {
    const ruta = 'inicio/torneo/'+id;
    history.push(ruta);
  }

  return (
    <React.Fragment>
      <Topbar 
      nombre='internauta'/>
      <br />
      <br />
      <br /><br />
      <center>
        <Typography className={classes.title}>
          Torneos Disponibles
        </Typography>  
      </center>
      <div className={ classes.root }>
      <Grid container direction="row" spacing={4}>
          { torneos.map(torneo => {
            return(
              <Grid item key={torneo.nombre} xs={12} sm={4} md={4}>
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
      </div>
    </React.Fragment>
  );
  
}

export default Principal;