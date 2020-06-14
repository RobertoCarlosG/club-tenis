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
import Principal from './paginas/principal/dashboard';
import Detalles from './paginas/principal/verTorneo';
import Ranking from './paginas/principal/ranking'

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
                <Route exact path="/inicio" component={ Principal } />     
                <Route exact path="/inicio/torneo/:idTorneo" component ={ Detalles } />  
                <Route exact path="/inicio/ranking" component ={ Ranking } />         
                <Route exact path="/login" component={ Login } />
                <Redirect from="/" to ="/inicio" />
              </Switch>
            </TorneoContextProvider>
          </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
