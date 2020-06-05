import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import { AuthContext } from '../contexto/auth';
import { db } from '../servicios/firebase';
import { SidebarMonitor, Topbar, Footer } from './componentes';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    }
  },
  shiftContent: {
    paddingTop: 16,
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const MainMonitor = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery( theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);
  const [nombre, setNombre] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  useEffect(() => {
      try {
          const usuariosRef = db.collection('usuarios').doc(currentUser.id);

          usuariosRef.onSnapshot( snapshot => {
              setNombre(snapshot.data().nombre+' '+snapshot.data().apellido);
          });

      } catch (err) {
          console.log('Error:', err);
      }
  });

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar 
        onSidebarOpen={ handleSidebarOpen }
        tipoUsuario="Monitor"
        nombre={ nombre }
      />
      <SidebarMonitor
        onClose={ handleSidebarClose }
        open={ shouldOpenSidebar }
        variant={ isDesktop ? 'persistent' : 'temporary' }
      />
      <Container>
      
        { children }
        <Footer />
      
      </Container>
    </div>
  );
};

MainMonitor.propTypes = {
  children: PropTypes.node
};

export default MainMonitor;