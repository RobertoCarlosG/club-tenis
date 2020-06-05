import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Paper,
  Typography, Button, CardMedia, Fab, Snackbar
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import MuiAlert from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import img from '../../../../imagenes/Logo5.svg';
import ModificarTorneo from '../modificar_torneo';
import { db } from '../../../../servicios/firebase/index';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  btnModificar: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
		'&:hover': {
			backgroundColor: '#3A4750',
		}
  },
  btnFinalizar: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
  },
  card: {
    background: theme.palette.primary.main,
  },
  card_title: {
    color: theme.palette.common.white,
    fontSize: 48,
    fontWeight: 600,
  },
  media: {
    maxWidth: '100%',
    height: 225,
    objectFit: 'contain',
  },
  mediaContent: {
    height: 225,
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
  },
  content: {
    height: 200,
    padding: 20,
    "&:last-child": {
      paddingBottom: 0
    },
  },
  content_2: {
    height: 45,
    paddingTop: theme.spacing(1),
    "&:last-child": {
      paddingBottom: 0
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  title: {
    color: theme.palette.common.black,
    fontSize: 24,
    textTransform: 'none',
  },
  title_2: {
    color: '#4CAF50',
    fontSize: 80,
    fontWeight: 500,
  },
  title_3: {
    color: '#F44336',
    fontSize: 80,
    fontWeight: 500,
  },
  titleAccept: {
    color: '#4CAF50',
    textTransform: 'none',
    fontSize: 24,
    fontWeight: 500,
  },
  titleDialog: {
    color: '#364756',
    textTransform: 'none',
    fontSize: 24,
    fontWeight: 500,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const Detalles = props => {
  const { className, idTorneo, ...rest } = props;
  const classes = useStyles();
  
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [nombre, setNombre] = useState('');
	const [categoria, setCategoria] = useState('');
	const [tipo, setTipo] = useState('');
	const [participantes, setParticipantes] = useState('');
	const [dateFin, setDateFin] = useState(new Date());
  const [dateInicio, setDateInicio] = useState(new Date());
  const [estado, setEstado] = useState('');

  useEffect(() => {
    try {
      const torneoRef = db.collection('torneos').doc(idTorneo);

      torneoRef.onSnapshot( snapshot => {
        console.log(snapshot.data());
        setNombre(snapshot.data().nombre);
        setCategoria(snapshot.data().categoria);
        setTipo(snapshot.data().tipo);
        setParticipantes(snapshot.data().participantes);
        setDateInicio(snapshot.data().fecha_inicio.toDate());
        setDateFin(snapshot.data().fecha_fin.toDate());
        setEstado(snapshot.data().estado);
      });
    } catch (err) {
      console.log(err);
    }

  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleOk = () => {
    setOpenDialog(false);
  };
  
  const handleModificarTorneo = () => {
    setOpen(true);
  };

  const handleFinalizarTorneo = () => {
    setOpenDialog(true);
  };

  return (
    <div className={ classes.root }>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} sm={3}>
          <Button
            fullWidth
            type="submit"
            className={ classes.btnModificar }
            variant="contained"
            color="primary"
            onClick={ handleModificarTorneo }
          >
            Mofificar torneo
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} >
          <Button
            fullWidth
            type="submit"
            className={classes.btnFinalizar}
            variant="contained"
            color="secondary"
            onClick={ handleFinalizarTorneo }
          >
            Finalizar torneo
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.card_title} noWrap align="center">
                { nombre }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.mediaContent}>
                <CardMedia
                  className={classes.media}
                  image={ img }
                  title="Cambiar imagen"
                />
                <Fab aria-label="Cambiar" className={classes.fab} color="secondary">
                  <ImageIcon />
                </Fab>
              </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card alignItems="center">
              <CardContent className={classes.content}>
                <Typography className={classes.title} align="center">
                  Fecha inicial
                </Typography>
                <Typography className={classes.title_2} align="center">
                  { dateInicio.getDate() }
                </Typography>
                <Typography className={classes.title} align="center">
                  { monthNames[dateInicio.getMonth()] } - { dateInicio.getFullYear() }
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card>
              <CardContent className={classes.content}>
                <Typography className={classes.title} align="center">
                  Fecha Final
                </Typography>
                <Typography className={classes.title_3} align="center">
                { dateFin.getDate() }
                </Typography>
                <Typography className={classes.title} align="center">
                { monthNames[dateFin.getMonth()] } - { dateFin.getFullYear() }
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card>
              <CardContent className={classes.content_2}>
                <Typography className={classes.title} align="center">
                  { categoria } - { tipo }
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card>
              <CardContent className={classes.content_2}>
                <Typography className={classes.title} align="center">
                  { participantes } Participantes
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" >
            <Card className={classes.borde}>
              <CardContent className={classes.content_2}>
                <Typography className={classes.title} align="center">
                  { estado }
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={openDialog}
      >
        <DialogTitle>
          <Typography className={classes.title} align="center">
            Finalizar torneo
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <br />
          <Typography className={classes.title} align="justify">
            ¿Está seguro de que desea finalizar el torneo?
          </Typography>
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk} color="primary">
            <Typography className={classes.titleAccept} align="center">
              Aceptar
            </Typography>
          </Button>
          <Button autoFocus onClick={handleCancel} color="primary">
            <Typography className={classes.titleDialog} align="center">
              Cancelar
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Torneo modificado.
        </Alert>
      </Snackbar>

      {open &&
        <ModificarTorneo 
          onClose={()=> setOpen(false)}
          onOpen={() => setOpenAlert(true)}
          idTorneo={ idTorneo }
          nombre={ nombre }
          categoria={ categoria }
          tipo={ tipo }
          participantes={ participantes }
          dateInicio={ dateInicio }
          dateFin={ dateFin }
        />
      }
    </div>
  );
};

Detalles.propTypes = {
  className: PropTypes.string
};

export default Detalles;