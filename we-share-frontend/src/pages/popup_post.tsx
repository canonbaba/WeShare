import * as React from 'react';
import { Col, Glyphicon, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IHomeData } from 'src/models';
import { joininboxRoom } from 'src/redux/popup_post/action';
import { IRootState } from 'src/redux/store';
import './css/popup_post.css';

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
                    <Row>
                        <Col lg={12} id="ppRating">
                            <h2>Inviter Rating: {this.props.postData.averageRating}</h2>
                            {/* <h2>{this.props.postData.averageRating}</h2> */}
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12} className="flexCenter pphead">
                            <h1>Invitation</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12} className="flexCenter ppProductName">
                            {/* <h2>nameOfProduct: {this.props.postData.nameOfProduct}</h2> */}
                            <h2>{this.props.postData.nameOfProduct}</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12} className="flexCenter ppimage">
                            <img src={this.props.postData.photo} />
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6} xs={6} className="ppleft">
                            <h2>Price:</h2>
                        </Col>
                        <Col lg={6} xs={6} className="ppright">
                            <h2>{this.props.postData.price}</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6} xs={6} className="ppleft">
                            <h2>PercentageOfPay:</h2>
                        </Col>
                        <Col lg={6} xs={6} className="ppright">
                            <h2>{this.props.postData.percentageOfPay}</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6} xs={6} className="ppleft">
                            <h2>NumberOfShareUser:</h2>
                        </Col>
                        <Col lg={6} xs={6} className="ppright">
                            <h2>{this.props.postData.numberOfShareUser}</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6} xs={6} className="ppleft">
                            <h2>Description:</h2>
                        </Col>
                        <Col lg={6} xs={6} className="ppright">
                            <h2>{this.props.postData.description}</h2>
                        </Col>
                    </Row>
                    </div>

                    <Link id="popupPostbutton" to="/inbox">
                        <button onClick={this.props.joinInboxRoom.bind(this, this.props.postData.id, this.props.userid, this.props.loginName)}>CONTACT INVITOR</button>
                    </Link>

                    <Row id="ppDataPost">
                        <Col lg={9} xs={9}>
                            {/* <h2>Created_at: {this.props.postData.created_at}</h2> */}
                            <h2>Created_at: {this.props.postData.created_at.toString().slice(0, 16)}</h2>
                        </Col>
                        <Col lg={3} xs={3} className="ppleft">
                            <h2>{this.props.postData.id}</h2>
                        </Col>
                    </Row>

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