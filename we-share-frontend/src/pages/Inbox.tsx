
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ICurrentMessage, IInboxList } from 'src/models';
import { fetchInboxList, fetchSelectedMessage, userSendMessage } from 'src/redux/inbox/action';
import { IRootState } from 'src/redux/store';
import './css/inbox.css';

interface IInboxProps {
    userid: number;
    inboxList: IInboxList[];
    currentMessage: ICurrentMessage[];
    sendMessage: () => void;
    onloadInboxList: (userid: number) => void;
    selectInboxRoom: () => void;
}

interface IInboxState {
    inputMessages: string;
}

class PureInbox extends React.Component<IInboxProps, IInboxState> {
    constructor(props: IInboxProps) {
        super(props);

        this.state = {
            inputMessages: '',
        }

    }

    public handleMessagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputMessages: e.target.value
        });
    }

    public componentDidMount() {
        this.props.onloadInboxList(this.props.userid);
    }

    public render() {
        const currentInboxList = this.props.inboxList.map((data: any, i: number) => {
            return <Row id="inboxList" key={i}>
                <Col lg={12} xs={12}>
                    <button onClick={this.props.selectInboxRoom.bind(this, this.props.userid, data.inbox_id)}>
                        {data.nameOfProduct}
                    </button>
                </Col>
            </Row>
        })

        const currentMessage = this.props.currentMessage.map((data: any, i: number) => {
            return <div id="realMessage" key={i} >
                <p>{data.name}</p>
                <h5>{data.message}</h5>
                <p id="inboxDate">{data.created_at.toString().slice(0, 19)}</p>
            </div>
        })

        return (

            <div className="static-modal inbox">
                <Row>
                    <Col lg={3} xs={3} id="inboxRoom">
                        <h2> ROOM </h2>
                        <div id="inboxScrollRoom">
                            {currentInboxList}
                        </div>
                    </Col>
                    <Col lg={9} xs={9} id="inboxMessage">
                        <div>
                            <h2> Message </h2>
                        </div>

                        <div id="inboxScroll">
                            {currentMessage}
                        </div>

                        {(this.props.currentMessage.length > 0) ?
                            <div>
                                {/* <p>Input:</p> */}
                                <input type="text" placeholder='type something...' value={this.state.inputMessages} onChange={this.handleMessagesChange} />
                                <button onClick={this.props.sendMessage.bind(this, this.props.userid, this.state.inputMessages, this.props.currentMessage[0].inbox_id)}>SEND</button>
                                {/* <Link to='/contracts/add/ ' component={ContractsDetial}><button>Sign</button></Link> */}
                                <Link id="inboxLinkContract" to="/contracts/add">
                                    <button>CREATE CONTRACT</button>
                                </Link>
                            </div> :
                            <div>
                                <h1>Please choose Room</h1>
                            </div>
                        }

                    </Col>
                </Row>
            </div>
        );

    }



}

const mapStateToProps = (rootState: IRootState) => {
    return {
        // postpop -> backend -> here 
        currentMessage: rootState.currentMessage.currentMessage,
        userid: rootState.islogin.userid,
        // tslint:disable-next-line:object-literal-sort-keys
        inboxList: rootState.inboxList.inboxList,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: (userid: number, inputMessages: string, inboxId: number) => dispatch(userSendMessage(userid, inputMessages, inboxId)),
        // tslint:disable-next-line:object-literal-sort-keys
        onloadInboxList: (userid: number) => dispatch(fetchInboxList(userid)),
        selectInboxRoom: (userid: number, inboxId: number) => dispatch(fetchSelectedMessage(userid, inboxId))
    };
}

const Inbox = connect(mapStateToProps, mapDispatchToProps)(PureInbox);

export default Inbox;










