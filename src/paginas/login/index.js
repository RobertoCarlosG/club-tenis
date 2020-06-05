import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from "react-router";
import { AuthContext } from '../../contexto/auth'
import { auth, db } from '../../servicios/firebase/setup'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Recuperar from './recuperarClave';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function cambiarFondo() {
  document.body.style = 'background: linear-gradient(180deg, rgba(3, 155, 229, 0.15) 0%, rgba(255, 255, 255, 0) 100%), #192D3E;';
}

function Notify(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(4),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: '#192D3E',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    textTransform: 'none',
    backgroundColor: '#192D3E',
    fontSize: 22,
    padding: theme.spacing(1, 0, 1),
    '&:hover': {
      backgroundColor: '#3A4750',
    }
  },
  link: {
    margin: theme.spacing(1, 0, 1),
    textTransform: 'none',
    fontStyle: 'normal',
    fontSize: 20,
    padding: theme.spacing(1, 0, 1),
  },
  text: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  title:{
    fontSize: 36,
    textTransform: 'none',
  },
}));

const Autenticarse = ({ history }) => {
  const classes = useStyles();
  cambiarFondo();

  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        var user = auth.currentUser;
        var uid, tipo;
        if (user != null) {
          uid = user.uid;
          
          const usuarios = db.collection('usuarios').doc(uid);
          usuarios.get().then(doc => {
            if (doc.exists) {
              tipo = doc.data().tipo;
              
              if(tipo == 'administrador') {
                history.push('/administrador');
                console.log('Logeado: ', tipo);
              }

            }
          }).catch(err => {
            console.log('Error: ', err);
          });
        }
      } catch(error) {
        console.log(error);
        setOpen(true);
      }
    }, [history]
  );

  const { currentUser } = useContext(AuthContext);

  if(currentUser) {
    return <Redirect to="/administrador" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <br />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.title}>
          Iniciar sesión
        </Typography>
        <br />
        <ValidatorForm className={classes.form} 
          onSubmit={handleLogin}
        >
          <TextValidator
            variant="outlined"
            margin="normal"
            id="email"
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            name="email"
            autoComplete="email"
            value={email}
            onChange={ e => setEmail(e.target.value) }
            validators={['required', 'isEmail']}
            errorMessages={['Este campo es requerido', 'Correo no válido']}
            required
            fullWidth
            autoFocus
          />
          <br />
          <TextValidator
            variant="outlined"
            margin="normal"
            name="password"
            label="Contraseña"
            placeholder="Contraseña"
            id="password"
            autoComplete="current-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            onChange={ e => setPassword(e.target.value) }
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
            required
            fullWidth
          />
          <br />
          <Collapse in={open}>
            <br />
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Correo o contraseña invalido(s).
            </Alert>
          </Collapse>
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar sesión
          </Button>
        </ValidatorForm>
        <Button
          fullWidth
          color="primary"
          className={classes.link}
          onClick={() => {
            setDialog(true);
          }}
        >
          Olvidé mi contraseña
        </Button>
        <br /><br />
      </Paper>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Notify onClose={handleClose} severity="success">
          Solicitud realizada.
        </Notify>
      </Snackbar>

      <br />
      {dialog && 
        <Recuperar 
          onClose={() => setDialog(false)}
          onOpen={() => setOpenAlert(true)}
        />
      }
    </Container>
  );
};

export default withRouter(Autenticarse);