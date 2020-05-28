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
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';

import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-06-01T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
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
        props.onClose();
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
                    <Divider />
                    <line />
                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            id="email"
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
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    className={classes.selectEmpty}
                                    value={categoria}
                                    name="categoria"
                                    onChange={ e => handleCategoriaChange(e.target.value) }
                                    inputProps={{ 'aria-label': 'categoria' }}
                                >
                                    <option value="" disabled>
                                        Categoria
                                    </option>
                                    <option value='varonil'>Varonil</option>
                                    <option value='femenil'>Femenil</option>
                                    <option value='mixto'>Mixto</option>
                                </NativeSelect>
                                <FormHelperText>required</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    className={classes.selectEmpty}
                                    value={tipo}
                                    name="tipo"
                                    onChange={ e => handleTipoChange(e.target.value) }
                                    inputProps={{ 'aria-label': 'tipo' }}
                                >
                                    <option value="" disabled>
                                        Tipo
                                    </option>
                                    <option value='varonil'>Varonil</option>
                                    <option value='femenil'>Femenil</option>
                                    <option value='mixto'>Mixto</option>
                                </NativeSelect>
                                <FormHelperText>Placeholder</FormHelperText>
                            </FormControl>

                        <br /> 
                        <br />

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                    <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                    
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
                                    <option value="" disabled>
                                        Participantes
                                    </option>
                                    <option value={8}>8</option>
                                    <option value={16}>16</option>
                                    <option value={32}>32</option>
                                </NativeSelect>
                            </FormControl>
                        
                        <br />
                        <br />
                        <row>
                            <Button
                                type="submit"
                                className={classes.buttonAccept}
                                variant="contained"
                                color="primary"
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
                        </row>
                    </ValidatorForm>
                </DialogContent>

            </Dialog>
        </div>
    );
    return ReactDOM.createPortal(node,document.getElementById('modal-root'));
}