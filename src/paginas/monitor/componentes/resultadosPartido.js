import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
  Dialog, DialogContent, DialogTitle,
  Grid, Paper, Typography, Button,
  useMediaQuery, Divider, Radio,
  RadioGroup, FormControlLabel,
  FormControl, FormLabel
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { updatePartido, db } from '../../../servicios/firebase';

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
      margin: theme.spacing(1),
      padding: theme.spacing(1),
			minWidth: 100,
	},
	selectEmpty: {
		marginTop: theme.spacing(1),
		width: 'auto'
	},
	form: {
		margin: theme.spacing(1, 1, 1),
	},
	buttonCan: {
		padding: theme.spacing(1, 0, 1),
		textTransform: 'none',
		backgroundColor: '#FFF',
		borderRadius: '5px',
		color: '#000',
    borderColor: '#192D3E',
    fontSize: 16,
		'&:hover': {
			backgroundColor: '#C4C4C4',
		}
	},
	buttonAccept:{
		padding: theme.spacing(1, 0, 1),
		textTransform: 'none',
		backgroundColor: '#192D3E',
    borderRadius: '5px',
    fontSize: 16,
		'&:hover': {
			backgroundColor: '#3A4750',
		}
  },
  title: {
    color: theme.palette.common.black,
    fontSize: 18,
    textTransform: 'none',
    alignItems: 'center',
  },
}));

