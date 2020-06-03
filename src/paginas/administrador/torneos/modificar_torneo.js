import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { updateTorneo } from '../../../servicios/firebase';

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
		margin: theme.spacing(1, 1, 1),
	},
	buttonCan: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
		backgroundColor: '#FFF',
		borderRadius: '5px',
		color: '#000',
		borderColor: '#192D3E',
		'&:hover': {
			backgroundColor: '#C4C4C4',
		}
	},
	buttonAccept:{
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
		backgroundColor: '#192D3E',
		borderRadius: '5px',
		'&:hover': {
			backgroundColor: '#3A4750',
		}
	},
}));

export default function ModificarTorneo(props) {
	const classes = useStyles();
  const theme = useTheme();
  
  const { idTorneo, ...rest } = props;

	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const [open] = useState(true);
	const [nombre, setNombre] = useState('');
	const [categoria, setCategoria] = useState('');
	const [tipo, setTipo] = useState('');
	const [participantes, setParticipantes] = useState('');
	const [dateFin, setDateFin] = useState(new Date());
	const [dateInicio, setDateInicio] = useState(new Date());

	useState(() => {
		if ( props.nombre != '' ) setNombre(props.nombre);
		if ( props.categoria != '' ) setCategoria(props.categoria);
		if ( props.tipo != '' ) setTipo(props.tipo);
		if ( props.participantes != '' ) setParticipantes(props.participantes);
		if ( props.dateFin != null ) setDateFin(props.dateFin);
		if ( props.dateInicio != null ) setDateInicio(props.dateInicio);
	});

	const handleDateChangeFin = (date) => {
		setDateFin(date);
	};
	
	const handleDateChangeInicio = (date) => {
		setDateInicio(date);
	};

	const handleClose = () => {
		props.onClose();
	};

	const handleSubmit = async () => {
		const data = {
			nombre: nombre, 
			categoria: categoria, 
			tipo: tipo, 
			participantes: participantes, 
			fecha_inicio: dateInicio, 
			fecha_fin: dateFin 
		};
    await updateTorneo(idTorneo, data);
    
    props.onOpen();
    props.onClose();
	}

	const node = (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={ props.onClose }
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					<Typography component="h1" variant="h5" align="center">
							Modificar Torneo
					</Typography>
				</DialogTitle>
				<Divider variant='middle'/>
				<DialogContent>
					<ValidatorForm onSubmit={ handleSubmit }>
						<Grid container spacing={2} justify="center" alignItems="center">
							<Grid item xs={12} sm={10} justify="center">
								<TextValidator
									variant="outlined"
									margin="normal"
									id="nombre"
									label="Nombre"
									placeholder="p.e. Grand Slam"
									name="nombre"
									autoComplete="name"
									value={ nombre }
									onChange={ e => setNombre(e.target.value) }
									validators={['required']}
									errorMessages={['Este campo es requerido']}
									required
									fullWidth
									autoFocus
								/>
							</Grid>
							<br />
							<Grid item xs={6} sm={5} justify="center">
								<FormControl variant="outlined" className={classes.formControl} fullWidth>
									<InputLabel id="categoria">Categoría</InputLabel>
									<Select
										labelId="categoria"
										id="categoria"
										value={ categoria }
										onChange={ e => setCategoria(e.target.value) }
										label="Categoría"
									>
										<MenuItem value="Varonil">Varonil</MenuItem>
										<MenuItem value="Femenil">Femenil</MenuItem>
										<MenuItem value="Mixto">Mixto</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={6} sm={5} justify="center">
								<FormControl variant="outlined" className={classes.formControl} fullWidth>
									<InputLabel id="tipo">Tipo</InputLabel>
									<Select
										labelId="tipo"
										id="tipo"
										value={ tipo }
										onChange={ e => setTipo(e.target.value) }
										label="tipo"
									>
										<MenuItem value="Simple">Simple</MenuItem>
										<MenuItem value="Doble">Doble</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<br />
							<MuiPickersUtilsProvider className={classes.formControl} utils={DateFnsUtils}>
								<Grid item md={5} justify="center">
									<KeyboardDatePicker
										disableToolbar
										fullWidth
										inputVariant="outlined"
										variant="inline"
										format="MM/dd/yyyy"
										margin="normal"
										id="FechaInicio"
										label="Fecha de Inicio"
										minDate={ Date.now() }
										value={ dateInicio }
										onChange={ handleDateChangeInicio }
										KeyboardButtonProps={{
												'aria-label': 'change date',
										}}
									/>
								</Grid>
								<Grid item md={5} justify="center">
									<KeyboardDatePicker
										disableToolbar
										fullWidth
										inputVariant="outlined"
										margin="normal"
										variant="inline"
										id="FechaFin"
										label="Fecha de Final"
										format="MM/dd/yyyy"
										minDate={ Date.now() }
										value={ dateFin }
										onChange={ handleDateChangeFin }
										KeyboardButtonProps={{
												'aria-label': 'change date',
										}}
									/>
								</Grid>
							</MuiPickersUtilsProvider>
							<br />
							<Grid item xs={12} sm={10} justify="center">
								<FormControl variant="outlined" className={classes.formControl} fullWidth>
									<InputLabel id="participantes">Participantes</InputLabel>
									<Select
										labelId="participantes"
										id="participantes"
										value={ participantes }
										onChange={ e => setParticipantes(e.target.value) }
										label="Participantes"
									>
										<MenuItem value={ 8 }>8</MenuItem>
										<MenuItem value={ 16 }>16</MenuItem>
										<MenuItem value={ 32 }>32</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<br />
							<Grid item xs={6} sm={5} justify="center">  
									<Button
										fullWidth
										type="submit"
										className={classes.buttonAccept}
										variant="contained"
										color="primary"
									>
										Guardar
									</Button>
							</Grid>
							<Grid item xs={6} sm={5} justify="center">
                <Button
                  fullWidth
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