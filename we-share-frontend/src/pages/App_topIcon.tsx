import * as React from 'react';
// import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

                    <div id="appRoute">
                        <Link to="/inbox">
                            <button>Inbox</button>
                        </Link>
                        <Link to="/profile">
                            <button>Profile</button>
                        </Link>
                        {/* <Link to="/profile">
                            <button>Rating</button>
                        </Link> */}
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