import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import logo from '../../../imagenes/Logo8.svg';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#FFF',
    color: '#000',
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

const Topbar = props => {
  const { className, onSidebarOpen, tipoUsuario, nombre, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <img
          alt="Logo"
          src={ logo }
          height={ 55 }
        />
        <Typography variant="h6" noWrap className={ classes.title } align="center">
          { tipoUsuario }
        </Typography>
        <Hidden mdDown>
          <IconButton>
            <AccountCircleIcon />
            &nbsp;
            <Typography variant="h6" noWrap className={ classes.txt }>
              { nombre }
            </Typography>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;