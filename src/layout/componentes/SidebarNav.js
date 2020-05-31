import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: '#fff',
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: '#62C1EF',
    }
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    background: theme.palette.secondary.main,
    color: '#FFF',
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ ref }
    style={{ flexGrow: 1 }}
  >
  { /* Rivisar esto. */ }
    <RouterLink { ...props } />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;
  const classes = useStyles();

  return (
    <List
      { ...rest }
      className={ clsx(classes.root, className) }
    >
      { pages.map(page => (
        <ListItem
          className={ classes.item }
          disableGutters
          key={ page.title }
        >
          <Button
            activeClassName={ classes.active }
            className={ classes.button }
            component={ CustomRouterLink }
            to={ page.href }
          >
            &nbsp;&nbsp;&nbsp;
            <div className={ classes.icon }>{ page.icon }</div>
            { page.title }
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;