import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';
import Autenticarse from './paginas/login';
import Administrador from './paginas/administrador/torneos/dashboard';
import Usuarios from './paginas/administrador/usuarios/usuarios';
import DetallesTorneo from './paginas/administrador/torneos/detalles_torneo';
import Monitor from './paginas/monitor/monitor';
import DetallesPartido from './paginas/monitor/componentes/detallesPartido';
import { AuthProvider } from './contexto/auth';
import { TorneoContextProvider } from './contexto/ctx_torneo';
import GuardRoute from './modulos/guardRoute';
import { MainAdm, MainMonitor } from './layout';
import theme from './modulos/theme';

import Bracket from './paginas/bracket/bracket';

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
                  exact
                  strict
                  path="/usuarios" 
                  component = { Usuarios }
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
                <Route path="/bracket" component={ Bracket } />
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
