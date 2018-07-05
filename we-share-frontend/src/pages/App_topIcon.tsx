import * as React from 'react';
import { NavItem } from 'react-bootstrap';
// import { NavItem } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
// import { Link } from 'react-router-dom';
import { IRootState } from 'src/redux/store';
import './css/App_topIcon.css';

interface IAppTopICON {
    isLoginSuccess: boolean;
}

class PureAppTopICON extends React.Component<IAppTopICON, {}> {
    constructor(props: IAppTopICON) {
        super(props);

        this.state = {

        };
    }

    public render() {
        return (
            <div className="static-modal" id="appRight">

                {this.props.isLoginSuccess &&
                    <div>

                            <LinkContainer id="topIconMargin" to="/inbox">
                                <NavItem eventKey={3} >Inbox</NavItem>
                            </LinkContainer>

                            <LinkContainer id="topIconMargin" to="/profile">
                                <NavItem eventKey={4} >Profile</NavItem>
                            </LinkContainer>

                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (rootState: IRootState) => {
    return {
        isLoginSuccess: rootState.islogin.isLoginSuccess,
    }
}

const AppTopICON = connect(mapStateToProps, {})(PureAppTopICON);

export default AppTopICON;