export default function ResultadosPartido(props) {
	const classes = useStyles();
	const theme = useTheme();

	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { idPartido } = props;

  const [open] = useState(true);
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

  useEffect(() => {
    try {
      const partidoRef = db.collection('partidos').doc(idPartido);
      console.log('id', idPartido);

      partidoRef.onSnapshot( snapshot => {
        console.log(snapshot.data());
        setLocal(snapshot.data().local);
        setVisita(snapshot.data().visita);
        setSets(snapshot.data().setsMax);
      });

    } catch (err) {
      console.log(err);
    }

  }, []);

  const handleChange = (event) => {
    setGanador(event.target.value);
  };

	const handleClose = () => {
    props.onClose();
	};

	const handleSubmit = async () => {
    console.log('ganador', ganador);
    if (sets == 3) {
      const data = { 
        set1: [set1, set1B],
        set2: [set2, set2B],
        set3: [set3, set3B],
        ganador
      };
      console.log(idPartido, data);
		  await updatePartido(idPartido, data);
    } else if (sets == 5) {
      const data = { 
        set1: [set1, set1B],
        set2: [set2, set2B],
        set3: [set3, set3B],
        set4: [set4, set4B],
        set5: [set5, set5B],
        ganador
      };
      console.log(idPartido, data);
      await updatePartido(idPartido, data);
    }

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
					<Typography component="h1" variant="h6" align="center">
							Partido
					</Typography>
				</DialogTitle>
				<Divider variant='middle'/>
				<DialogContent>
          <br />
          <ValidatorForm onSubmit={ handleSubmit }>
            <Grid container spacing={1} justify="space-evenly" alignItems="center">
              <Grid item xs={6} sm={5} justify="center">
                <Typography className={ classes.title }>
                  { local }
                </Typography>
              </Grid>
              <Grid item xs={6} sm={5} justify="center">
                <Typography className={ classes.title }>
                  { visita }
                </Typography>
              </Grid>
              <Grid item xs={6} sm={5} justify="center">
								<TextValidator
									variant="outlined"
									margin="normal"
									id="nombre"
									label="Set 1"
									placeholder="Set 1"
									value={ set1 }
									onChange={ e => setSet1(e.target.value) }
									validators={['required', 'isNumber']}
									errorMessages={['Este campo es requerido', 'Ingrese números']}
									required
									fullWidth
									autoFocus
								/>
              </Grid>
              <Grid item xs={6} sm={5} justify="center">
								<TextValidator
									variant="outlined"
									margin="normal"
									id="nombre"
									label="Set 1"
									placeholder="Set 1"
									value={ set1B }
									onChange={ e => setSet1B(e.target.value) }
									validators={['required', 'isNumber']}
									errorMessages={['Este campo es requerido', 'Ingrese números']}
									required
									fullWidth
								/>
              </Grid>
              <Grid item xs={6} sm={5} justify="center">
                <TextValidator
									variant="outlined"
									margin="normal"
									id="Set 2"
									label="Set 2"
									placeholder="Set 2"
									value={ set2 }
									onChange={ e => setSet2(e.target.value) }
									validators={['required', 'isNumber']}
									errorMessages={['Este campo es requerido', 'Ingrese números']}
									required
									fullWidth
								/>
              </Grid>
              <Grid item xs={6} sm={5} justify="center">
                <TextValidator
									variant="outlined"
									margin="normal"
									id="Set 2"
									label="Set 2"
									placeholder="Set 2"
									value={ set2B }
									onChange={ e => setSet2B(e.target.value) }
									validators={['required', 'isNumber']}
									errorMessages={['Este campo es requerido', 'Ingrese números']}
									required
									fullWidth
								/>
              </Grid>
              <Grid item xs={6} sm={5} justify="center">
                <TextValidator
									variant="outlined"
									margin="normal"
									id="Set 3"
									label="Set 3"
									placeholder="Set 3"
									value={ set3 }
									onChange={ e => setSet3(e.target.value) }
									validators={['required', 'isNumber']}
									errorMessages={['Este campo es requerido', 'Ingrese números']}
									required
									fullWidth
								/>
							</Grid>
              <Grid item xs={6} sm={5} justify="center">
                <TextValidator
									variant="outlined"
									margin="normal"
									id="Set 3"
									label="Set 3"
									placeholder="Set 3"
									value={ set3B }
									onChange={ e => setSet3B(e.target.value) }
									validators={['required', 'isNumber']}
									errorMessages={['Este campo es requerido', 'Ingrese números']}
									required
									fullWidth
								/>
							</Grid>
              { sets == 5 &&
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    id="Set 4"
                    label="Set 4"
                    placeholder="Set 4"
                    value={ set4 }
                    onChange={ e => setSet4(e.target.value) }
                    validators={['required', 'isNumber']}
                    errorMessages={['Este campo es requerido', 'Ingrese números']}
                    required
                    fullWidth
                  />
                </Grid>
              }
              { sets == 5 &&
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    id="Set 4"
                    label="Set 4"
                    placeholder="Set 4"
                    value={ set4B }
                    onChange={ e => setSet4B(e.target.value) }
                    validators={['required', 'isNumber']}
                    errorMessages={['Este campo es requerido', 'Ingrese números']}
                    required
                    fullWidth
                  />
                </Grid>
              }
              { sets == 5 &&
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    id="Set 5"
                    label="Set 5"
                    placeholder="Set 5"
                    value={ set5 }
                    onChange={ e => setSet5(e.target.value) }
                    validators={['required', 'isNumber']}
                    errorMessages={['Este campo es requerido', 'Ingrese números']}
                    required
                    fullWidth
                  />
                </Grid>
              }
              { sets == 5 &&
                <Grid item xs={6} sm={5} justify="center">
                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    id="Set 5"
                    label="Set 5"
                    placeholder="Set 5"
                    value={ set5B }
                    onChange={ e => setSet5B(e.target.value) }
                    validators={['required', 'isNumber']}
                    errorMessages={['Este campo es requerido', 'Ingrese números']}
                    required
                    fullWidth
                  />
                </Grid>
              }
              <Grid item xs={12} sm={4} justify="center" alignItems="center">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Ganador</FormLabel>
                  <RadioGroup 
                    aria-label="gender" 
                    name="gender1" 
                    value={ganador} 
                    onChange={handleChange}
                  >
                    <FormControlLabel value={local} control={<Radio />} label={local} />
                    <FormControlLabel value={visita} control={<Radio />} label={visita} />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} />
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
          <br />
				</DialogContent>
			</Dialog>
		</div>
	);
	return ReactDOM.createPortal(node,document.getElementById('modal-root'));
}