// src/App.js

import React from 'react';
import Shortlinks from './shortlinker/components/Shortlinks';
import CreateShortlink from './shortlinker/components/CreateShortlink';
import UpdateShortlink from './shortlinker/components/UpdateShortlink';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Shortlinks</Link>
            </li>
            <li>
              <Link to="/create">Create Shortlink</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/create">
            <CreateShortlink />
          </Route>
          <Route path="/update/:id">
            <UpdateShortlink />
          </Route>
          <Route path="/">
            <Shortlinks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;