import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import Login from './paginas/login';
import Administrador from './paginas/administrador';
import { AuthProvider } from './contexto/auth';
import GuardRoute from './componentes/guardRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <GuardRoute exact path="/administrador" component={Administrador} /> 
          <Redirect from="/" to ="/login" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
