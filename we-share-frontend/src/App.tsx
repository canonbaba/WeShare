import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import PostForm from 'src/pages/create_post';
import Home from 'src/pages/home';
import SignupPopup from 'src/pages/popup_signup';
import Profile from 'src/pages/profile';
import Rating from 'src/pages/Rating';
import { store } from 'src/redux/store';




class App extends React.Component<{}, { signupshow: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      signupshow: false,
      // tslint:disable-next-line:object-literal-sort-keys
      // profileicon: false
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

  // public showProfileicon = () => {
  //   this.setState({
  //     profileicon: true
  //   })
  // }

  public render() {
    return (

      <Provider store={store}>
        <div className="App">
          {/* {this.state.profileicon && <h1>Profile icon here</h1>} */}
          <header>
            <h1>Welcome to React</h1>
            <Button bsStyle="primary" bsSize="large" onClick={this.signupShow}>Login</Button>

            <Link to="/home">
              <Button bsStyle="primary" bsSize="small">Home</Button>
            </Link>

            <Link to="/rating">
              <Button bsStyle="primary" bsSize="small">rating</Button>
            </Link>

            <Link to="/profile">
              <Button bsStyle="primary" bsSize="small">Profile</Button>
            </Link>

          </header>
          <div>
            <SignupPopup signupPopup={this.state.signupshow} signupClose={this.signuphide} />
            <Switch>
              <Route path="/postform" exact={true} component={PostForm} />

              <Route path="/home" exact={true} component={Home} />
              {/* <Route path="/home" exact={true} component={Home} showProfileLogo={this.showProfileicon} /> */}

              <Route path="/rating" exact={true} component={Rating} />
              <Route path="/profile" exact={true} component={Profile} />

            </Switch>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
