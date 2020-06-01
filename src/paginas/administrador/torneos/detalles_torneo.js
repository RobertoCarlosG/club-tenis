import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { IconButton } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import ModificarTorneo from './modificar_torneo';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  tabs: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(8),
  },
  btn: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
		'&:hover': {
			backgroundColor: '#3A4750',
		}
  },
  btn_2: {
		margin: theme.spacing(1, 0, 1),
		textTransform: 'none',
    borderRadius: '5px',
    fontSize: 18,
  },
  card_1: {
    background: theme.palette.primary.main,
  },
  card_title: {
    color: theme.palette.common.white,
    fontSize: 48,
    fontWeight: 600,
  },
  media: {
    maxWidth: '100%',
    height: 175,
    objectFit: 'contain',
  },
  content: {
    height: 175,
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
  },
  content_2: {
    height: 45,
    paddingTop: theme.spacing(1),
    "&:last-child": {
      paddingBottom: 0
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  title: {
    color: theme.palette.common.black,
    fontSize: 24,
  },
  title_2: {
    color: '#4CAF50',
    fontSize: 74,
    fontWeight: 500,
  },
  title_3: {
    color: '#F44336',
    fontSize: 74,
    fontWeight: 500,
  },
  borde: {
    border: 1,
    borderColor: '#000',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} border={1} borderColor="#979797" borderRadius="0px 0px 5px 5px" bgcolor="#FFF">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function createData(jugador1, jugador2, estado, fecha, hora) {
  return { jugador1, jugador2, estado, fecha, hora };
}

function createD(nombre, edad, federacion, puntos, rank, av) {
  return { nombre, edad, federacion, puntos, rank, av };
}

const rows = [
  createData('Roger Federer', 'Rafael Nadal', 'Sin iniciar', '06/15/2020', '12:00'),
  createData('Pete Sampras', 'Novak Djokovic', 'Sin iniciar', '06/15/2020', '12:00'),
  createData('Rod Laver', 'Bjorn Borg', 'Sin iniciar', '06/15/2020', '12:00'),
  createData('Ivan Lendl', 'Jimmy Connors', 'Sin iniciar', '06/15/2020', '12:00'),
];

const jug = [
  createD('Roger Federer', '34 años', 'ATP', '6630', '1', 'RF'),
  createD('Rafael Nadal', '35 años', 'ATP', '6600', '2', 'RN'),
  createD('Novak Djokovic', '32 años', 'ATP', '6500', '3', 'ND'),
  createD('Pete Sampras', '29 años', 'ATP', '6400', '4', 'PS'),
  createD('Rod Laver', '27 años', 'ATP', '6350', '5', 'RL'),
  createD('Bjorn Borg', '28 años', 'ATP', '6210', '6', 'BB'),
  createD('Ivan Lendl', '29 años', 'ATP', '6000', '7', 'IL'),
  createD('Jimmy Connors', '25 años', 'ATP', '5987', '8', 'JC'),
];

const Detalles = props => {
  const { children } = props;
  const [Xstate, setXstate] = React.useState(null);

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const handleModificarTorneo = () => {
    setXstate(1);
  };

  const editIcon = (
    <IconButton onClick={ console.log("Edit") }>
      <EventIcon />
    </IconButton>
  );

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div className={ classes.root }>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} sm={10} justify="center">
          <Paper square elevation={3}>
            <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="primary"
              onChange={handleChange}
              aria-label="tabs"
            >
              <Tab label="Detalles"/>
              <Tab label="Partidos" />
              <Tab label="Participantes" />
            </Tabs>
          </Paper>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              Hola
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Hola
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Hola
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
      {Xstate &&
        <ModificarTorneo 
          onClose={()=> setXstate(null)}

        />
      }
    </div>
  );
};

Detalles.propTypes = {
  children: PropTypes.node
};

export default Detalles;