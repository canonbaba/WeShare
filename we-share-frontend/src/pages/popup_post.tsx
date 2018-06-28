import * as React from 'react';
import { Glyphicon, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IHomeData } from 'src/models';
import { joininboxRoom } from 'src/redux/popup_post/action';
import { IRootState } from 'src/redux/store';

interface IPostPopupProps {
    userid: number;
    loginName: string;
    postPopup: boolean;
    postData: IHomeData;
    postPopupClose: () => void;
    joinInboxRoom: () => void;
}

class PurePostPopup extends React.Component<IPostPopupProps, { show: boolean }> {
    constructor(props: IPostPopupProps) {
        super(props);

        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    public handleClose = () => {
        this.setState({ show: false });
    }

    public render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.postPopup} onHide={this.handleClose}>
                    <button onClick={this.props.postPopupClose}><Glyphicon glyph="remove" /></button>
                    <div onClick={this.props.postPopupClose}>
                        <h1>LOL</h1>
                        <h2>{this.props.postData.id}</h2>
                        <h2>nameOfProduct: {this.props.postData.nameOfProduct}</h2>
                        <h2>price: {this.props.postData.price}</h2>
                        <h2>numberOfShareUser: {this.props.postData.numberOfShareUser}</h2>
                        <h2>percentageOfPay: {this.props.postData.percentageOfPay}</h2>
                        <h2>description: {this.props.postData.description}</h2>
                        <h2>averageRating: {this.props.postData.averageRating}</h2>
                        <h2>created_at: {this.props.postData.created_at}</h2>
                        <img src={this.props.postData.photo} />
                    </div>

                    {(this.props.postData.userId === this.props.userid) || this.props.userid === 0?
                        null
                        :
                        <Link to="/inbox">
                            <button onClick={this.props.joinInboxRoom.bind(this, this.props.postData.id, this.props.userid, this.props.loginName)}>CONTACT Invitor</button>
                        </Link>
                    }
                </Modal>

            </div>
        );
    }
}

const mapStateToProps = (rootState: IRootState) => {
    return {
        userid: rootState.islogin.userid,
        // tslint:disable-next-line:object-literal-sort-keys
        loginName: rootState.islogin.loginName,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    joinInboxRoom: (postID: number, userid: number, loginName: string) => {
        dispatch(joininboxRoom(postID, userid, loginName))
    }
});

const PostPopup = connect(mapStateToProps, mapDispatchToProps)(PurePostPopup)

export default PostPopup;