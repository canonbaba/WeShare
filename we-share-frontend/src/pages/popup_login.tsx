// ******************* JUST KEEP NOW
// ******************* Actuall, this tsx can't be delete if everythind is fine



// import * as React from 'react';
// import { Button, Checkbox, Col, ControlLabel, Form, FormGroup, Glyphicon, Modal } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';
// import { remoteFetchUsers } from 'src/redux/login/actions';
// import { IRootState } from 'src/redux/store';

// interface ILoginProps {
//     isLoginPending: boolean;
//     isLoginSuccess: boolean;
//     loginError: boolean;
//     login: (loginemail: string, loginpassword: string) => void;
// }

// interface ILoginState {
//     loginemail: string;
//     loginpassword: string;
// }

// class LoginPopup extends React.Component<ILoginProps, ILoginState> {
//     constructor(props: ILoginProps) {
//         super(props);

//         this.state = {
//             loginemail: '',
//             loginpassword: ''
//         };
//     }

//     public handleLoginEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
//         this.setState({
//             loginemail: e.target.value
//         })
//     }

//     public handleLoginPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//         this.setState({
//             loginpassword: e.target.value
//         })
//     }

//     public render() {
//         const { isLoginPending, isLoginSuccess, loginError } = this.props;

//         if (isLoginSuccess === true) {
//             return <Redirect to='/home' />
//           } else{
//         return (
//             <div className="static-modal">
//                 <Modal.Dialog>
//                     <Modal.Header>
//                         <div className="text-right">
//                             <Link to="/"><Glyphicon glyph="remove" /></Link>
//                         </div>
//                         <Button bsStyle="primary">Login</Button>
//                         <Button bsStyle="primary">Sign up</Button>
//                     </Modal.Header>


//                     <Form horizontal={true}>
//                         <FormGroup controlId="formHorizontalEmail">
//                             <Col componentClass={ControlLabel} sm={2}>
//                                 Email
//                             </Col>
//                             <Col sm={7}>
//                                 <input type="text" onChange={this.handleLoginEmail} value={this.state.loginemail} />
//                             </Col>
//                         </FormGroup>

//                         <FormGroup controlId="formHorizontalPassword">
//                             <Col componentClass={ControlLabel} sm={2}>
//                                 Password
//                              </Col>
//                             <Col sm={7}>
//                                 <input type="password" onChange={this.handleLoginPassword} value={this.state.loginpassword} />
//                             </Col>
//                         </FormGroup>

//                         <FormGroup>
//                             <Col smOffset={2} sm={10}>
//                                 <Checkbox>Remember me</Checkbox>
//                             </Col>
//                         </FormGroup>

//                         <FormGroup>
//                             <Col smOffset={2} sm={10}>
//                                 <Button onClick={this.props.login.bind(this, this.state.loginemail, this.state.loginpassword)}>Sign in</Button>
//                             </Col>
//                         </FormGroup>
//                     </Form>

//                     {/* can delete below  */}
//                     <Modal.Footer>
//                         <div>
//                             {isLoginPending && <div>Please wait...</div>}
//                             {isLoginSuccess && <div>Success.</div>}
//                             {loginError && <div>{"loginError"}</div>}
//                         </div>
//                     </Modal.Footer>
//                 </Modal.Dialog>

                
//             </div>
//         );
//     }}

// }


// const mapStateToProps = (rootState: IRootState) => {
//     return {
//         isLoginPending: rootState.islogin.isLoginPending,
//         isLoginSuccess: rootState.islogin.isLoginSuccess,
//         loginError: rootState.islogin.loginError
//     };
// }

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         login: (loginemail: string, loginpassword: string) => dispatch(remoteFetchUsers(loginemail, loginpassword))
//     };
// }

// const LoginUser = connect(mapStateToProps, mapDispatchToProps)(LoginPopup);

// export default LoginUser;
