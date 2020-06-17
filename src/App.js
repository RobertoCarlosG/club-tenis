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
import { MainAdm, MainMonitor } from './layout';
import Capturista from './paginas/capturista/dashboard';
import { AuthProvider } from './contexto/auth';
import { TorneoContextProvider } from './contexto/ctx_torneo';
import GuardRoute from './modulos/guardRoute';
import MainAdm from './layout/mainAdm';
import theme from './modulos/theme';
import Principal from './paginas/principal/dashboard';
import Detalles from './paginas/principal/verTorneo';
import Ranking from './paginas/principal/ranking';
import Index from './paginas/principal/index';

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
                <GuardRoute
                  path="/capturista"
                  component={ Capturista }
                  exact
                  layout={ MainCap }
                />
                <Route exact path="/inicio" component={ Principal } />     
                <Route exact path="/inicio/torneo/:idTorneo" component ={ Detalles } />  
                <Route exact path="/inicio/ranking" component ={ Ranking } />
                <Route exact path="/dashboard" component = { Index } />   
                <Route exact path="/login" component={ Autenticarse } />
                <Redirect from="/" to ="/dashboard" />
              </Switch>
            </TorneoContextProvider>
          </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
