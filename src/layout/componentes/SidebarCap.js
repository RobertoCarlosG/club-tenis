import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HistoryIcon from '@material-ui/icons/History';
import SidebarNav from './SidebarNav';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  divider: {
    margin: theme.spacing(0, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const SidebarCap = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Inscripciones',
      href: '/capturista',
      icon: <AssignmentIcon style={{ color: '#FFF' ,}} />
    },
    {
      title: 'Historial',
      href: '/capturista/historial',
      icon: <HistoryIcon style={{ color: '#FFF' ,}} />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={ onClose }
      open={ open }
      variant={ variant }
    >
      <div
        { ...rest }
        className={ clsx(classes.root, className) }
      >
        <SidebarNav
          className={ classes.nav }
          pages={ pages }
        />
      </div>
    </Drawer>
  );
};

SidebarCap.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default withRouter(SidebarCap);