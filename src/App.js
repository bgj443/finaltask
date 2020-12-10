import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Customerlist from './components/Customerlist';
import TabApp from './components/TabApp';
import moment from 'moment';



 
function App() {
  return (
    <div className="App">
       <TabApp/>
    </div>
  );
}

export default App;


