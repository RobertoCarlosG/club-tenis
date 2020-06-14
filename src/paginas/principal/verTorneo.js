import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid,
  Typography, CardMedia,Button,Divider
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import MuiAlert from '@material-ui/lab/Alert';
import {
  useParams
} from 'react-router-dom';
import img from '../../imagenes/Logo8.svg';
import { db } from '../../servicios/firebase/index';
import Topbar from './BarraSuperior';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EventIcon from '@material-ui/icons/Event';
import RoomIcon from '@material-ui/icons/Room';
import WatchLaterIcon from '@material-ui/icons/WatchLater';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  table:{
    minWidth:595,
    borderRadius:'7px',
  },
  card: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    boxShadow:'3px 5px 5px rgba(0, 0, 0, 0.32)',
    borderRadius: '7px',
  },
  card_title: {
    color: theme.palette.common.white,
    fontSize: 48,
    fontWeight: 600,
  },
  media: {
    maxWidth: '100%',
    height: 225,
    objectFit: 'contain',
  },
  mediaContent: {
    height: 225,
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
  },
  content: {
    height: 200,
    padding: 20,
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
    textTransform: 'none',
  },
  Dtitle: {
    color: theme.palette.common.white,
    fontSize: 24,
    textTransform: 'none',
    minWidth:580,
    
  },
  title_2: {
    color: '#4CAF50',
    fontSize: 80,
    fontWeight: 500,
  },
  title_3: {
    color: '#F44336',
    fontSize: 80,
    fontWeight: 500,
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
  cardContent: {
    flexGrow: 1,
    alignSelf:'center',
    color: '#FFF',
    background: theme.palette.primary.main,
    width:'100%',
  },
  gcontainer:{
    padding: '25px',
    marginLeft:'25px',
  },
  titleCard:{
    fontSize: 24,
    color: '#FFF',
  },
  topCard:{
    fontSize:24,
    color:'#000',
  },
  versus:{
    background: theme.palette.primary.main,
    color:'#fff',
    width:'100%'
  },
  sixBtn:{
    fontSize:14,
    color:'#000',
  },
  btn_disabled:{
    backgroundColor:'#E5E5E5',
    boxShadow:'4px 4px 4px rgba(0, 0, 0, 0.25)',
    border: 1,
  },
  btn_close:{
    color:'#FFF',
  }
}));

