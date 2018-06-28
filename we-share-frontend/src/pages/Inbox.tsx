
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ICurrentMessage, IInboxList } from 'src/models';
import { fetchInboxList, fetchSelectedMessage, userSendMessage } from 'src/redux/inbox/action';
import { IRootState } from 'src/redux/store';
import './css/inbox.css';
// import { Link } from 'react-router-dom';

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
                <button onClick={this.props.selectInboxRoom.bind(this, this.props.userid, data.inbox_id)}>
                    <p>{data.nameOfProduct}</p>
                </button>
            </div>
        })

        const currentMessage = this.props.currentMessage.map((data: any, i: number) => {
            return <div key={i} >
                <p>{data.name}</p>
                <p>{data.message}</p>
                <p>{data.created_at}</p>
                <br />
            </div>
        })

        return (

            <div className="static-modal">
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <h2> Inbox List </h2>
                        {currentInboxList}
                    </Col>
                    <Col xs={6} md={4}>
                        <h2> Current Message</h2>

                        <div className='message_box'>
                            {currentMessage}
                        </div>

                        {(this.props.currentMessage.length > 0) ?
                            <div> <p>Input:</p>
                                <input type="text" placeholder='type something...' value={this.state.inputMessages} onChange={this.handleMessagesChange} />
                                <button onClick={this.props.sendMessage.bind(this, this.props.userid, this.state.inputMessages, this.props.currentMessage[0].inbox_id)}>Send</button>
                                {/* <Link to='/contracts/add/ ' component={ContractsDetial}><button>Sign</button></Link> */}
                            </div> : <h1>Please choose Room</h1>}

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










