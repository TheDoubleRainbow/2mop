import React, { Component } from 'react';
import Router from './components/Router'
import Header from './components/Header'
import 'bulma/css/bulma.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router />
      </div>
    );
  }
}

export default App;
