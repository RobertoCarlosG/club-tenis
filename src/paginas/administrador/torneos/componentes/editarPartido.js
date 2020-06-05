import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';

import { updatePartido } from '../../../../servicios/firebase';

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
}));

export default function EditarPartido(props) {
	const classes = useStyles();
	const theme = useTheme();

	// const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { id } = props;

  const [open] = useState(true);
  const [hora, setHora] = useState(new Date('2020-08-18T21:11:54'));
  const [fecha, setFecha] = useState(new Date('2020-08-18T21:11:54'));
  // const [hora, setHora] = useState('12:00');

	const handleDateChange = (date) => setFecha(date);
  
  const handleTimeChange = (date) => setHora(date);

	const handleClose = () => {
    props.onClose();
	};

  const curday = function(sp){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
  };

	const handleSubmit = async () => {
    const hours = hora.getHours().toString().padStart(2, "0");
    const minutes = hora.getMinutes().toString().padStart(2, "0")
    const textHora = hours+':'+minutes+' hrs.';
 
    const textFecha = curday('/');

		const data = { 
      fecha: textFecha,
      hora: textHora
    };
		console.log(id, data);
		await updatePartido(id, data);

    props.onClose();
	}

	const node = (
		<div>
			<Dialog
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
						<Grid container spacing={3} justify="center" alignItems="center">
							<MuiPickersUtilsProvider className={classes.formControl} utils={DateFnsUtils}>
								<Grid item xs={12} sm={10} justify="center">
									<KeyboardDatePicker
										disableToolbar
										fullWidth
										inputVariant="outlined"
										variant="inline"
										format="MM/dd/yyyy"
										margin="normal"
										id="Fecha"
										label="Fecha"
										minDate={ Date.now() }
										value={ fecha }
										onChange={ handleDateChange }
										KeyboardButtonProps={{
												'aria-label': 'change date',
										}}
									/>
								</Grid>
                <Grid item xs={12} sm={10} justify="center">
                  <KeyboardTimePicker
                    fullWidth
                    inputVariant="outlined"
                    margin="normal"
                    id="time-picker"
                    label="Hora"
                    inputMode="24h"
                    value={ hora }
                    onChange={ handleTimeChange }
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid>
							</MuiPickersUtilsProvider>
							<Grid item xs={6} sm={5} justify="center">  
                <Button
                  fullWidth
                  type="submit"
                  className={classes.buttonAccept}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
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
            <br />
				</DialogContent>
        <br />
			</Dialog>
		</div>
	);
	return ReactDOM.createPortal(node,document.getElementById('modal-root'));
}