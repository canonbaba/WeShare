import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import PostForm from 'src/pages/create_post';
import Home from 'src/pages/home';
import LoginPopup from 'src/pages/popup_login';
import SignupPopup from 'src/pages/popup_signup';
import { store } from 'src/redux/store';



class App extends React.Component<{}, { signupshow: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      signupshow: false
    }
  }

  public signupShow = () => {
    this.setState({
      signupshow: !this.state.signupshow
    })
  }

  public signuphide = () => {
    this.setState({
      signupshow: false
    })
  }

  public render() {
    return (

      <Provider store={store}>
        <div className="App">
          <header>
            <h1>Welcome to React</h1>
            <Button bsStyle="primary" bsSize="large" onClick={this.signupShow}>Sing up</Button>

            <Link to="/login">
              <Button bsStyle="primary" bsSize="small"><Glyphicon glyph="user" /></Button>
            </Link>

            <Link to="/home">
              <Button bsStyle="primary" bsSize="small">Home</Button>
            </Link>

          </header>
          <div>
            <SignupPopup signupPopup={this.state.signupshow} signupClose={this.signuphide} />
            <Switch>
              <Route path="/login" exact={true} component={LoginPopup} />
              <Route path="/postform" exact={true} component={PostForm} />
              <Route path="/home" exact={true} component={Home} />
            </Switch>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
