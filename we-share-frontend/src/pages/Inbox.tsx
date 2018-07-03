import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ICurrentMessage, IInboxList } from 'src/models';
import { fetchInboxList, fetchSelectedMessage, userSendMessage } from 'src/redux/inbox/action';
import { IRootState } from 'src/redux/store';
import './css/Inbox.css';

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
            return <div key={i}>
                <div id="inboxList">
                    <button onClick={this.props.selectInboxRoom.bind(this, this.props.userid, data.inbox_id)}>
                        {data.nameOfProduct}
                    </button>
                </div>
            </div>
        })

        const currentMessage = this.props.currentMessage.map((data: any, i: number) => {
            return <div id="realMessage" key={i} >
                <h5>{data.name}</h5>
                <p>{data.message}</p>
                <h6 id="inboxDate">{data.created_at.toString().slice(0, 19)}</h6>
            </div>
        })

        return (

            <div className="static-modal" id="inbox_body">

                <Row id="inboxRoomRow">
                    <Col lg={12} xs={12} id="inboxRoom">
                        <h5> Room </h5>
                        <div id="inboxScrollRoom">
                            {currentInboxList}
                        </div>
                    </Col>
                </Row>
                <Row id="inboxMessageRow">
                    <Col lg={12} xs={12} id="inboxMessage">
                        {/* <div>
                           <h5> Message </h5>
                       </div> */}

                        <div id="inboxScroll">
                            {currentMessage}
                        </div>

                        {(this.props.currentMessage.length > 0) ?
                            <Row id="inboxContractRow">
                                <Col lg={12} xs={12} id="inboxTextSend">
                                    {/* <p>Input:</p> */}
                                    {/* <Col lg={6} xs={6}> */}
                                    <input type="text" placeholder='type something...' value={this.state.inputMessages} onChange={this.handleMessagesChange} />
                                    {/* </Col>
                                   <Col lg={6} xs={6}> */}
                                    <button onClick={this.props.sendMessage.bind(this, this.props.userid, this.state.inputMessages, this.props.currentMessage[0].inbox_id)}>SEND</button>
                                    {/* </Col> */}
                                </Col>
                                <div id="create_contract_icon">
                                    <div id="inboxLinkContract" >
                                        <Link to="/contracts/add">

                                            <button><img src="https://png.icons8.com/ios/150/FFFFFF/certificate.png" /></button>
                                            <span id="inbox_tooltiptext">Create Contract</span>
                                        </Link>
                                    </div>
                                </div>
                            </Row> :
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