import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { 
  ValidatorForm, TextValidator
} from 'react-material-ui-form-validator';
import {
  Button, Dialog, DialogContent, DialogTitle, 
  useMediaQuery, Grid, Typography, 
  MenuItem, Stepper, IconButton, 
  Step, StepLabel, DialogActions,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { updatePartido, updateTorneo, db } from '../../../servicios/firebase';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = {
  root: {
    background: styledBy('color', {
      default: '#FFF',
      blue: '#039BE5',
    }),
    textTransform: 'none',
    borderRadius: 8,
    border: '1px solid #039BE5',
    color: styledBy('color', {
      default: '#039BE5',
      blue: '#FFF',
    }),
    height: 40,
    padding: '0 30px',
    '&:hover': {
      backgroundColor: '#62C1EF',
      color: '#FFF',
      transform: 'translateY(-2px)',
      '& $shadow': {
        bottom: '-1.5rem',
      },
      '& $shadow2': {
        bottom: '-2.5rem',
      },
		}
  },
};

const StyledButton = withStyles(styles)(({ classes, color, ...other }) => (
  <Button className={classes.root} {...other} />
));

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
    textAlign: 'center',
  },
  nombres: {
    color: theme.palette.common.black,
    fontSize: 16,
    textTransform: 'none',
    textAlign: 'center',
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
  text: {
    color: theme.palette.common.black,
    fontSize: 16,
    textTransform: 'none',
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function ResultadosPartido(props) {
	const classes = useStyles();
	const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { idPartido, idTorneo } = props;

  // Control de interfaz
  const [open] = useState(true);
  const [color, setColor] = useState('default');
  const [colorSelect, setColorSelect] = useState('blue');
  const [activeStep, setActiveStep] = useState(0);
  const [confirm, setConfirm] = useState(false);
  
  // Datos del partido
	const [local, setLocal] = useState('');
  const [visita, setVisita] = useState('');
  const [ganador, setGanador] = useState('');
  const [sets, setSets] = useState('');
  const [set1, setSet1] = useState('');
  const [set2, setSet2] = useState('');
  const [set3, setSet3] = useState('');
  const [set4, setSet4] = useState('');
  const [set5, setSet5] = useState('');
  const [set1B, setSet1B] = useState('');
  const [set2B, setSet2B] = useState('');
  const [set3B, setSet3B] = useState('');
  const [set4B, setSet4B] = useState('');
  const [set5B, setSet5B] = useState('');
  const [horas, setHoras] = useState('');
  const [minutos, setMinutos] = useState('');
  const [rondaAsociada, setRondaAsociada] = useState(0);
  const [partidoAsociado, setPartidoAsociado] = useState(0);
  const [bandera1, setBandera1] = useState('');
  const [bandera2, setBandera2] = useState('');
  const [localAsociado, setLocalAsociado] = useState(false);
  const [idP1, setIdP1] = useState('');
  const [idP2, setIdP2] = useState('');

  useEffect(() => {
    try {
      const partidoRef = db.collection('partidos').doc(idPartido);
      console.log('id', idPartido);

      partidoRef.onSnapshot( snapshot => {
        console.log(snapshot.data());
        setLocal(snapshot.data().local);
        setVisita(snapshot.data().visita);
        setSets(snapshot.data().setsMax);
        setGanador(snapshot.data().local);
        setRondaAsociada(snapshot.data().ronda_asociada);
        setPartidoAsociado(snapshot.data().partido_asociado);
        setBandera1(snapshot.data().bandera1);
        setBandera2(snapshot.data().bandera2);
        setLocalAsociado(snapshot.data().local_asociado);
        setIdP1(snapshot.data().id_p1);
        setIdP2(snapshot.data().id_p2);
      });

    } catch (err) {
      console.log(err);
    }

  }, []);

  const handleSelect1 = (event) => {
    if (color === 'default') {
      setColor('blue');
      setColorSelect('default');
      setGanador(visita);
    }
    else {
      setColor('default');
      setColorSelect('blue');
    }
  };

  const handleSelect2 = (event) => {
    if (colorSelect === 'default') {
      setColor('default');
      setColorSelect('blue');
      setGanador(local);
    }
    else {
      setColor('blue');
      setColorSelect('default');
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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

  const handleDuracion = function(h, m) {
    if(h<10) h='0'+h;
    if(m<10) m='0'+m;

    return (h+':'+m+' hrs');
  };

	const handleSubmit = async () => {
    // Datos del partido.
    var puntos_local = 0;
    var puntos_visita = 0;

    set1 > set1B ? puntos_local++ : puntos_visita++;
    set2 > set2B ? puntos_local++ : puntos_visita++;
    if (set3 != 0 && set3B != 0)
      set3 > set3B ? puntos_local++ : puntos_visita++;

    if (sets == 5) {
      if (set4 != 0 && set4B != 0)
        set4 > set4B ? puntos_local++ : puntos_visita++;
      if (set5 != 0 && set5B != 0)
        set5 > set5B ? puntos_local++ : puntos_visita++;
    }

    var duracion = handleDuracion(horas, minutos);

    var isFinal = false;
    
    if(rondaAsociada == 0) {
      isFinal = true;
      console.log('Es final');
    }

    const actualizarTorneo = async (id, datos) => {
      await updateTorneo(id, datos)
      .then(() => {
        console.log('Succes');
        props.onOpen();
      }).catch(err => {
        console.log('error', err);
      });
    };

    const data = { 
      set1: [set1, set1B],
      set2: [set2, set2B],
      set3: [set3, set3B],
      set4: [set4, set4B],
      set5: [set5, set5B],
      ganador,
      puntos_local,
      puntos_visita,
      duracion,
      estado: 'Terminado'
    };
    console.log(idPartido, data);
    await updatePartido(idPartido, data)
    .then(() => {
      console.log('Succes');
      if (isFinal) {
        const datos = { ganador, estado: "Terminado" }; 
        actualizarTorneo(idTorneo, datos);
      }
    }).catch(err => {
      console.log('error', err);
    });
    
    var dataAsociado;
    if (localAsociado) {
      dataAsociado = {
        bandera1: bandera1,
        id_p1: idP1,
        local: local
      };
    } else {
      dataAsociado = {
        bandera2: bandera2,
        id_p2: idP2,
        visita: visita
      };
    }

    const actualizar = async (id, datos) => {
      await updatePartido(id, datos)
      .then(() => {
        console.log('Succes');
        props.onOpen();
      }).catch(err => {
        console.log('error', err);
      });;
    };

    if (!isFinal) {
      db.collection('partidos')
      .where('id_torneo', '==', idTorneo)
      .where('ronda', '==', rondaAsociada)
      .where('numero', '==', partidoAsociado)
      .get().then(query => {
        query.forEach(doc => {
          actualizar(doc.id, dataAsociado);
        });
      }).catch(error => {
        console.log("Error getting documents: ", error);
      });
    }

    props.onClose();
  }
  
  const steps = ['Marcador', 'Datos del partido'];

	const node = (
		<div>
			<Dialog
				fullScreen={ fullScreen }
				open={ open }
				onClose={ props.onClose }
			>
        <DialogTitle id="form-dialog-title">
					<Typography className={classes.dialogTitle}>
							Registrar resultados
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
                Marcador
              </Typography>
            </Grid>
            <ValidatorForm onSubmit={ handleNext }>
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={6} sm={5} justify="center">
                  <Typography className={ classes.nombres }>
                    { local }
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={5} justify="center">
                  <Typography className={ classes.nombres }>
                    { visita }
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined" margin="normal"
                    label="Set 1" placeholder="Set 1"
                    value={ set1 }
                    onChange={ e => setSet1(e.target.value) }
                    validators={['maxNumber:7', 'isNumber']}
                    errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    required fullWidth autoFocus
                  />
                </Grid>
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined" margin="normal"
                    label="Set 1" placeholder="Set 1"
                    value={ set1B }
                    onChange={ e => setSet1B(e.target.value) }
                    validators={['maxNumber:7', 'isNumber']}
                    errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    required fullWidth
                  />
                </Grid>

                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined" margin="normal"
                    label="Set 2" placeholder="Set 2"
                    value={ set2 }
                    onChange={ e => setSet2(e.target.value) }
                    validators={['maxNumber:7', 'isNumber']}
                    errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    required fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined" margin="normal" label="Set 2"
                    placeholder="Set 2"
                    value={ set2B }
                    onChange={ e => setSet2B(e.target.value) }
                    validators={['maxNumber:7', 'isNumber']}
                    errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    required fullWidth
                  />
                </Grid>

                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined" margin="normal"
                    label="Set 3" placeholder="Set 3"
                    value={ set3 }
                    onChange={ e => setSet3(e.target.value) }
                    validators={['maxNumber:7', 'isNumber']}
                    errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    fullWidth required
                  />
                </Grid>
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined" margin="normal" 
                    label="Set 3" placeholder="Set 3"
                    value={ set3B }
                    onChange={ e => setSet3B(e.target.value) }
                    validators={['maxNumber:7', 'isNumber']}
                    errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    fullWidth required
                  />
                </Grid>

                { sets == 5 &&
                  <Grid item xs={6} sm={5} justify="center">
                    <TextValidator
                      variant="outlined" margin="normal"
                      label="Set 4" placeholder="Set 4" fullWidth
                      value={ set4 }
                      onChange={ e => setSet4(e.target.value) }
                      validators={['maxNumber:7', 'isNumber']}
                      errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    />
                  </Grid>
                }
                { sets == 5 &&
                  <Grid item xs={6} sm={5} justify="center">
                    <TextValidator
                      variant="outlined" margin="normal"
                      label="Set 4" placeholder="Set 4" fullWidth
                      value={ set4B }
                      onChange={ e => setSet4B(e.target.value) }
                      validators={['maxNumber:7', 'isNumber']}
                      errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    />
                  </Grid>
                }
                { sets == 5 &&
                  <Grid item xs={6} sm={5} justify="center">
                    <TextValidator
                      variant="outlined" margin="normal"
                      label="Set 5" placeholder="Set 5" fullWidth
                      value={ set5 }
                      onChange={ e => setSet5(e.target.value) }
                      validators={['maxNumber:7', 'isNumber']}
                      errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    />
                  </Grid>
                }
                { sets == 5 &&
                  <Grid item xs={6} sm={5} justify="center">
                    <TextValidator
                      variant="outlined" margin="normal"
                      label="Set 5" placeholder="Set 5" fullWidth
                      value={ set5B }
                      onChange={ e => setSet5B(e.target.value) }
                      validators={['maxNumber:7', 'isNumber']}
                      errorMessages={['Puntos máximos: 7', 'Ingrese números']}
                    />
                  </Grid>
                }

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
            <Grid item xs={6} justify="center">
              <Typography className={classes.title}>
                Datos del partido
              </Typography>
            </Grid>
            <Grid item xs={2} justify="center">
              <Typography className={classes.title}>
                {"\n"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography className={ classes.text }>
                Seleccione al ganador
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} justify="center">
              <div className={classes.items}>
                <StyledButton color={colorSelect} onClick={ handleSelect2 } fullWidth>
                  {local}
                </StyledButton>
                &nbsp;
                <StyledButton color={color} fullWidth onClick={ handleSelect1 }>
                {visita}
              </StyledButton>
              </div>
            </Grid>

            <Grid item xs={12} justify="center">
              <Typography className={classes.title} align="center" gutterBottom>
                {" "}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={10}>
              <Typography className={ classes.text }>
                Duración del partido
              </Typography>
            </Grid>
            <ValidatorForm onSubmit={ handleAccept }>
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined" margin="normal"
                    label="Horas" placeholder="00" 
                    value={ horas }
                    onChange={ e => setHoras(e.target.value) }
                    validators={
                      ['minNumber:0', 'maxNumber:6', 'isNumber']
                    }
                    errorMessages={
                      ['Ingrese una hora válida.', 'Ingrese una hora válida.', 'Ingrese números']
                    }
                    fullWidth required
                  />
                </Grid>
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined" margin="normal"
                    label="Minutos" placeholder="00" 
                    value={ minutos }
                    onChange={ e => setMinutos(e.target.value) }
                    validators={
                      ['minNumber:0', 'maxNumber:60', 'isNumber']
                    }
                    errorMessages={
                      ['Ingrese minutos válidos.', 'Ingrese minutos válidos.', 'Ingrese números']
                    }
                    fullWidth required
                  />
                </Grid>
                <Grid item xs={12} justify="center">
                  <Typography className={classes.title} align="center" gutterBottom>
                    {"\n"}
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
                    Guardar
                  </Button>
                </Grid>
                <Grid item xs={6} sm={5}>
                  <Button
                    fullWidth
                    className={ classes.buttonCan }
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