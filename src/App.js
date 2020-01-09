import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginLayoutRoute from "./layouts/LoginLayout";  
import DashboardLayoutRoute from "./layouts/DashboardLayout";  

import Login from './pages/Login';

function App() {
  return (
    <Router>  
      <Switch>  
        <Route exact path="/">  
            <Redirect to="/login" />  
        </Route>  
        <LoginLayoutRoute path="/login" component={Login} /> 
      </Switch>  
    </Router> 
  );
}

export default App;
