import * as React from 'react';
import { Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';


interface ISignupProps {
    signupPopup: boolean
    signupClose: () => void
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
                        <Link to="/signup"><Button bsStyle="primary">Sign up</Button></Link>
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
                                <Checkbox>I agree to the Terms and Conditions</Checkbox>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>


                    <Modal.Footer>
                        <Button bsStyle="primary">forget password</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default SignupPopup;
