import * as React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'src/redux/store';

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
            <div className="static-modal">
                <h1>AppTopICON PAGE</h1>

                {this.props.isLoginSuccess && <div>
                    <Link to="/home">
                        <Button bsStyle="primary" bsSize="small">Home</Button>
                    </Link>

                    <Link to="/rating">
                        <Button bsStyle="primary" bsSize="small">rating</Button>
                    </Link>

                    <Link to="/profile">
                        <Button bsStyle="primary" bsSize="small">Profile</Button>
                    </Link>

                    <Link to="/contracts">  <Button bsStyle="primary" bsSize="small">Contract</Button></Link>

                    <Link to="/inbox">
                        <Button bsStyle="primary" bsSize="small">Inbox</Button>
                    </Link>
                </div>}

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