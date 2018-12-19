// /client/App.js
import React, { Component } from "react";
import './App.css';
import Loginscreen from './Loginscreen';

class App extends Component {
  

  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    return (
      <div>
        <Loginscreen/>
      </div>
    );
  }
}

export default App;