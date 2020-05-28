import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Route } from 'react-router'
import Login from './paginas/login'
import ADM from './paginas/administrador/index'
import { AuthProvider } from './contexto/auth';
import GuardRoute from './componentes/guardRoute';

function App() {
  return (
    <BrowserRouter>
      <div id='root'>
        <AuthProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <GuardRoute exact path="/administrador" component={ADM} /> 
            <Redirect from="/" to ="/login" />
          </Switch>
        </AuthProvider>
      </div>
      <div id='modal-root'></div>
    </BrowserRouter>
  );
}

export default App;
