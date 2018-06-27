import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { IScore } from 'src/models';
import { saveRating } from 'src/redux/rating/actions';
import { IRootState } from 'src/redux/store';
import './css/Rating.css';

interface IRatingProps {
    userid: number;
    ratingSubmit: () => void;
}

interface IRatingState {
    comment: string;
    scores: IScore[];
}

class PureRating extends React.Component<IRatingProps, IRatingState> {
    constructor(props: IRatingProps) {
        super(props)

        this.state = {
            comment: '',
            scores: [
                { id: 1, click: false, value: -3 },
                { id: 2, click: false, value: -2 },
                { id: 3, click: false, value: -1 },
                { id: 4, click: true, value: 0 },
                { id: 5, click: false, value: 1 },
                { id: 6, click: false, value: 2 },
                { id: 7, click: false, value: 3 },
            ],
        }

    }

    // export default class Rating extends React.Component {

    public render() {
        return (
            <Container>
                <Row className='num'>
                    <Col xl='2' id="rate">
                        <p>Rating:</p>
                    </Col>
                    <Col xl='5' className='rating'>
                        <table>
                            <thead>
                                <tr>
                                    <th>-3</th>
                                    <th>-2</th>
                                    <th>-1</th>
                                    <th>0</th>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                </tr>
                            </thead>
                            <thead>
                                {
                                    this.state.scores.map(score => (
                                        <td key={score.id}>
                                            <td><input type="checkbox" checked={score.click} onChange={this.clickScore.bind(this, score.id)} /></td>
                                        </td>
                                    ))
                                }
                            </thead>

                        </table>
                    </Col>
                </Row>


                {/* comment part */}
                <Row className="comment">
                    <Col>
                        <br />
                        <Row>
                            <Col><input type="text" value={this.state.comment} onChange={this.ratingComment} className="text" placeholder="Comment..." /></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className="submit">
                                <button onClick={this.props.ratingSubmit.bind(this, this.props.userid, this.state.comment, this.trueClick())}>Submit</button>
                            </Col>
                        </Row>
                        <br />
                    </Col>
                </Row>
            </Container >
        )
    }

    private trueClick = () => {
        // const ratingresult = 
       const ratingValue = this.state.scores.find(input => {
            return input.click === true
        });
        if(ratingValue !=null) {
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

    private ratingComment = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    ratingSubmit: ( userid: number, comment: string, trueClick: number ) => { dispatch(saveRating(userid, comment, trueClick)) }
});


const Rating = connect(mapStateToProps, mapDispatchToProps)(PureRating)

export default Rating;
