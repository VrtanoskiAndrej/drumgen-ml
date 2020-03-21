import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Error from './containers/error';
import Home from './containers/home';
import Navbar from './components/Navbar/Navbar';
import Sandbox from './containers/sandbox';
import './App.css';
import './highlight.css';
import 'microns/fonts/microns.css';

function App() {
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
export default App;
