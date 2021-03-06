import * as React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
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
                                <button className="top_icon" ><span><img src="https://png.icons8.com/metro/50/FFFFFF/inbox.png"/></span></button>
                            </LinkContainer>

                            <LinkContainer id="topIconMargin" to="/profile">
                                <button className="top_icon"><span><img src="https://png.icons8.com/metro/50/FFFFFF/contacts.png"/></span></button>
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