import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Route } from 'react-router'
import Login from './paginas/login'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect from="/" to ="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
