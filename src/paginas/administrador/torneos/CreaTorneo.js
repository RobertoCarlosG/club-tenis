import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { 
  ValidatorForm, TextValidator, SelectValidator
} from 'react-material-ui-form-validator';
import {
  Button, Dialog, DialogContent, DialogTitle, 
  useMediaQuery, Grid, Typography, LinearProgress, 
  MenuItem, Stepper, Card, IconButton, 
  Step, StepLabel, CardMedia, DialogActions,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { TorneoContext } from '../../../contexto/ctx_torneo';
import { storage } from '../../../servicios/firebase';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dialogTitle: {
    textTransform: 'none',
    fontSize: 30,
    fontWeight: 500,
    textAlign: 'center'
  },
  title: {
    textTransform: 'none',
    fontSize: 24,
  },
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch',
  },
  text: {
    textTransform: 'none',
    fontSize: 18,
    textAlign: 'center'
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
  button: {
    padding: theme.spacing(1, 0, 1),
		textTransform: 'none',
    backgroundColor: '#FFF',
    border: '1px solid #192D3E',
		borderRadius: '5px',
		color: '#000',
    fontSize: 18,
		'&:hover': {
			backgroundColor: '#C4C4C4',
		}
  },
	buttonCan: {
		padding: theme.spacing(1, 0, 1),
		textTransform: 'none',
		backgroundColor: '#FFF',
		borderRadius: '5px',
		color: '#000',
    borderColor: '#192D3E',
    fontSize: 18,
		'&:hover': {
			backgroundColor: '#C4C4C4',
		}
	},
	buttonAccept:{
		padding: theme.spacing(1, 0, 1),
		textTransform: 'none',
		backgroundColor: '#192D3E',
    borderRadius: '5px',
    fontSize: 18,
		'&:hover': {
			backgroundColor: '#3A4750',
		}
  },
  stepper: {
    padding: theme.spacing(3, 1, 1),
  },
  icon: {
    color: theme.palette.text.primary
  },
  media: {
    width: 400,
    height: 225,
  },
  ok: {
    background: theme.palette.secondary.dark,
    borderRadius: '4px',
    color: '#FFF',
    textTransform: 'none',
    fontSize: 18,
    '&:hover': {
			backgroundColor: theme.palette.secondary.light,
		}
  },
  cancel: {
    color: '#646464',
    borderRadius: '4px',
    border: '1px solid #AFAFAF',
    textTransform: 'none',
    fontSize: 18,
    '&:hover': {
			backgroundColor: '#C4C4C4',
		}
  },
}));

