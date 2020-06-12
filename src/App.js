import React, { Component } from 'react'
import Game from "./Game"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
           <Game />
           <footer className="fixed mt-5">
              <p className="text-center" style={{color:"white"}}>Icons made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a>  from  <a href="https://www.flaticon.com">www.flaticon.com</a> </p>
          </footer>
      </div>
  
    )
  
  }
}

export default App;
