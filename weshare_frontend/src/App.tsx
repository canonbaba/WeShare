import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
// import { Provider } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import LoginPopup from 'src/screens/popup_login';
import SignupPopup from 'src/screens/popup_signup';

class App extends React.Component<{}, { show: boolean }> {
  constructor(props: {}) {
    super({});

    this.state = {
      show: false
    }
  }

  public signupShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  public signuphide = () => {
    this.setState({
      show: false
    })
  }

  public render() {
    return (

      // <Provider store={store}>
      <div className="App">
        <header>
          <h1>Welcome to React</h1>
          <Button bsStyle="primary" bsSize="large" onClick={this.signupShow}>Sing up</Button>
          <Link to="/login">
            <Button bsStyle="primary" bsSize="small"><Glyphicon glyph="user" /></Button>
          </Link>
        </header>
        <div>
            <SignupPopup signupPopup={this.state.show} signupClose={this.signuphide}/>
          <Switch>
            <Route path="/login" exact={true} component={LoginPopup} />
          </Switch>
        </div>
      </div>
      // </Provider>
    );
  }


}

export default App;
