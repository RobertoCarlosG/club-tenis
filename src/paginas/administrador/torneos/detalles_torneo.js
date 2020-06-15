import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

import {
  useParams
} from 'react-router-dom';

import Detalles from './componentes/detalles';
import PartidosTorneo from './componentes/partidos';
import Participantes from './componentes/participantes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  icon: {
    color: theme.palette.text.primary
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
        <Box p={3} border={1} 
          borderColor="#979797" 
          borderRadius="0px 0px 5px 5px" 
          bgcolor="#FFF"
        >
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

function createD(nombre, edad, federacion, puntos, rank, av) {
  return { nombre, edad, federacion, puntos, rank, av };
}

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DetallesTorneo = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const { idTorneo } = useParams();

  const [value, setValue] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={ classes.root }>
      <Container maxWidth="lg">
        <IconButton 
          aria-label="volver" 
          size="medium"
          onClick={ handleBack }
        >
          <ArrowBackIcon className={classes.icon} />
        </IconButton>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} sm={12} justify="center">
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
                <Detalles idTorneo={idTorneo} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <PartidosTorneo 
                  idTorneo={idTorneo} 
                  onOpen={() => setOpenAlert(true)}
                  />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Participantes idTorneo={idTorneo} />
              </TabPanel>
            </SwipeableViews>
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
          Partido modificado.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DetallesTorneo;