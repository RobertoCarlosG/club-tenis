import React, { useContext, createRef } from 'react'
import Dropzone from 'react-dropzone';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { db } from '../../servicios/firebase'
import { 
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Avatar
  } from '@material-ui/core';
import { TorneoContext } from '../../contexto/ctx_torneo';

function cambiarFondo() {
  document.body.style = 'background: F7F7F7;';
}

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Capturista = () => {
  const classes = useStyles();
  const history = useHistory();
  cambiarFondo();
  
  // State
  const [open, setOpen] = React.useState(false);
  const [handleBtn, setBtnState] = React.useState(true);
  const [busqueda, setBusqueda] = React.useState('');
  const [nombre_torneo, setNombreTorneo] = React.useState('');
  const [categoria_torneo, setCatTorneo] = React.useState('');
  const [tipo_torneo, setTipoTorneo] = React.useState('');
  const [aux_index, setAuxIndex] = React.useState(1);

  //SNAKBAR
  const [snack, setSnack] = React.useState(false);

  const handleClickSnack = () => {
    setSnack(true);
  };
  const handleSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack(false);
  };


  const [hojas,setHojas] = React.useState([]);
  // Context
  const { torneos } = useContext(TorneoContext);

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [datos, setDatos] = React.useState([]);
  const [confirmacion,setConfirmacion] = React.useState(false);

  const handleListItemClick = (event, index, name, categoria, tipo) => {
    setAuxIndex(index+1);
    setSelectedIndex(index);
    setNombreTorneo(name);
    setCatTorneo(categoria);
    setTipoTorneo(tipo);
    console.log(index);
  };

  const resultados = !busqueda
    ? torneos
    : torneos.filter(torneo =>
        torneo.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );  
  
  const registrar = () => {
    datos.map(item =>{
      item.data.map(itemx => {
        let setDocs = db.collection('jugadores').add(itemx);
        return (
           console.log(setDocs)
          );
      })
      return(console.log(item.data));
    })
  };

  const T_table = (props) => {
    const log = () => console.log('props',props);
    return(
      <React.Fragment>
        {log()}
          {props.item.map( itemx => {
            return(
              <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="left">
                <div className={classes.nameContainer}>
                  {itemx.nombre}                            
                </div>
                </StyledTableCell>
                <StyledTableCell align="left">{itemx.federacion}</StyledTableCell>
                <StyledTableCell align="left">{itemx.edad}</StyledTableCell>
                <StyledTableCell align="left">{itemx.puntos}</StyledTableCell>
                <StyledTableCell align="left">{itemx.sexo}</StyledTableCell>
                <StyledTableCell align="left">{itemx.competicion}</StyledTableCell>
              </StyledTableRow>
            );
          })}
      </React.Fragment>
    );
  }

  const consulta_D = () => {return (console.log(datos));};
  
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
                  onClick={(event) => handleListItemClick(event, 0, '')}
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
                          selected={selectedIndex === aux_index}
                          onClick={(event) => handleListItemClick(event, aux_index, torneo.nombre, torneo.categoria, torneo.tipo)}
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
            {!open &&
             <Grid item xs={8}>
             <center> 
                   <Typography 
                     className={classes.title} 
                     > 
                     {nombre_torneo} ({categoria_torneo} - {tipo_torneo})
                     </Typography>
             </center> 
             <br /> 
               <div className={classes.contenedor}>
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
                                      })
                                     })
                                   }
                                   setBtnState(false);
                                   console.log('datos',datos);
                                   console.log('hojas',hojas);

                                 }}
                                 />
                         </Grid>
                         <Grid item xs={6} sm={5} >
                           <Button
                                   fullWidth
                                   className={ classes.btn_procesar }
                                   variant="contained"
                                   onClick={() => setOpen(true)}
                                   disabled={handleBtn}
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
            }
            {open &&
              <Grid item xs={8}>
              <center> 
                    <Typography 
                      className={classes.title} 
                      > 
                      {nombre_torneo} ({categoria_torneo} - {tipo_torneo})
                      </Typography>
              </center> 
              <br /> 
                <div className={classes.contenedor}>
                  <Grid container direction="row" justify="left" spacing={4}>
                    <Grid item xs={4} >
                        <Button
                            id='btnnns'
                            fullWidth
                            className={ classes.btn_procesar }
                            variant="contained"
                            onClick={registrar,handleClickSnack}
                            >
                                Registrar 
                                </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button                    
                            fullWidth
                            className={ classes.btn_agregar }
                            variant="contained"
                            style={{backgroundColor:'#F3F3F3', color:'#000', border:'1 solid-black'}}  
                            onClick={() => {
                              setOpen(false);
                              setBtnState(true);
                            }}
                            >
                                Volver a Cargar 
                        </Button>
                        <Snackbar open={snack} autoHideDuration={6000} onClose={handleSnack}>
                        <Alert onClose={handleSnack} severity="success">
                          This is a success message!
                        </Alert>
                      </Snackbar>
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
                              
                              {datos.map( item => 
                                <T_table item={item.data} />
                               )}
                              
                            </TableBody>
                            </Table>
                            
                        </TableContainer>
                        </Grid>
                    </Grid>
                </div>
              </Grid>
              
            }
          <br />
          <br />
          <div>
            se debe tomar en cuenta <a href='https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3'>este formato</a> para el registro de nacionalidad
          </div>           
          </Grid>
              
        </Container>
        
        </div>
      );
}

export default Capturista;