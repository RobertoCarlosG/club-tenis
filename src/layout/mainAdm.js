import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { SidebarAdm, Topbar } from './componentes';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const MainAdm = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery( theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

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
        tipoUsuario="Administrador"
        nombre="Felipe Juan Froilán"
      />
      <SidebarAdm
        onClose={ handleSidebarClose }
        open={ shouldOpenSidebar }
        variant={ isDesktop ? 'persistent' : 'temporary' }
      />
      <main className={ classes.content }>
        { children }
      </main>
    </div>
  );
};

MainAdm.propTypes = {
  children: PropTypes.node
};

export default MainAdm;