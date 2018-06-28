import * as React from 'react';
import { Button, Checkbox, Col, ControlLabel, Form, FormGroup, Glyphicon, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { remoteFetchUsers } from 'src/redux/login/actions';
import { remoteSignupUsers } from 'src/redux/signup/actions';
import { IRootState } from 'src/redux/store';



interface ISignupProps {
    signupPopup: boolean
    signupClose: () => void
    saveUser: (signUpemail: string, signUpname: string, signUppassword: string) => void;

    isLoginPending: boolean;
    isLoginSuccess: boolean;
    loginError: boolean;
    login: (loginemail: string, loginpassword: string) => void;
    afterSignup: boolean;
}

interface ISignupState {
    show: boolean;
    signUpname: string;
    signUpemail: string;
    signUppassword: string;

    loginemail: string;
    loginpassword: string;
    toggleLoginSignup: boolean;
}

class SignupPopup extends React.Component<ISignupProps, ISignupState> {
    constructor(props: ISignupProps) {
        super(props);

        this.state = {
            show: false,
            // tslint:disable-next-line:object-literal-sort-keys
            signUpname: '',
            // tslint:disable-next-line:object-literal-sort-keys
            signUpemail: '',
            signUppassword: '',

            loginemail: '',
            loginpassword: '',

            toggleLoginSignup: true
        };
    }

    public handleLoginEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            loginemail: e.target.value
        })
    }

    public handleLoginPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            loginpassword: e.target.value
        })
    }

    public handleSignupName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            signUpname: e.target.value
        })
    }

    public handleSignupEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            signUpemail: e.target.value
        })
    }

    public handleSignupPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            signUppassword: e.target.value
        })
    }

    public handleClose = () => {
        this.setState({ show: false });
    }

    public afterSignupClosePopup = () => {
        if (this.props.afterSignup === true) {
            this.handleClose()
        }
    }

    public handleLoginSignup = () => {
        this.setState({ toggleLoginSignup: !this.state.toggleLoginSignup });
    }

    public render() {
        const { isLoginPending, isLoginSuccess, loginError } = this.props;

        if (isLoginSuccess === true) {
            return <Redirect to='/home' />
        } else {
            return (
                <div className="static-modal">
                    <Modal show={this.props.signupPopup} onHide={this.handleClose}>
                        <div className="text-right">
                            {/* *** actually it should be redirected to previous component, not "/" */}
                            <Button bsStyle="primary" onClick={this.props.signupClose}><Glyphicon glyph="remove" /></Button>
                        </div>

                        {/* toggle Login or Signup */}
                        {this.state.toggleLoginSignup ?
                            <div >
                                <h1>Login</h1>
                                <Modal.Header>
                                    <button onClick={this.handleLoginSignup}>Sign up</button>
                                </Modal.Header>
                                <div>
                                    <Form horizontal={true}>
                                        <FormGroup controlId="formHorizontalEmail">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Email
                            </Col>
                                            <Col sm={7}>
                                                <input type="text" onChange={this.handleLoginEmail} value={this.state.loginemail} />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formHorizontalPassword">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Password
                             </Col>
                                            <Col sm={7}>
                                                <input type="password" onChange={this.handleLoginPassword} value={this.state.loginpassword} />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col smOffset={2} sm={10}>
                                                <Checkbox>Remember me</Checkbox>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col smOffset={2} sm={10}>
                                                <Button onClick={this.props.login.bind(this, this.state.loginemail, this.state.loginpassword)}>Sign in</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                    <Modal.Footer>
                                        <div>
                                            {isLoginPending && <div>Please wait...</div>}
                                            {isLoginSuccess && <div>Success.</div>}
                                            {loginError && <div>{"loginError"}</div>}
                                        </div>
                                    </Modal.Footer>
                                </div>
                            </div>

                            :

                            <div >
                                <h1>Signup</h1>
                                <Modal.Header>
                                    <button onClick={this.handleLoginSignup}>Login</button>
                                </Modal.Header>
                                <div>
                                    <Form horizontal={true}>
                                        <FormGroup controlId="formHorizontalName">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Name
                            </Col>
                                            <Col sm={7}>
                                                <input type="text" onChange={this.handleSignupName} value={this.state.signUpname} />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formHorizontalEmail">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Email
                            </Col>
                                            <Col sm={7}>
                                                <input type="text" onChange={this.handleSignupEmail} value={this.state.signUpemail} />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formHorizontalPassword">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Password
                             </Col>
                                            <Col sm={7}>
                                                <input type="password" onChange={this.handleSignupPassword} value={this.state.signUppassword} />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col smOffset={2} sm={10}>
                                                <Checkbox>I agree to the Terms and Conditions</Checkbox>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col smOffset={2} sm={10}>
                                                <Link to='/home'>
                                                    <Button onClick={this.props.saveUser.bind(this, this.state.signUpemail, this.state.signUpname
                                                        , this.state.signUppassword)} onMouseOut={this.props.signupClose}>Submit</Button>
                                                </Link>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </div>
                        }
                    </Modal>
                </div>
            );
        }
    }
}

const mapStateToProps = (rootState: IRootState) => {
    return {
        // ****** seem to be never use below data, if everythings is fine, can't delete 1.signUpname, 2.signUpemail, 3.signUppassword, 4.isLoginPending, 5.loginError
        signUpname: rootState.signup.users,
        // tslint:disable-next-line:object-literal-sort-keys
        signUpemail: rootState.signup.users,
        signUppassword: rootState.signup.users,

        isLoginPending: rootState.islogin.isLoginPending,
        isLoginSuccess: rootState.islogin.isLoginSuccess,
        loginError: rootState.islogin.loginError,

        afterSignup: rootState.signup.afterSignup
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveUser: (signUpemail: string, signUpname: string, signUppassword: string) => dispatch(remoteSignupUsers(signUpemail, signUppassword, signUpname)),

        login: (loginemail: string, loginpassword: string) => dispatch(remoteFetchUsers(loginemail, loginpassword))
    }
}

const MapUser = connect(mapStateToProps, mapDispatchToProps)(SignupPopup)

export default MapUser;