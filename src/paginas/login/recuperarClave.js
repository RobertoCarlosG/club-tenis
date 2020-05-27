import React from 'react';
import ReactDOM from 'react-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(2, 2, 2),
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
}));

export default function Recuperar(props) {
  const classes = useStyles();
  const theme = useTheme();

  const { onClose } = props;

  const [open] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleReset = () => {
    props.onClose();
  };

  const node = (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <br />
        <DialogTitle id="responsive-dialog-title">
          <Typography component="h1" variant="h4" align="center">
            {"Recuperar contraseña"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Un correo se enviará a la dirección que 
            proporcione.
          </DialogContentText>
          <ValidatorForm onSubmit={handleReset}>
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
            <br /><br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Aceptar
            </Button>
            <br /><br />
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );

  return ReactDOM.createPortal(node, document.getElementById('modal-root'));
}