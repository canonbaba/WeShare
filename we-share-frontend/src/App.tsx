import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
// import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
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
// import { logoutClearData } from 'src/redux/login/actions';
// import { IRootState } from 'src/redux/store';
import './App.css';

// interface IPureAppProps {
//   isLoginSuccess: boolean;
//   logout: () => void;
// }


class PureApp extends React.Component<{}, { signupshow: boolean }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      signupshow: false,
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


      <div className="App">

        <Row className="appbackground">
          <Col lg={3} xs={3} className="left">
            <Link to="/home"><h5>WeShare</h5></Link>
          </Col>

          <Col lg={7} xs={7} className="middle">
            <Switch>
              <Route path="/postform" exact={true} component={PostForm} />

              <Route path="/home" exact={true} component={Home} />

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
          {/* {this.props.isLoginSuccess ?

              <Col lg={2} xs={2} id="routeLink">
                <button id="appbutton" onClick={this.props.logout}>Logout</button>
                <AppTopICON />
              </Col>

            : */}
            <Col lg={2} xs={2} id="routeLink">
              <button id="appbutton" onClick={this.signupShow}>LOGIN</button>
              <AppTopICON />
            </Col>
          {/* } */}

          <SignupPopup signupPopup={this.state.signupshow} signupClose={this.signuphide} />
        </Row>
      </div>

    );
  }
}

// const mapStateToProps = (rootState: IRootState) => {
//   return {
//     isLoginSuccess: rootState.islogin.isLoginSuccess,
//   }
// }
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     logout: () => dispatch(logoutClearData()),
//   };
// }

// const App = connect(mapStateToProps, mapDispatchToProps)(PureApp);

export default PureApp;
