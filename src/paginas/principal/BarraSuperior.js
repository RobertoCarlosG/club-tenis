import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Button } from '@material-ui/core';
import logo from '../../imagenes/Logo11.PNG';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#192D3E',
    color: '#FFF',
  },
  title: {
    flexGrow: 1,
  },
  txt: {
    flexGrow: 1,
    textTransform: 'none',
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));


const useStyles2 = makeStyles(theme => ({
  root: {
    background: '#192D3E',
    color: '#FFF',
  },
  title: {
    flexGrow: 1,
  },
  txt: {
    flexGrow: 1,
    textTransform: 'none',
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  btn_activo1:{
    backgroundColor: '#192E3F'
  },
}));


const Topbar = props => {
  const { className, nombre, ...rest } = props;
  const classes = useStyles(); 
  const history = useHistory();

  const handleRanking = () => {
    const ruta = '/inicio/ranking';
    history.push(ruta);
}


  const handleLogin = () => {
    const ruta = '/login';
    history.push(ruta);
  };

  const goindex = () => {
    const ruta = '/inicio';
    history.push(ruta);
  };

  const welcome = () => {
    const ruta = '/';
    history.push(ruta);
  };

  return (
    <AppBar
      { ...rest }
      className={ clsx(classes.root, className) }
      position="fixed"
    >
      <Toolbar>
      <img
          alt="Logo"
          src={ logo }
          height={ 54 }
          onClick={ welcome }
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button color="inherit" onClick={ goindex } className={classes.btn_activo1}>Torneos</Button>
        <Button color="inherit" onClick={ handleRanking }>Ranking</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button color="inherit" styles={{position:'left'}} onClick={ handleLogin }>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;