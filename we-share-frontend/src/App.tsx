import * as React from 'react';
import {
  Col,
  //  MenuItem,
  Nav,
  Navbar,

} from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import AppTopICON from 'src/pages/App_topIcon';
import ContractsDetail from 'src/pages/ContractsDetail';
import ContractsList from 'src/pages/ContractsList';
import ContractsSign from 'src/pages/ContractsSign';
import PostForm from 'src/pages/create_post';
import DetailContrat from 'src/pages/Detail_Contract';
import Home from 'src/pages/home';
import Inbox from 'src/pages/Inbox';
import SignupPopup from 'src/pages/popup_signup';
import Profile from 'src/pages/profile';
import Rating from 'src/pages/Rating';
import { logoutClearData } from 'src/redux/login/actions';
import { IRootState } from 'src/redux/store';
import './App.css';

interface IPureAppProps {
  isLoginSuccess: boolean;
  logout: () => void;
}


class PureApp extends React.Component<IPureAppProps, { signupshow: boolean }> {
  constructor(props: IPureAppProps) {
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

      <Router>
        <div className="App">

          <Navbar fixedTop={true} inverse={true} collapseOnSelect={false}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link id="appLogoword" to="/home">WeBuy．WeShare</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight={true}>
                {this.props.isLoginSuccess ?
                  <div>
                    <LinkContainer to="/home">
                      <button id="appLoginWhite" onClick={this.props.logout}>
                        Logout
                  </button>
                    </LinkContainer>
                    <AppTopICON />
                  </div>
                  :
                  <button id="appLoginWhite" onClick={this.signupShow}>
                    Login
                  </button>
                }

              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Col lg={12} xs={12} className="middle">
            <Switch>
              <Route path="/postform" exact={true} component={PostForm} />

              <Route path="/home" exact={true} component={Home} />
              {/* <Route path="/home" exact={true} component={Home} showProfileLogo={this.showProfileicon} /> */}

              <Route path="/rating" exact={true} component={Rating} />
              <Route path="/profile" exact={true} component={Profile} />

              <Route path="/contracts" exact={true} component={ContractsList} />
              <Route path="/contracts/add" component={ContractsDetail} />
              <Route path="/contracts/:id" component={ContractsDetail} />
              <Route path="/contractsSign/:id" component={ContractsSign} />

              <Route path="/inbox" exact={true} component={Inbox} />
              <Route path="/detail_contract" exact={true} component={DetailContrat} />
            </Switch>
          </Col>
          {/* <Col lg={2} xs={2} id="routeLink"> */}
          {/* <button id="appbutton" onClick={this.signupShow}>LOGIN</button> */}
          {/* <AppTopICON /> */}
          {/* </Col> */}
          <SignupPopup signupPopup={this.state.signupshow} signupClose={this.signuphide} />
          {/* </Row> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (rootState: IRootState) => {
  return {
    isLoginSuccess: rootState.islogin.isLoginSuccess,
  }
}


const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logoutClearData()),
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(PureApp);

export default App;