const Detalles = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { className, ...rest } = props;
  const classes = useStyles();
  const { idTorneo } = useParams();
  console.log(idTorneo);
  const [id, setId] = useState('');
  const [local, setLocal] = useState('');
  const [visita, setVisita] = useState('');
  const [lugar, setLugar] = useState('');
  const [duracion, setDuracion] = useState('');
  const [hora, setHora] = useState([]);
  const [set1, setSet1] = useState([]);
  const [set2, setSet2] = useState([]);
  const [set3, setSet3] = useState([]);
  const [ronda,setRonda] = useState('');
  const [fecha,setFecha] = useState('');
  const [open, setOpen] = useState(false);
  const [partidos, setPartidos] = useState([]);
  const [torneo, setTorneo] = useState([]);    

  const handleDetails = (id,local,visita,lugar,duracion,hora,set1,set2,set3,ronda,fecha) =>{
    setId(id);
    setLocal(local);
    setVisita(visita);
    setDuracion(duracion);
    setHora(hora);
    setLugar(lugar);
    setSet3(set3);
    setSet1(set1);
    setSet2(set2);
    setFecha(fecha);
    setRonda(ronda);
    console.log(set1);
    console.log(set3);
    console.log(set2);
    setOpen(true);
};

  const handleCloseDialog = () =>{
    setOpen(false);
}
  var datos = [];

  useEffect(() => {
    const abortController = new AbortController();
    const partidosRef = db.collection('partidos').where("torneo", "==", idTorneo);
    partidosRef.onSnapshot( snapshot => {
      let torneo_name;
      snapshot.forEach(doc => {
        const {
          nombre, local, visita,
          torneo, fecha, hora,
          ganador, puntos_local,
          puntos_visita, ronda,
          estado,set1,set2,set3,
          duracion,lugar
        } = doc.data();
        datos.push({
          id: doc.id,
          nombre, local, visita,
          torneo, fecha, hora,
          ganador, puntos_local,
          puntos_visita, ronda,
          estado,set1,set2,set3,
          duracion,lugar
        });
         torneo_name = doc.data().torneo;
      });
      console.log(datos);
      setPartidos(datos);
      setTorneo(torneo_name);
    });

    return function cleanup(){
      abortController.abort();
    };

  }, []);

  return (
    <React.Fragment>
    <Topbar
    />
    <br />
    <br />
    <br />
    <br />
    <div className={ classes.root }>
      
    <Grid container direction="row" spacing={3} justyfy="center" alignItems="center" >
      <Grid item xs={12} >
        <Typography className={classes.title}>
          <center> { torneo }</center> 
        </Typography>
      </Grid>
    </Grid> 
    <Grid container spacing={4}>
        { partidos.map(partido => {
                return(
                <Grid item key={partido.id} xs={12} sm={6} md={4}>
                    <Card 
                    className={classes.card}
                    onClick={ () => handleDetails(partido.id,partido.local,partido.visita,partido.lugar,partido.duracion,partido.hora,partido.set1,partido.set2,partido.set3,partido.ronda,partido.fecha) }
                    >
                      <center>
                        <Typography className={classes.topCard }>
                            {partido.estado}
                        </Typography>
                      </center>  
                      <CardMedia
                          className={classes.media}
                          image="https://source.unsplash.com/random"
                          title="Partido"
                        />
                      <CardContent className={ classes.cardContent }>
                        <Typography className={ classes.titleCard }>
                        &nbsp;&nbsp;&nbsp;&nbsp; {partido.local} vs {partido.visita}
                        </Typography>
                          
                      </CardContent>
                    </Card>
                </Grid>
                );
            })}
      </Grid>
    <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullScreen={fullScreen}
        fullWidth
        aria-labelledby="confirmation-dialog-title"
        open={open}
      >
        <DialogTitle>
          <Typography >
            <center>RESULTADOS</center>
          </Typography>
        </DialogTitle>
       
        <DialogContent dividers>
          <Grid container spacing={3} justify='center' alignContent='center' alingItems='center'>
            <Grid cointainer >
              
                <Grid item xs={12}>
                  <Button fullWidth  className={classes.versus}>
                  <Typography className={classes.Dtitle}>
                    <center>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {local}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      vs
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {visita}
                    </center>
                  </Typography>
                  </Button>
                  
                </Grid>
            <br />
            </Grid>
            <br />
            <br />
            {/**BOTONES INFORMATIVOS */}
            <Grid container spacing={3} justify='center' alingItems='center'>
              <Grid item xs={4}>
                <Button disabled fullWidth startIcon={<AccountTreeIcon style={{color:'#000'}}/>} className={classes.btn_disabled}>

                  <Typography className={classes.sixBtn}>
                      {ronda}
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button 
                disabled 
                fullWidth 
                startIcon={<EventIcon style={{color:'#000'}}/>}
                className={classes.btn_disabled}
                >
                  <Typography className={classes.sixBtn}>
                    {fecha}
                  </Typography>
                </Button>
                  
              </Grid>
              <Grid item xs={4}>
                <Button 
                disabled 
                fullWidth 
                startIcon={<RoomIcon style={{color:'#000'}}/>}
                className={classes.btn_disabled}
                >
                <Typography className={classes.sixBtn}>
                    {lugar}
                  </Typography>
                </Button>
               
              </Grid>
            </Grid>
            {/* SEGUNDA FILA */}
            <Grid container spacing={3} justify='center' alignContent='center'>
              <Grid item xs={4}>
                <Button 
                disabled 
                fullWidth 
                startIcon={<WatchLaterIcon style={{color:'#000'}}/>}
                className={classes.btn_disabled}
                >
                  <Typography className={classes.sixBtn}>
                      {hora}
                    </Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button 
                disabled 
                fullWidth 
                startIcon={<WatchLaterIcon style={{color:'#000'}}/>}
                className={classes.btn_disabled}>
                    <Typography className={classes.sixBtn}>
                      {hora}
                    </Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button 
                disabled 
                fullWidth 
                startIcon={<WatchLaterIcon style={{color:'#000'}}/>}
                className={classes.btn_disabled}>
                    <Typography className={classes.sixBtn}>
                      {duracion}
                    </Typography>
                </Button>
              </Grid>
            </Grid>
            <br />
            <br />
            <br />
            {/**tabla**/}
            <Grid>
              <Table container component={Paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell> Jugador </StyledTableCell>
                      <StyledTableCell> Set 1 </StyledTableCell>
                      <StyledTableCell> Set 2 </StyledTableCell>
                      <StyledTableCell> Set 3 </StyledTableCell>
                      <StyledTableCell> Final </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow key={local}>
                      <StyledTableCell>{local}</StyledTableCell>
                      <StyledTableCell> {set1[0]} </StyledTableCell>
                      <StyledTableCell> {set2[0]} </StyledTableCell>
                      <StyledTableCell> {set3[0]} </StyledTableCell>
                      <StyledTableCell> {set2[0]} </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={visita}>
                      <StyledTableCell>{visita}</StyledTableCell>
                      <StyledTableCell> {set1[1]} </StyledTableCell>
                      <StyledTableCell> {set2[1]} </StyledTableCell>
                      <StyledTableCell> {set3[1]} </StyledTableCell>
                      <StyledTableCell> {set2[1]} </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </Table>
            <br/>
            </Grid>
            <Grid container justify='center' alingItems='center' alignContent='center'>
              <Grid item xs={12}>
                <center>
                <Button onClick={handleCloseDialog} style={{backgroundColor:'#039BE5',color:'#fff'}}>
                <Typography className={classes.btn_close} align="center">
                  Cerrar
                </Typography>
                </Button>
                </center>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        
    </Dialog>  
      
      
      
      
    </div>
    </React.Fragment>
  );
};

Detalles.propTypes = {
  className: PropTypes.string
};

export default Detalles;