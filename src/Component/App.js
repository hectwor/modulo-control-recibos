import React, { Component } from 'react';
import './global/css/App.css';

import { Switch, Route } from "react-router-dom";
import CheckCollection from "./CheckCollection";
import NewCollection from "./NewCollection";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
              <Route exact path="/" component={CheckCollection} />
              <Route path="/nueva" component={NewCollection} />
          </Switch>

      </div>
    );
  }
}

export default App;
