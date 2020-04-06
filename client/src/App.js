import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import './App.css';

import Login from './page/Login';
import Register from './page/Register';
import Messenger from './page/Messenger';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} />
        <Route path="/messenger" component={Messenger} />
      </Switch>
    </Router>
  );
}

export default App;
