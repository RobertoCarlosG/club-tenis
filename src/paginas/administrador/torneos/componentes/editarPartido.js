import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button, Dialog, DialogContent, DialogTitle, 
  useMediaQuery, Grid, Typography, DialogActions,
  Divider,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';

import { updatePartido, db } from '../../../../servicios/firebase';

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
  text: {
    textTransform: 'none',
    fontSize: 18,
    textAlign: 'center'
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

export default function EditarPartido(props) {
	const classes = useStyles();
	const theme = useTheme();

	// const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { id } = props;

  const [open] = useState(true);
  const [hora, setHora] = useState(new Date());
  const [fecha, setFecha] = useState(new Date());
  const [confirm, setConfirm] = useState(false);

	const handleDateChange = (date) => setFecha(date);
  
  const handleTimeChange = (date) => setHora(date);

  const handleAccept = () => {
    setConfirm(true);
  }

	const handleClose = () => {
    props.onClose();
  };
  
  const handleOk = () => {
    handleSubmit();
    setConfirm(false);
  };

  const handleCancel = () => {
    setConfirm(false);
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
    await updatePartido(id, data)
    .then( () => {
      props.onOpen();
      console.log('Succes');
    }).catch(err => {
      console.log('Error', err.message);
    });

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
					<Typography className={classes.dialogTitle} align="center">
							Partido
					</Typography>
				</DialogTitle>
        <Divider />
				<DialogContent>
          <br />
						<Grid container spacing={3} justify="center" alignItems="center">
							<MuiPickersUtilsProvider className={classes.formControl} utils={DateFnsUtils}>
								<Grid item xs={12} sm={8} justify="center">
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
                <Grid item xs={12} sm={8} justify="center">
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
              <Grid item xs={12} justify="center">
                <Typography align="center">
                  {"\n"}
                </Typography>
              </Grid>
							<Grid item xs={6} sm={4} justify="center">  
                <Button
                  fullWidth
                  type="submit"
                  className={classes.buttonAccept}
                  variant="contained"
                  color="primary"
                  onClick={ handleAccept }
                >
                  Guardar
                </Button>
							</Grid>
							<Grid item xs={6} sm={4} justify="center">
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
            <br />
				</DialogContent>
        <br />
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