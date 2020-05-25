import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Route } from 'react-router'
import Login from './paginas/login'
import Administrador from './paginas/administrador'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/administrador" component={Administrador} /> 
        <Redirect from="/" to ="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
