import * as React from 'react';
import './App.css';
import Comment from './Comment'
import Rating from './Rating'



class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">We share</div>
          <div className="head">
            <p>Inbox</p>
            <p>Profile</p>
          </div>
        </header>
        <Rating />
        <Comment />
      </div>
    );
  }
}

export default App;
