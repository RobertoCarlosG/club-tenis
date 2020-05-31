import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';
import Login from './paginas/login';
import Administrador from './paginas/administrador/torneos/dashboard';
import Detalles from './paginas/administrador/torneos/detalles_torneo';
import { AuthProvider } from './contexto/auth';
import GuardRoute from './modulos/guardRoute';
import MainAdm from './layout/mainAdm';
import theme from './modulos/theme';

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
          <AuthProvider>
            <Switch>
              <GuardRoute 
                path="/administrador" 
                component={ Administrador } 
                exact
                layout={ MainAdm }
                /> 
              <Route exact path="/login" component={ Login } />          
              <Route path="/detalles" component={ Detalles } />
              <Redirect from="/" to ="/login" />
            </Switch>
          </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
