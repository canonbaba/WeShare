// import { Provider } from 'react-redux';
import * as React from 'react';
import Example from './popup_login';


class App extends React.Component {

  public render() {
    return (
      // <Provider store={store}>
      //   <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, ...
        </p>
        <Example />
      </div>
      //   </Router>
      // </Provider>
    );
  }


}

export default App;
