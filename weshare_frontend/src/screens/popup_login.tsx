import * as React from 'react';
import { Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { remoteFetchUsers } from 'src/redux/login/actions';
import { IRootState } from 'src/redux/store';

interface ILoginProps {
    isLoginPending: boolean;
    isLoginSuccess: boolean;
    loginError: string;
    login: (email: string, password: string) => void;
}

interface ILoginSate {
    email: string;
    password: string
}

class LoginPopup extends React.Component<ILoginProps, ILoginSate> {
    constructor(props: ILoginProps) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
        // this.onSubmit = this.onSubmit.bind(this);
    }

    public render() {
        const {isLoginPending, isLoginSuccess, loginError} = this.props;
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <div className="text-right">
                            <Link to="/"><Glyphicon glyph="remove" /></Link>
                        </div>
                        <Button bsStyle="primary">Login</Button>
                        <Button bsStyle="primary">Sign up</Button>
                    </Modal.Header>


                    <Form horizontal={true}>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={7}>
                                <FormControl type="email" placeholder="Email" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                             </Col>
                            <Col sm={7}>
                                <FormControl type="password" placeholder="Password" />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Checkbox>Remember me</Checkbox>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit" onClick={this.props.login.bind(this, this.state.email, this.state.password)}>Sign in</Button>
                            </Col>
                        </FormGroup>
                    </Form>

                    <Modal.Footer>
                        <div>
                            {isLoginPending && <div>Please wait...</div>}
                            {isLoginSuccess && <div>Success.</div>}
                            {loginError && <div>{loginError}</div>}
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

// public onSubmit(e) {
//     e.preventDefault();
//     let { email, password } = this.state;
//     this.props.login(email, password);
//     this.setState({
//       email: '',
//       password: ''
//     });
//   }

const mapStateToProps = (rootState: IRootState) => {
    return {
        isLoginPending: rootState.islogin.isLoginPending,
        isLoginSuccess: rootState.islogin.isLoginSuccess,
        loginError: rootState.islogin.loginError
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (email: string, password: string) => dispatch(remoteFetchUsers(email, password))
    };
}

const LoginUser = connect(mapStateToProps, mapDispatchToProps)(LoginPopup);

export default LoginUser;



