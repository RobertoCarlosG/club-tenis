import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
  Dialog, DialogContent, DialogTitle,
  Grid, Paper, Typography, Button,
  useMediaQuery, Divider, Radio,
  RadioGroup, FormControlLabel,
  FormControl, FormLabel
} from '@material-ui/core';
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

export default function Abandono(props) {
	const classes = useStyles();
	const theme = useTheme();

	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { idPartido } = props;

  const [open] = useState(true);
  const [local, setLocal] = useState('');
  const [visita, setVisita] = useState('');
  const [ganador, setGanador] = useState('');
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    try {
      const partidoRef = db.collection('partidos').doc(idPartido);
      console.log('id', idPartido);

      partidoRef.onSnapshot( snapshot => {
        console.log(snapshot.data());
        setLocal(snapshot.data().local);
        setVisita(snapshot.data().visita);
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
    const data = {
      ganador
    };
    console.log(idPartido, data);
	  await updatePartido(idPartido, data);

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
              <Grid item xs={12} sm={10} justify="center">
								<TextValidator
									variant="outlined"
									margin="normal"
									id="nombre"
									label="Motivo"
									placeholder="Motivo"
									value={ motivo }
									onChange={ e => setMotivo(e.target.value) }
									validators={['required']}
									errorMessages={['Este campo es requerido']}
									required
									fullWidth
									autoFocus
								/>
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