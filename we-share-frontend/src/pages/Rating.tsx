import * as React from 'react';
import { Col, Glyphicon, Modal, Row } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Col, Row } from 'reactstrap';
import { IContractDetail, IScore } from 'src/models';
import { saveRating } from 'src/redux/rating/actions';
import { IRootState } from 'src/redux/store';
import './css/Rating.css';

interface IRatingProps {
    userid: number;
    ratingSubmit: () => void;
    ratingPopup: boolean;
    showRatingPopupData: IContractDetail;
    ratingPopupClose: () => void;
}

interface IRatingState {
    comment: string;
    scores: IScore[];
    show: boolean;
}

class PureRating extends React.Component<IRatingProps, IRatingState> {
    constructor(props: IRatingProps) {
        super(props)

        this.state = {
            comment: '',
            show: false,
            // tslint:disable-next-line:object-literal-sort-keys
            scores: [
                { id: 1, click: false, value: 3 },
                { id: 2, click: false, value: 2 },
                { id: 3, click: false, value: 1 },
                { id: 4, click: true, value: 0 },
                { id: 5, click: false, value: -1 },
                { id: 6, click: false, value: -2 },
                { id: 7, click: false, value: -3 },
            ],
        }

    }

    public handleClose = () => {
        this.setState({ show: false });
    }

    public render() {
        return (
            <div id="static-modal">
                <Modal show={this.props.ratingPopup} onHide={this.handleClose}>
                    <div id="ratingClose">
                        <button onClick={this.props.ratingPopupClose}><Glyphicon glyph="remove" />
                        </button>
                    </div>
                    <div id="ratingTitle">
                        <h1>Rating & Comment</h1>
                    </div>
                    <Row >
                        <Col lg={3} xs={3} >
                            <div id="rate_value">
                                <h4>Rating:</h4>
                                <Col lg={2} xs={1} >
                                    {
                                        this.state.scores.map(score => (
                                            <p key={score.id} id="clickbox">
                                                <input type="checkbox" checked={score.click} onChange={this.clickScore.bind(this, score.id)} />
                                            </p>
                                        ))
                                    }
                                </Col>
                                <Col lg={2} xs={1} >
                                    <div id="rate_value_icon">
                                        <p><FontAwesome.FaSmileO /><FontAwesome.FaSmileO /><FontAwesome.FaSmileO /></p>
                                        <p><FontAwesome.FaSmileO /><FontAwesome.FaSmileO /></p>
                                        <p><FontAwesome.FaSmileO /></p>
                                        <p><FontAwesome.FaMehO /></p>
                                        <p><FontAwesome.FaFrownO /></p>
                                        <p><FontAwesome.FaFrownO /><FontAwesome.FaFrownO /></p>
                                        <p><FontAwesome.FaFrownO /><FontAwesome.FaFrownO /><FontAwesome.FaFrownO /></p>
                                    </div>
                                </Col>

                            </div>
                        </Col>

                        {/* comment part */}

                        <Col lg={8} xs={8} >
                            <div id="rating_comment">
                                <h4>To: {this.props.showRatingPopupData.name}</h4>
                                <textarea value={this.state.comment} onChange={this.ratingComment} className="text" placeholder="Comment..." />
                                <div>
                                    <Link to="/profile">
                                        <button onClick={this.props.ratingSubmit.bind(this, this.props.userid, this.state.comment, this.trueClick(), this.props.showRatingPopupData.user_id)}>Submit</button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </div >
        )
    }

    private trueClick = () => {
        // const ratingresult = 
        const ratingValue = this.state.scores.find(input => {
            return input.click === true
        });
        if (ratingValue != null) {
            return ratingValue.value
        } else {
            // tslint:disable-next-line:no-console
            console.log('fail to submit rating value')
            throw Error
        }
    }


    private clickScore = (scoreId: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const scores = this.state.scores.slice();
        const score = scores.find(s => s.id === scoreId);
        if (score != null) {
            if (e.target.checked) {
                scores.forEach(s => s.click = false);
            }
            score.click = e.target.checked;
            this.setState({
                scores
            }
            )
        }
    }

    private ratingComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            comment: e.target.value
        }
        )
    }
}

const mapStateToProps = (rootState: IRootState) => {
    return {
        userid: rootState.islogin.userid,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    ratingSubmit: (userid: number, comment: string, trueClick: number, gotCommentUserID: number) => { dispatch(saveRating(userid, comment, trueClick, gotCommentUserID)) }
});


const Rating = connect(mapStateToProps, mapDispatchToProps)(PureRating)

export default Rating;
