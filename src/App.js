import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';
import Autenticarse from './paginas/login';
import Administrador from './paginas/administrador/torneos/dashboard';
import DetallesTorneo from './paginas/administrador/torneos/detalles_torneo';
import Monitor from './paginas/monitor/monitor';
import DetallesPartido from './paginas/monitor/componentes/detallesPartido';
import { AuthProvider } from './contexto/auth';
import { TorneoContextProvider } from './contexto/ctx_torneo';
import GuardRoute from './modulos/guardRoute';
import { MainAdm, MainMonitor } from './layout';
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
                  path="/monitor"
                  component={ Monitor }
                  exact
                  layout={ MainMonitor }
                />
                <GuardRoute 
                  exact
                  strict
                  path="/monitor/detalles/:idPartido" 
                  component = { DetallesPartido }
                  layout={ MainMonitor }
                />
                <Route exact path="/login" component={ Autenticarse } />
                <Redirect from="/" to ="/login" />
              </Switch>
            </TorneoContextProvider>
          </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