export default function CrearTorneo(props) {
	const classes = useStyles();
	const theme = useTheme();

	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { createTorneo } = useContext(TorneoContext);

  const [open] = useState(true);
	const [nombre, setNombre] = useState('');
	const [categoria, setCategoria] = useState('');
	const [tipo, setTipo] = useState('');
	const [participantes, setParticipantes] = useState('');
	const [dateFin, setDateFin] = useState(new Date());
  const [dateInicio, setDateInicio] = useState(new Date());
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSimple, setIsSimple] = useState(true);

  const handleTipo = (event) => {
    if (event.target.value == 'Doble') {
      setIsSimple(false);
    }
    setTipo(event.target.value);
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

	const handleDateChangeFin = (date) => {
		setDateFin(date);
	};
	
	const handleDateChangeInicio = (date) => {
		setDateInicio(date);
  };

	const handleClose = () => {
    props.onClose();
  };
  
  const handleAccept = () => {
    setConfirm(true);
  }

  const handleOk = () => {
    handleSubmit();
    setConfirm(false);
  };

  const handleCancel = () => {
    setConfirm(false);
  };

	const handleSubmit = async () => {
    var numRondas = 3;

    if (participantes == 16) numRondas = 4;
    if (participantes == 28 || participantes == 32) numRondas = 5;
    if (participantes == 48) numRondas = 6;

		const data = {
      nombre: nombre, 
      categoria: categoria, 
      tipo: tipo, 
      participantes: participantes, 
      fecha_inicio: dateInicio, 
      fecha_fin: dateFin,
      estado: "Activo",
      inscritos: false,
      sorteo: false,
      numRondas: numRondas,
      ganador: 'Por definirse',
      imagen: picture,
		};
    console.log(data);

    await createTorneo(data)
    .then(() =>{
      props.onOpen();
      console.log('Succes');
    }).catch(error => {
      console.log('Error', error.message);
    })

    props.onClose();
  }

  const handleUpload = (event) => {
    const file = event.target.files[0];

    const storageRef = storage.ref(`/fotosTorneos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + porcentaje + '% done');
      setProgress(porcentaje);
    }, error => {
      console.log(error.message);
    }, () => {
      setProgress(100);
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        setPicture(downloadURL);
      });
    });
  }
  
  const steps = ['Datos del torneo', 'Foto del torneo'];

	const node = (
		<div>
			<Dialog
				fullScreen={ fullScreen }
				open={ open }
				onClose={ props.onClose }
			>
        <DialogTitle id="form-dialog-title">
					<Typography className={classes.dialogTitle}>
							Crear torneo
					</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel className={classes.title}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
				</DialogTitle>
        <DialogContent>
        { activeStep === 0 &&
          <Grid container spacing={2} direction="row" justify="center" alignItems="center">
            <Grid item xs={12} justify="center">
              <Typography className={classes.title} align="center" gutterBottom>
                Datos del torneo
              </Typography>
            </Grid>
            <ValidatorForm onSubmit={ handleNext }>
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} sm={10}>
                  <TextValidator
                    variant="outlined" margin="normal"
                    id="nombre" label="Nombre"
                    placeholder="p.e. Grand Slam"
                    value={ nombre }
                    onChange={ e => setNombre(e.target.value) }
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    required fullWidth autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={5}>
                  <SelectValidator
                    variant="outlined" label="Modalidad"
                    value={ tipo } margin="normal"
                    onChange={ e => handleTipo(e) }
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    fullWidth required
                  >
                    <MenuItem value="Simple">Simple</MenuItem>
										<MenuItem value="Doble">Doble</MenuItem>
                  </SelectValidator>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                  <SelectValidator
                    variant="outlined" label="Categoría"
                    value={ categoria } margin="normal"
                    onChange={ e => setCategoria(e.target.value) }
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    fullWidth required
                  >
                    <MenuItem value="Varonil">Varonil</MenuItem>
										<MenuItem value="Femenil">Femenil</MenuItem>
										{ isSimple === false &&
                      <MenuItem value="Mixto">Mixto</MenuItem>
                    }
                  </SelectValidator>
                </Grid>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={12} sm={6} md={5} justify="center">
                    <KeyboardDatePicker
                      disableToolbar fullWidth
                      inputVariant="outlined" variant="inline"
                      format="MM/dd/yyyy" margin="normal"
                      id="FechaInicio" label="Fecha de Inicio"
                      minDate={ Date.now() }
                      value={ dateInicio }
                      onChange={ handleDateChangeInicio }
                      KeyboardButtonProps={{
                          'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={5} justify="center">
                    <KeyboardDatePicker
                      disableToolbar fullWidth
                      inputVariant="outlined" margin="normal"
                      variant="inline" id="FechaFin"
                      label="Fecha de Final" format="MM/dd/yyyy"
                      minDate={ Date.now() }
                      value={ dateFin }
                      onChange={ handleDateChangeFin }
                      KeyboardButtonProps={{
                          'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>

                <Grid item xs={12} sm={10}>
                  <SelectValidator
                    variant="outlined" label="Participantes"
                    value={ participantes } margin="normal"
                    onChange={ e => setParticipantes(e.target.value) }
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    fullWidth required
                  >
                    <MenuItem value={ 8 }>8</MenuItem>
										<MenuItem value={ 16 }>16</MenuItem>
                    { isSimple === true &&
                      <MenuItem value={ 28 }>28</MenuItem>
                    }
                    <MenuItem value={ 32 }>32</MenuItem>
                    { isSimple === true &&
                      <MenuItem value={ 48 }>48</MenuItem>
                    }
                  </SelectValidator>
                </Grid>

                <Grid item xs={12} justify="center">
                  <Typography className={classes.title} align="center" gutterBottom>
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={5}>  
                  <Button
                    fullWidth
                    type="submit"
                    className={ classes.buttonAccept }
                    variant="contained"
                    color="primary"
                  >
                    Continuar
                  </Button>
                </Grid>
                <Grid item xs={6} sm={5}>
                  <Button
                    fullWidth
                    type="submit"
                    className={classes.buttonCan}
                    variant="contained"
                    color="primary"
                    onClick={ handleClose }
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Grid>
        }
        { activeStep === 1 &&
          <Grid container spacing={2} direction="row" justify="center" alignItems="center">
            <Grid item xs={2} justify="center">
              <IconButton 
                aria-label="volver" 
                size="medium"
                onClick={ handleBack }
              >
                <ArrowBackIcon className={classes.icon} />
              </IconButton>
            </Grid>
            <Grid item xs={10} justify="center">
              <Typography className={classes.title}>
                Foto del torneo (opcional)
              </Typography>
            </Grid>
            <Grid item xs={10} sm={6}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={ handleUpload }
              />
              <label htmlFor="raised-button-file">
                <Button variant="raised" component="span" className={classes.button} fullWidth>
                  Seleccionar imagen
                </Button>
              </label>
            </Grid>
            <Grid item xs={8} justify="center">
                <BorderLinearProgress variant="determinate" value={ progress } />
              </Grid>
            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
              <Grid item xs={10} justify="center">
                <CardMedia
                  className={ classes.media }
                  image={ picture }
                  title="Foto del torneo"
                  style={{ display:'flex', justifyContent:'center' }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} justify="center">
              <Typography className={classes.title} align="center" gutterBottom>
                {"\n"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>  
              <Button
                fullWidth
                type="submit"
                className={ classes.buttonAccept }
                variant="contained"
                color="primary"
                onClick={ handleAccept }
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Button
                fullWidth
                type="submit"
                className={ classes.buttonCan }
                variant="contained"
                color="primary"
                onClick={ handleClose }
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        }
        <br /><br />
				</DialogContent>
      </Dialog>
      { confirm &&
        <Dialog
          disableBackdropClick disableEscapeKeyDown
          maxWidth="xs" aria-labelledby="confirmation-dialog-title"
          open={ confirm }
        >
          <DialogTitle id="confirmation-dialog-title">
            <Typography className={classes.dialogTitle}>
              Confirmación
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Typography className={classes.text} justify="center">
              ¿Está seguro de que desea guardar la información?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOk} className={classes.ok}>
              &nbsp;Aceptar&nbsp;
            </Button>
            <Button autoFocus onClick={handleCancel} className={classes.cancel}>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      }
		</div>
	);
	return ReactDOM.createPortal(node,document.getElementById('modal-root'));
}