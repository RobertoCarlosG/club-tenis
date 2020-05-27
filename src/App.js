import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Route } from 'react-router'
import Login from './paginas/login'
import ADM from './paginas/administrador/index'

function App() {
  return (
    <BrowserRouter>
    <div id='root'>
      <Switch>
        <Route  path="/login" component={Login} />
        <Route path="/administrador" component={ADM} /> 
        <Redirect from="/" to ="/login" />
      </Switch>
      </div>
      <div id='modal-root'></div>
    </BrowserRouter>
  );
}

export default App;
