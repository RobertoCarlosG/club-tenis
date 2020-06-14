import React, { useState, useEffect,useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { db } from '../../servicios/firebase';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {
  Grid, Paper, Tabs, Tab, Typography, Box,
  Card, CardContent, CardMedia, CardHeader,
  IconButton, Button, Container, Divider
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import img from '../../imagenes/Logo5.svg';
import Topbar from './BarraSuperior';
import { JugadorContext } from '../../contexto/ctx_participantes';

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
        <Box p={3}>
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

const useStyles = makeStyles(({ breakpoints, spacing, palette }) => ({
  root: {
    height: '100%',
    backgroundColor: '#E5E5E5',
  },
  paper: {
    flexGrow: 1,
  },
  paper_2:{
    margin: 'auto',
    borderRadius: '5px',
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  paper_item: {
    padding: spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  tab: {
    textTransform: 'none',
    fontSize: 24,
  },
  card: {
    margin: 'auto',
    borderRadius: '5px',
    transition: '0.3s',
    position: 'relative',
    marginLeft: 'auto',
    overflow: 'initial',
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: "none",
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 0,
    paddingTop: '56.25%',
    borderRadius: spacing(2),
    position: 'relative',
  },
  title: {
    color: '#000',
    fontSize: 24,
    textTransform: 'none',
  },
  box: {
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));


const Ranking = () => {
  const classes = useStyles();
  const theme = useTheme();
  
  const [infoHombres,setInfoH] = useState([]);
  const [infoMujeres,setInfoM] = useState([]);
  

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  React.useEffect(() => {
    const getData = async () => {
      const data = await db.collection("jugadores").where('sexo','==','M').get()
      setInfoH(data.docs.map(doc => doc.data()))
      const dataM = await db.collection("jugadores").where('sexo','==','F').get()
      setInfoM(dataM.docs.map(doc => doc.data()));
    }
    getData();
  }, []);

  console.log(infoHombres);

  const items = [
    {
      name: "Rafael Nadal  #1",
      description: "Probably the most random thing you have ever seen!",
      image: img
    },
    {
      name: "Cristiano Ronaldo #2",
      description: "Hello World!",
      image: img
    }
  ];
  console.log('items',items);

  const Item = (props) => {
    return (
    <React.Fragment>
      <Paper className={classes.paper_2}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Container maxWidth="sm">
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={ img }
                />
                <CardContent>
                  <Typography variant="h2" gutterBottom>
                    {props.item.nombre} 
                  </Typography><Typography variant="h2" gutterBottom>
                    {props.item.apellido} 
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper_item}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography className={classes.title} align="center">
                      Ranking
                    </Typography>
                    <Typography variant="h2" align="center">
                      1
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography className={classes.title} align="center">
                          Puntos
                        </Typography>
                        <Typography variant="h2" align="center">
                          {props.item.puntos}
                        </Typography>
                      </CardContent>
                      <Divider light />
                      <Box display={'flex'}>
                        <Box p={2} flex={'auto'} className={classes.box}>
                          <p className={classes.statLabel}>Edad</p>
                          <p className={classes.statValue}>{props.item.edad}</p>
                        </Box>
                        <Box p={2} flex={'auto'} className={classes.box}>
                          <p className={classes.statLabel}>Federación</p>
                          <p className={classes.statValue}>{props.item.federacion}</p>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Container>
        </Grid>
      </Paper>
    </React.Fragment>
    );
  }

  return (
    <React.Fragment>
        <Topbar/>
        <br />
        <br />
        <br />
        <br />
        <div className={ classes.root }>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                >
                <Tab label="Varonil" className={classes.tab}/>
                <Tab label="Femenil" className={classes.tab}/>
                </Tabs>
            </Paper>
            </Grid>
            <Grid item xs={12}>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                <Carousel
                    navButtonsAlwaysVisible={true}
                    autoPlay={false}
                >
                    { 
                    infoHombres.map( item => <Item item={item} /> )
                    }
                </Carousel>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                <Carousel
                    navButtonsAlwaysVisible={true}
                    autoPlay={false}
                >
                    { 
                    infoMujeres.map( item => <Item item={item} /> )
                    }
                </Carousel>
                </TabPanel>
            </SwipeableViews>
            </Grid>
        </Grid>
        </div>
    </React.Fragment>
  );
}

export default Ranking;