// src/App.js

import React from 'react'

import Shortlinks from '../components/Shortlinks';
import UpdateShortlink from '../components/UpdateShortlink';
import CreateShortlink from '../components/CreateShortlink';

function App() {
  return (
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
      </div>
  );
}

export default App;