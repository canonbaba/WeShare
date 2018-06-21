import * as React from 'react';
import { Button, Checkbox, Col, ControlLabel, Form, FormGroup, Glyphicon, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { remoteSignupUsers } from 'src/redux/signup/actions';
import { IRootState } from 'src/redux/store';



interface ISignupProps {
    signupPopup: boolean
    signupClose: () => void
    saveUser: (email: string, name: string, password: string) => void;
}

interface ISignupState {
    show: boolean;
    name: string;
    email: string;
    password: string;

}

class SignupPopup extends React.Component<ISignupProps, ISignupState> {
    constructor(props: ISignupProps) {
        super(props);

        this.state = {
            show: false,
            // tslint:disable-next-line:object-literal-sort-keys
            name: '',
            email: '',
            password: ''
        };
    }

    public handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: e.target.value
        })
    }

    public handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value
        })
    }

    public handleClose = () => {
        this.setState({ show: false });
    }

    public render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.signupPopup} onHide={this.handleClose}>
                    <Modal.Header>
                        <div className="text-right">
                            {/* *** actually it should be redirected to previous component, not "/" */}
                            <Button bsStyle="primary" onClick={this.props.signupClose}><Glyphicon glyph="remove" /></Button>
                        </div>
                        <Link to="/login"><Button bsStyle="primary">Login</Button></Link>
                    </Modal.Header>

                    <Form horizontal={true}>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={7}>
                                <input type="text" onChange={this.handleEmail} value={this.state.email} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                             </Col>
                            <Col sm={7}>
                                <input type="password" onChange={this.handlePassword} value={this.state.password} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Checkbox>I agree to the Terms and Conditions</Checkbox>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button onClick={this.props.saveUser.bind(this, this.state.email, this.state.name
                                , this.state.password)} >Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (rootState: IRootState) => {
    return {
        // seem to be never use below data
        name: rootState.users.users,
        // tslint:disable-next-line:object-literal-sort-keys
        email: rootState.users.users,
        password: rootState.users.users
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveUser: (email: string, name:string, password:string) =>  dispatch(remoteSignupUsers(email, password , name))
    }
}

const MapUser = connect(mapStateToProps, mapDispatchToProps)(SignupPopup)

export default MapUser;