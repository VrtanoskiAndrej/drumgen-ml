import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Error from './containers/error';
import Home from './containers/home';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Sandbox from './containers/sandbox';

class App extends Component {
  render() {
    return (
      <main>
        <Navbar />
        <Switch>
          <Route path="/sandbox" component={Sandbox} />
          <Route exact path="/" component={Home} />
          <Route path="/" component={Error} />
        </Switch>
      </main>
    );
  }
}
export default App;
