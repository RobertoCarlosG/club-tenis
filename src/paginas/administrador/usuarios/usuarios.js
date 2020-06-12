import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { db, updateUsuario } from '../../../servicios/firebase';
import {
  Button, Grid, Container, Paper, Table, 
  Typography, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton, Snackbar,
  Avatar, Dialog, DialogContent, DialogTitle,
  DialogActions
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';

import RegistrarUsuario from './registrarUsuario';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  btn: {
    padding: theme.spacing(1),
		textTransform: 'none',
    fontSize: 18,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
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
  text: {
    textTransform: 'none',
    fontSize: 18,
    textAlign: 'center'
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Usuarios = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const usuariosRef = db.collection('usuarios')
    .where('estado', '>', '1');

    usuariosRef.onSnapshot(sanpshot => {
      const info = [];

      sanpshot.forEach(usuario => {
        const data = usuario.data();

        info.push({
          ...data,
          id: usuario.id,
        });
      });
      
      setUsuarios(info);
    });
  }, []);

  const registrarUsuario = () => {
    setOpen(true);
  }

  const handleDelete = (id) => {
    console.log(id);
    setSelectedId(id);
    setConfirm(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert2(false);
  };

  const handleCancel = () => {
    setConfirm(false);
  };

  const handleOk = () => {
    const data = { "estado": "1" };
    try {
      updateUsuario(selectedId, data);
      setOpenAlert2(true);
    } catch (error) {
      console.log(error);
    }
    setConfirm(false);
  };

  return (
    <div className={ classes.root }>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              fullWidth 
              className={ classes.btn } 
              variant="contained"
              onClick={ registrarUsuario }
              color="secondary"
              startIcon={ <AddIcon /> }
            >
              Registrar usuario
            </Button>
          </Grid>
          <br />
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      Nombre
                    </StyledTableCell>
                    <StyledTableCell align="center">Cargo</StyledTableCell>
                    <StyledTableCell align="center">Correo</StyledTableCell>
                    <StyledTableCell align="center">Edad</StyledTableCell>
                    <StyledTableCell align="center">Sexo</StyledTableCell>
                    <StyledTableCell align="center">Eliminar</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuarios.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row" align="center">
                        <div className={classes.nameContainer}>
                          &nbsp;&nbsp;&nbsp;
                          <Avatar src={row.imagen} />
                          &nbsp;&nbsp;&nbsp;
                          <Typography variant="body1">
                            {row.nombre}&nbsp;{row.apellido}
                          </Typography>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.tipo}</StyledTableCell>
                      <StyledTableCell align="center">{row.correo}</StyledTableCell>
                      <StyledTableCell align="center">{row.edad}</StyledTableCell>
                      <StyledTableCell align="center">{row.sexo}</StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton 
                          onClick={ () => handleDelete(row.id) }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Snackbar 
        open={openAlert} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={ {vertical: 'top', horizontal: 'center'}}
      >
        <Alert onClose={handleClose} severity="success">
          Usuario creado.
        </Alert>
      </Snackbar>
      <Snackbar 
        open={openAlert2} 
        autoHideDuration={6000} 
        onClose={handleClose2}
        anchorOrigin={ {vertical: 'top', horizontal: 'center'}}
      >
        <Alert onClose={handleClose2} severity="success">
          Usuario eliminado.
        </Alert>
      </Snackbar>
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
              ¿Está seguro de que desea eliminar este usuario?
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
      {open &&
        <RegistrarUsuario 
          onClose={()=> setOpen(false)}
          onOpen={() => setOpenAlert(true)}
        />
      }
    </div>
  );
}

export default Usuarios;