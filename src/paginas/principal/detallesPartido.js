import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { db } from '../../servicios/firebase/index'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title:{
      fontSize: 24,
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
}));

export default function DetallesPartido(props) {
    const { idPartido, ronda, hora, lugar,local,visita,
        duracion, ...rest } = props;
	const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open] = useState(true);

  const handleClose = () => {
    setOpen(false);
};

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
							Resultados
					</Typography>
				</DialogTitle>
				<Divider variant='middle'/>
				<DialogContent>
                <Grid container direction='row' justify='center'>
                    <Grid container direction='row' justify='center' alingItems='center'>
                        <Grid item xs>
                            <Typography className={ classes.title}>
                                { local } Vs { visita }
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justify='space-evenly' alingItems='center'>
                        <Grid item xs={4}>
                            <Typography className={ classes.title}>
                                { local } Vs { visita }
                            </Typography>
                        </Grid>
                    </Grid>
                    
            {/*BOTON CERRAR */}
                    <Grid container direction="row" justify="center" alingItems="center">
                        <Grid item xs={3}>
                            <Button 
                            onClick={ props.onClose() }
                            styles={{backgroundColor:'#039BE5',color:'#FFF'}}>
                                Cerrar
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
				</DialogContent>
			</Dialog>
		</div>
	);
	return ReactDOM.createPortal(node,document.getElementById('modal-root'));
}