import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
// import { Provider } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import LoginPopup from 'src/popup_login';
import SignupPopup from 'src/popup_login';

class App extends React.Component {
  public handleShow: any;

  public render() {
    return (
      // <Provider store={store}>
        <div className="App">
         <header>
          <h1>Welcome to React</h1>
            <Link to="/login ">
              <Button bsStyle="primary" bsSize="small">
                <Glyphicon glyph="user" />
              </Button>
            </Link>
        </header>
          <div>
            <Switch>
              <Route path="/login" exact={true} component={LoginPopup} />
              <Route path="/signup" exact={true} component={SignupPopup} />
            </Switch>
          </div>
        </div>
      // </Provider>
    );
  }


}

export default App;
