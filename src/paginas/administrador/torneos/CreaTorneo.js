import React from 'react';
import ReactDOM from 'react-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';

import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { db } from '../../../servicios/firebase/index'

/*
    
                                    <option value="" disabled>
                                        8
                                    </option>
*/ 

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
      width: 'auto'
    },
    form: {
      margin: theme.spacing(2, 2, 2),
    },
    buttonCan: {
        margin: theme.spacing(1),
        backgroundColor: '#FFF',
        borderRadius: '5px',
        color: '#000',
        '&:hover': {
            backgroundColor: '#C4C4C4',
            }
    },
    buttonAccept:{
        margin: theme.spacing(1),
        backgroundColor: '#192D3E',
        borderRadius: '5px',
        '&:hover': {
        backgroundColor: '#3A4750',
        }
    },
  }));

export default function CreaTorneo(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [selectedDateFin, setSelectedDateFin] = React.useState(new Date());

    const handleDateChangeFin = (date) => {
        setSelectedDateFin(date);
      };

      const [selectedDateInicio, setSelectedDateInicio] = React.useState(new Date());

      const handleDateChangeInicio = (date) => {
          setSelectedDateInicio(date);
        };
  

    //COPIANDOLE ESTO A LUIS xD
    const { onClose } = props;
    const [open] = React.useState(true);
    const [nombre, setNombre] = React.useState('');
    const [categoria, handleCategoriaChange] = React.useState('');
    const [tipo, handleTipoChange] = React.useState('');
    const [participantes, handleParticipantesChange] = React.useState('');
    
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClose = () => {
      props.onClose();
    };

    const handleSubmit = () => {
        // your submit logic
        const Torneox = {
            nombre:nombre,
            tipo:tipo,
            categoria:categoria,
            fecha_inicio:selectedDateInicio,
            fecha_fin:selectedDateFin,
            participantes:participantes,
        };

        db.collection('torneos').doc(Torneox.nombre).set(Torneox);
        console.log('¿exito?');
        props.onClose();
    }

    function updates(id){
        const Torneox = {
            nombre:nombre,
            tipo:tipo,
            categoria:categoria,
            fecha_inicio:selectedDateInicio,
            fecha_fin:selectedDateFin,
            participantes:participantes,
        };

        db.collection('torneos').doc(id).set(Torneox);
        return (console.log('¿exito?'));
    }


    const node = (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Typography component="h1" align="center">
                        RCrear Torneo
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Divider variant='middle'/>
                    <br />
                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            id="nombre"
                            placeholder="Nombre del Torneo"
                            value={nombre}
                            onChange={ e => setNombre(e.target.value) }
                            required
                            errorMessages={['Este campo es necesario']}
                            fullWidth
                            autoFocus
                        />
                        <br />
                        <br />
                        <Grid container justify="space-around" spacing={2}>
                            <Grid item xs={6}>  
                                <FormControl className={classes.formControl} fullWidth>
                                
                                    <NativeSelect
                                        className={classes.selectEmpty}
                                        value={categoria}
                                        name="categoria"
                                        onChange={ e => handleCategoriaChange(e.target.value) }
                                        inputProps={{ 'aria-label': 'categoria' }}
                                    >
                                        <option value='varonil'>Varonil</option>
                                        <option value='femenil'>Femenil</option>
                                        <option value='mixto'>Mixto</option>
                                    </NativeSelect>
                                    <FormHelperText>Categoria</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>  
                                <FormControl className={classes.formControl} fullWidth >
                                
                                    <NativeSelect
                                        className={classes.selectEmpty}
                                        value={tipo}
                                        name="tipo"
                                        onChange={ e => handleTipoChange(e.target.value) }
                                        inputProps={{ 'aria-label': 'tipo' }}
                                    >
                                    
                                        <option value='simple'>Simple</option>
                                        <option value='doble'>Doble</option>
                                    </NativeSelect>
                                    <FormHelperText>Tipo</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br />

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around" spacing={2}>
                                    <Grid item xs={6}>  
                                        <KeyboardDatePicker
                                            
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="FechaInicio"
                                            label="Fecha de Inicio"
                                            value={selectedDateInicio}
                                            onChange={handleDateChangeInicio}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>  
                                        <KeyboardDatePicker
                                            
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="FechaFin"
                                            label="Fecha de Final"
                                            value={selectedDateFin}
                                            onChange={handleDateChangeFin}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </MuiPickersUtilsProvider>    
                        <br />
                        <br />
                        
                        <FormControl className={classes.formControl} fullWidth>
                                <NativeSelect
                                    className={classes.selectEmpty}
                                    value={participantes}
                                    name="participantes"
                                    onChange={ e => handleParticipantesChange(e.target.value) }
                                    inputProps={{ 'aria-label': 'participantes' }}
                                >
                                    <option value={8}>8</option>
                                    <option value={16}>16</option>
                                    <option value={32}>32</option>
                                </NativeSelect>
                                <FormHelperText>Participantes</FormHelperText>
                            </FormControl>
                        
                        <br />
                        <br />
                        <Grid container justify="space-around" spacing={2}>
                                    <Grid item xs={6}>  
                                <Button
                                    type="submit"
                                    className={classes.buttonAccept}
                                    variant="contained"
                                    color="primary"
                                    onClick={updates('Roberto')}
                                >
                                    Guardar
                                </Button>
                                <Button
                                    type="submit"
                                    className={classes.buttonCan}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClose}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </DialogContent>

            </Dialog>
        </div>
    );
    return ReactDOM.createPortal(node,document.getElementById('modal-root'));
}