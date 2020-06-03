import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
/*
import Divider from '@material-ui/core/Divider';
    <ListItem button>
    <ListItemIcon>
        <DashboardIcon style={{ color: '#192D3E' }} />
      </ListItemIcon>
      <ListItemText primary="Opciones" />
    </ListItem>
    <Divider />

*/

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon style={{ color: '#FFF' }} />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon style={{ color: '#FFF' }} />
      </ListItemIcon>
      <ListItemText primary="Torneos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon style={{ color: '#FFF' }} />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>
  </div>
);
