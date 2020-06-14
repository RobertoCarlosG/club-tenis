import React, { useContext, createRef } from 'react'
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { TorneoContext } from '../../contexto/ctx_torneo';
import GetDataFromExcelJusTInput from './data_fromE'
import { useParams } from 'react-router-dom';

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
    backgroundColor:'#F3F3F3',
    border: '1px',
    alignContent:'center',
    boxSizing: 'border-box',
    padding: '15px',
    
    display: 'flex',
    alignItems: 'center',
    height:'250px',

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

  let hojas = [];
  // Context
  const { torneos } = useContext(TorneoContext);
  console.log(torneos);

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [datos, setDatos] = React.useState([]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleCreartorneo = () => {
    setOpen(true);
  }

  const handleDetails = () => {
    
    const ruta = 'capturista/historial/';
    history.push(ruta);
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
      <br /> 
     <Container maxWidth="lg">    
     
    <Grid container direction="row" justify="space-between" spacing={3}>
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
          {resultados.map(torneo=>{
            return(
              <div>
                 <ListItem
                    button
                    selected={selectedIndex === selectedIndex+1}
                    onClick={(event) => handleListItemClick(event, selectedIndex)}
                    value={torneo.id}
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
                          <input  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" {...getInputProps()} />
                          <p className={classes.con_dropzone}><center>Arrastra tu archivo aqui o seleccionalo</center></p>
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
                          <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                           onChange = { event => {
                            let reader = new FileReader()
                            reader.readAsArrayBuffer(event.target.files[0]);
                            reader.onloadend = (e) => {
                              var data = new Uint8Array(e.target.result);
                              var workbook = XLSX.read(data, {type: 'array'});
                              workbook.SheetNames.forEach(function(sheetName) {
                                
                                // Here is your object
                                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                                datos.push({
                                  data: XL_row_object,
                                })
                                hojas.push({
                                  data: XL_row_object,
                                  sheetName
                                })
                                console.log(XL_row_object);
                              })
                            }
                            setDatos(JSON.stringify(datos));
                            console.log(datos);
                          }}
                          />
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
      </Grid>
    </Grid>
        
        </Container>
     
    </div>
  );
  
}

export default Capturista;