import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { 
  ValidatorForm, TextValidator, SelectValidator
} from 'react-material-ui-form-validator';
import {
  Button, Dialog, DialogContent, DialogTitle, 
  useMediaQuery, Grid, Typography, LinearProgress, 
  MenuItem, Stepper, InputAdornment, IconButton, 
  Step, StepLabel, CardMedia, DialogActions,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { storage, createUsuario} from '../../../servicios/firebase'; 

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
    width: 200,
    height: 200,
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

export default function RegistrarUsuaro (props) {
	const classes = useStyles();
	const theme = useTheme();

	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open] = useState(true);
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
	const [edad, setEdad] = useState('');
	const [sexo, setSexo] = useState('');
  const [tipo, setTipo] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [progress, setProgress] = useState(0);
  const [picture, setPicture] = useState('');
  const [confirm, setConfirm] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

	const handleClose = () => {
    props.onClose();
  };

  const handleCancel = () => {
    setConfirm(false);
  };

  const handleOk = () => {
    handleSubmit();
    setConfirm(false);
  };

  const handleAccept = () => {
    setConfirm(true);
  }

	const handleSubmit = async () => {
    const data = {
      nombre, apellido, 
      edad: edad+' años', 
      sexo, tipo, 
      correo, clave,
      imagen: picture,
      estado: 2,
      admin: false
		};
    console.log(data);
    await createUsuario(correo, data)
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

    const storageRef = storage.ref(`/fotosPerfil/${file.name}`);
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

  const steps = ['Datos de la cuenta', 'Datos del perfil', 'Foto de perfil'];

	const node = (
		<div>
			<Dialog
				fullScreen={ fullScreen }
				open={ open }
				onClose={ props.onClose }
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					<Typography className={classes.dialogTitle}>
							Registrar usuario
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
          <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item xs={12} justify="center">
              <Typography className={classes.title} align="center" gutterBottom>
                Datos de la cuenta {"\n"}
              </Typography>
            </Grid>
            <ValidatorForm onSubmit={ handleNext }>
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} sm={8} justify="center">
                  <SelectValidator
                    variant="outlined" label="Cargo"
                    value={ tipo }
                    onChange={ e => setTipo(e.target.value) }
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    fullWidth required
                  >
                    <MenuItem value="Monitor">Monitor</MenuItem>
                    <MenuItem value="Personal administrativo">Personal administrativo</MenuItem>
                  </SelectValidator>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextValidator
                    variant="outlined" margin="normal"
                    label="Correo electrónico"
                    placeholder="correo@ejemplo.com"
                    value={ correo }
                    onChange={ e => setCorreo(e.target.value) }
                    validators={['required', 'isEmail']}
                    errorMessages={['Este campo es requerido', 'Correo no válido']}
                    required fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextValidator
                    variant="outlined" margin="normal"
                    label="Contraseña inicial" placeholder="Contraseña inicial"
                    type={values.showPassword ? 'text' : 'password'}
                    value={ clave }
                    onChange={ e => setClave(e.target.value) }
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={ handleClickShowPassword }
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    required fullWidth
                  />
                </Grid>
                <Grid item xs={12} justify="center">
                  <Typography className={classes.title} align="center" gutterBottom>
                    {"\n"}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>  
                  <Button
                    fullWidth type="submit"
                    className={ classes.buttonAccept }
                    variant="contained" color="primary"
                  >
                    Continuar
                  </Button>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Button
                    fullWidth type="submit"
                    className={classes.buttonCan}
                    variant="contained" color="primary"
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
                Datos del perfíl
              </Typography>
            </Grid>
            <ValidatorForm onSubmit={ handleNext }>
              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={12} sm={8}>
                  <TextValidator
                    variant="outlined" margin="normal"
                    id="nombre" label="Nombre (s)"
                    placeholder="p.e. José"
                    value={ nombre }
                    onChange={ e => setNombre(e.target.value) }
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    required fullWidth autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextValidator
                    variant="outlined" margin="normal"
                    id="apellidos" label="Apellidos"
                    placeholder="p.e. Huerta Castro"
                    value={ apellido }
                    onChange={ e => setApellido(e.target.value) }
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    required fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <SelectValidator
                    variant="outlined" label="Sexo"
                    value={ sexo } margin="normal"
                    onChange={ e => setSexo(e.target.value) }
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    fullWidth required
                  >
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Femenino</MenuItem>
                  </SelectValidator>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextValidator
                    variant="outlined" margin="normal"
                    id="edad" label="Edad"
                    placeholder="p.e. 22"
                    value={ edad }
                    onChange={ e => setEdad(e.target.value) }
                    validators={
                      ['required', 'minNumber:15',
                      'maxNumber:100', 'isNumber']
                    }
                    errorMessages={
                      ['Este campo es requerido.', 
                      'La edad debe ser 18 años o más.',
                      'La edad máxima es 100.',
                      'Ingrese números']
                    }
                    required fullWidth
                  />
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
                  >
                    Continuar
                  </Button>
                </Grid>
                <Grid item xs={6} sm={4}>
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
        { activeStep === 2 &&
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
                Foto de perfíl (opcional)
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
                  title="Foto de perfíl"
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
  return ReactDOM.createPortal(node, document.getElementById('modal-root'));
}