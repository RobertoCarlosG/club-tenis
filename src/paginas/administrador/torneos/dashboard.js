import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import { mainListItems } from '../listItems';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { db } from '../../../servicios/firebase/index'

let citiesRef = db.collection('torneos');

                


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
     // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: '#FFF',
    color: '#000',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    background: '#192D3E;',
    color: '#fff',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
    width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  div_busqueda: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(6),
  },
  btn_agregar:{
    padding: '10px',
    backgroundColor: '#039BE5',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    border: '5px',
  },
}));


const Administrador = () => {

      const classes = useStyles();
      const [open, setOpen] = React.useState(true);
      const handleDrawerOpen = () => {
        setOpen(true);
      };
      const handleDrawerClose = () => {
        setOpen(false);
      };

      const [torneos, setTorneos] = React.useState([]);

      React.useEffect(() => {
          const fetchData = async () => {
              const data = await db.collection('torneos').get()
              setTorneos(data.docs.map(doc => doc.data()))
          }
          fetchData()
      }, []);  
      
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Administrador
              </Typography>
              <IconButton>
                <AccountCircleIcon style={{ color: '#000' ,}} />
                <Typography component="h1" variant="h6" color="inherit" noWrap >
                Felipe Juan Froilán
                </Typography>
              </IconButton>
              
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
                
            <ListItemText primary="CLUB TENIS" style={{ color: '#FFF' ,}} />
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon style={{ color: '#FFF' }} />
              </IconButton>
            </div>
            
            <Divider />
            <List>
                {mainListItems}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.div_busqueda}>
              <Grid container spacing={6}>
                <Grid item xs={4}>
                  <Button 
                      className={classes.btn_agregar}
                      variant="contained"  
                      startIcon={<AddIcon style={{ color: '#FFF' }} />} 
                    > 
                      AGREGAR PARTIDO
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <SearchIcon />
                        </Grid>
                        <Grid item>
                          <TextField id="input-busqueda" label="Buscar..." />
                      </Grid>
                    </Grid>
                  </Grid>
              </Grid>
            </div>
              <br />
            <Container className={classes.cardGrid} maxWidth="md">
              
              <Grid container spacing={4}>
                {torneos.map(torneo => {
                                return(
                                  <Grid item key={torneo.nombre} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                      <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                      />
                                      <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                          {torneo.nombre}
                                        </Typography>
                                        <center>
                                        <Typography>
                                          {torneo.categoria} - {torneo.tipo}
                                        </Typography>
                                        </center>
                                      </CardContent>
                                      <CardActions>
                                      </CardActions>
                                    </Card>
                                  </Grid>
                                  );
                            })}
              </Grid>
          </Container>
          </main>
        </div>
      );
  
}

export default Administrador;