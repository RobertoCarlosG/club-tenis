import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';
import Login from './paginas/login';
import Administrador from './paginas/administrador/torneos/dashboard';
import DetallesTorneo from './paginas/administrador/torneos/detalles_torneo';
import Capturista from './paginas/capturista/dashboard';
import { AuthProvider } from './contexto/auth';
import { TorneoContextProvider } from './contexto/ctx_torneo';
import GuardRoute from './modulos/guardRoute';
import MainAdm from './layout/mainAdm';
import MainCap from './layout/mainCap'
import theme from './modulos/theme';

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
          <AuthProvider>
            <TorneoContextProvider>
              <Switch>
                <GuardRoute 
                  path="/administrador" 
                  component={ Administrador } 
                  exact
                  layout={ MainAdm }
                />           
                <GuardRoute 
                  exact
                  strict
                  path="/administrador/detalles/:idTorneo" 
                  component = { DetallesTorneo }
                  layout={ MainAdm }
                />
                <GuardRoute
                  path="/capturista"
                  component={ Capturista }
                  exact
                  layout={ MainCap }
                />
                <Route exact path="/login" component={ Login } />
                <Redirect from="/" to ="/login" />
              </Switch>
            </TorneoContextProvider>
          </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
