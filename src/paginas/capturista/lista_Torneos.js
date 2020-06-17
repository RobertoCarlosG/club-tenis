import React, { useContext, createRef, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { 
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Avatar
  } from '@material-ui/core';
import { TorneoContext } from '../../contexto/ctx_torneo';
import { JugadorContext } from '../../contexto/ctx_participantes';
import {createJugador} from '../../servicios/firebase/index'
import GetDataFromExcelJusTInput from './data_fromE'
import { useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function cambiarFondo() {
  document.body.style = 'background: F7F7F7;';
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
    color:'#000',
  },
  btn_procesar:{
    padding: theme.spacing(1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
    backgroundColor: "#192D3E",
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: 'white',
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
  con_dropzone:{
    backgroundColor:'#c4c4c4',
    padding: '15px',
    border: '1px black',
    display: 'flex',
    alignItems: 'center',
    height:'400px',

  },
  dropzone: {
    width : '100%',
    height : '100%',
    border : '1px solid black',
  },
  contenedor:{
    padding: '15px',
    border: '1px solid #000',
    borderRadius: '15px',
    borderColor: '#c4c4c4',
    weight:'100%',
    boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.25)',
  },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#192D3E',
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

  function createData(nombre, federacion, edad, ranking, sexo, torneo) {
    return { nombre, federacion, edad, ranking, sexo, torneo };
  }

  const jugadores = [
  ];


  const prueba = {
      nombre: 'Raul',
      federacion:'ATP',
      edad:'24',
      nacionalidad:'francesa',
      ranking:'0478',
      sexo:'M',
      torneo:'GrandSlam',
  };

const handleSubmit = async (data) => {
    console.log("lista de jugadores",data);
    //await createJugador(data);

}

const CapturistaTorneos = (props) => {

  const { datos } = props;
  const classes = useStyles();
  const history = useHistory();
  // Context
  const { torneos } = useContext(TorneoContext);
  cambiarFondo();
  // State
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [busqueda, setBusqueda] = React.useState('');
  const [dJugador, setJugadores] = React.useState([]);
    
  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    setJugadores(JSON.stringify({data: datos}));
    console.log("datos USEEFFECT:",datos);
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
        <br />
        <Container maxWidth="lg">   
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note Registrado"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />  
        <Grid container direction="row" justify="left" spacing={6}>
            <Grid item xs={3}>
            

            <List component="nav" aria-label="main mailbox folders" style={{borderRadius:'5px', border:'1 solid', boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            style={{backgroundColor:'#192D3E',color:'#fff',borderTopLeftRadius:'5px',borderTopRightRadius:'5px',}} 
            >
            
            
            <center><ListItemText primary="Torneos" style={{fontSize: 24,}}/></center>
            </ListItem>
            
            <Divider />
            {torneos.map(torneo=>{
            return(
                <div>
                <ListItem
                    button
                    selected={selectedIndex === selectedIndex+1}
                    onClick={(event) => handleListItemClick(event, 0)}
                    >
                    <ListItemText primary={torneo.nombre} />
                    </ListItem>
                </div>
            );
            }
            )}
            
        
        </List>
        </Grid>                       
            <Grid item xs={8}>  
            <center> 
                <Typography 
                className={classes.title} 
                > 
                     US Open - Femenil Simple 
                </Typography>
            </center> 
            <br />  
                <div >
                <Grid container direction="row" justify="center" >
                        {/* torneo.nombre */} {/*- torneo.categoria  torneo.modalidad  */}
                            
                </Grid>
                <Grid container direction="row" justify="left" spacing={4}>
                    <Grid item xs={4} >
                        <Button
                            fullWidth
                            className={ classes.btn_procesar }
                            variant="contained"
                            onClick={ handleSubmit(dJugador),handleClick }                       
                            >
                                Procesar 
                                </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button                    
                            fullWidth
                            className={ classes.btn_agregar }
                            variant="contained"
                            style={{backgroundColor:'#F3F3F3', color:'#000', border:'1 solid-black'}} 
                            onClick={handleBack}           
                            >
                                Volver a Cargar 
                        </Button>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell align="left">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Participante
                                </StyledTableCell>
                                <StyledTableCell align="left">Federacion</StyledTableCell>
                                <StyledTableCell align="left">Edad</StyledTableCell>
                                <StyledTableCell align="left">Ranking</StyledTableCell>
                                <StyledTableCell align="left">Sexo</StyledTableCell>
                                <StyledTableCell align="left">Torneo</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jugadores.map((row) => (
                                <StyledTableRow key={row.nombre}>
                                    <StyledTableCell component="th" scope="row" align="left">
                                    <div className={classes.nameContainer}>
                                        {row.nombre}
                                        
                                    </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.federacion}</StyledTableCell>
                                    <StyledTableCell align="left">{row.edad}</StyledTableCell>
                                    <StyledTableCell align="left">{row.ranking}</StyledTableCell>
                                    <StyledTableCell align="left">{row.sexo}</StyledTableCell>
                                    <StyledTableCell align="left">{row.torneo}</StyledTableCell>
                                </StyledTableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        </Grid>
                    </Grid>
                </div>
                </Grid>
            </Grid>
        </Container>
    </div>
  );
  
}

export default CapturistaTorneos;