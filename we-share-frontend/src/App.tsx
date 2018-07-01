import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
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
import { store } from 'src/redux/store';
import './App.css';




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
          {/* <header>
            <h1>Welcome to React</h1>
            <AppTopICON />
            <Button bsStyle="primary" bsSize="large" onClick={this.signupShow}>Login</Button>


          </header> */}        
            <Row className="appbackground">
              <Col lg={3} xs={3} className="left">
                <Link to="/home"><h1>WeShare</h1></Link>
              </Col>

              <Col lg={7} xs={7} className="middle">
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
              <Col lg={2} xs={2} id="routeLink">
                <button id="appbutton" onClick={this.signupShow}>LOGIN</button>
                <AppTopICON />
              </Col>
              <SignupPopup signupPopup={this.state.signupshow} signupClose={this.signuphide} />
            </Row>        
        </div>
      </Provider>
    );
  }
}

export default App;
