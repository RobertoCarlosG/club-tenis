import React, { useContext, createRef } from 'react'
import Dropzone from 'react-dropzone';
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

import { TorneoContext } from '../../contexto/ctx_torneo';


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
    boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.25)',
  },
}));


const Capturista = () => {
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

    const ruta = 'capturista/historial/';
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

 const dropzoneRef = createRef();
 const openDialog = () => {
        // Note that the ref is set async,
        // so it might be null at some point 
        if (dropzoneRef.current) {
          dropzoneRef.current.open()
        }
      };

  return (
    <div className={classes.root}>
     <Container maxWidth="lg">     
           <center> 
             <Typography 
              className={classes.title} 
              > 
              US Open - Femenil Simple 
              </Typography>
           </center>
    <div className={classes.contenedor}>
      
        
      <Grid container direction="row" justify="center" >
        {/* torneo.nombre */} {/*- torneo.categoria  torneo.modalidad  */}
        
      </Grid>

          <Dropzone className={classes.dropzone} ref={dropzoneRef} noClick noKeyboard>
            {({getRootProps, getInputProps, acceptedFiles}) => {
              return (
              <div>
                <Grid container direction="row" justify="space-between" >
                  <Grid item xs={6} sm={5}>
                    <div {...getRootProps({className: 'dropzone'})}>
                      <input  accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document" {...getInputProps()} />
                      <p className={classes.con_dropzone}>Arrastra tu archivo aqui o seleccionalo</p>
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={5}>
                    <aside>
                      <center>
                      <Typography className={classes.title}> Archivo </Typography>
                      </center>
                      <ul>
                        {acceptedFiles.map(file => (
                          <li key={file.path}>
                            {file.path} - {file.size} bytes
                          </li>
                        ))}
                      </ul>
                    </aside>
                  </Grid>
                  <Grid item xs={6} sm={5} >
                    <Button
                            fullWidth
                            className={ classes.btn_agregar }
                            variant="contained"
                            onClick={openDialog}
                            color="secondary"
                          >

                          <AddIcon className={ classes.pIcon }/>
                            Cargar Archivo
                          </Button>
                  </Grid>
                  <Grid item xs={6} sm={5} >
                    <Button
                            fullWidth
                            className={ classes.btn_procesar }
                            variant="contained"
                            onClick={openDialog}
                           
                          >

                          
                            Procesar 
                          </Button>
                  </Grid>
                </Grid>
              </div>
              );
            }}
          </Dropzone> 
        
        </div>
        </Container>
    </div>
  );
  
}

export default Capturista;