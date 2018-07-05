import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
// import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Col from 'reactstrap/lib/Col';
import { IHomeData } from 'src/models';
import PostPopup from 'src/pages/popup_post';
import { fetchCategoryData, fetchHomeDate } from 'src/redux/home/action';
import { IRootState } from 'src/redux/store';
import './css/Homepage.css';


interface IHomeProps {
    userid: number; // can't declare it is undefined?
    homedata: IHomeData[];
    onloadHomeData: (userid: number) => void;
    isLoginSuccess: boolean;
    selectCategoryData: () => void;
    // showProfileLogo: () => void;
}

interface IHomeState {
    postshow: boolean;
    selectCategoryId: string;
    postPopupData: IHomeData;
}

class HomePage extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            postshow: false,
            selectCategoryId: '', // should be number in backend
            // tslint:disable-next-line:object-literal-sort-keys
            postPopupData: {
                id: 0,
                nameOfProduct: '',
                price: '',
                // tslint:disable-next-line:object-literal-sort-keys
                numberOfShareUser: '',
                percentageOfPay: '',
                description: '',
                category_id: '',
                photo: '',
                averageRating: '',
                userId: 0,
                created_at: ''
            }
        };
    }

    public postShow = (data: IHomeData) => {
        this.setState({
            postshow: !this.state.postshow,
            // tslint:disable-next-line:object-literal-sort-keys
            postPopupData: data
        })
    }

    public postPopupClose = () => {
        this.setState({
            postshow: false
        })
    }

    public componentDidMount() {
        this.props.onloadHomeData(this.props.userid);
        // if (this.props.isLoginSuccess === true) {
        //     this.props.showProfileLogo()
        // }
    }

    public handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectCategoryId: e.target.value });
    }


    public render() {
        const homedata = this.props.homedata.map((data: any, i: number) => {
            return <div id="homeDataPost" key={i}>
                <Row id="overflowPost" onClick={this.postShow.bind(this, data)}>
                    <Col lg={4} xs={4} id="overflowPostImg">
                        <img src={data.photo} />
                    </Col>
                    <Col lg={8} xs={8}>
                        <h1>{data.nameOfProduct}</h1>
                        <h5>People Shared: {data.numberOfShareUser}</h5>
                        <h5>Rating: {data.averageRating}</h5>
                    </Col>
                </Row>
            </div>
        })

        return (
            <div className="static-modal homepage">

                <PostPopup postPopup={this.state.postshow}
                    postData={this.state.postPopupData}
                    postPopupClose={this.postPopupClose} />

                <div className="homeFirstPage">
                    {/* <div id="titleMargin"> */}
                    <Row>
                        <Col lg={12} xs={12} className="titleMargin" id="homeWordWhite">The More</Col>
                    </Row>

                    <Row className="homeWeYellow">
                        {/* <Col lg={2} xs={2} className="titleMarginLeft" id="homeWe">We</Col>
                        <Col lg={8} xs={8} id="homeWordWhite">Share</Col> */}
                        <Col lg={12} xs={12} className="titleMarginLeft" id="homeWe">We Share</Col>
                    </Row>

                    <Row>
                        <Col lg={12} xs={12} className="titleMarginLeft" id="homeWordWhite">The More</Col>
                    </Row>

                    <Row>
                        {/* <Col lg={2} xs={2} className="titleMarginLeft" id="homeWe">We</Col>
                        <Col lg={10} xs={10} id="homeWordWhite">Have</Col> */}
                        <Col lg={12} xs={12} className="titleMarginLeft" id="homeWe1">We Have</Col>
                    </Row>
                    {/* </div> */}
                    <Row id="clickScroll">
                        <button type="submit" >Let's Share With Others !</button>
                    </Row>
                </div>

                <div id="homeAbout">
                    <Row>
                        <Col lg={11} xs={11} id="homeBottomLine">
                            <p>About The WeBuy．WeShare</p>
                            <div id="homeBottomLine2" />
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={8} xs={8} id="homeAboutContent">
                            <div id="homeAboutContent1">
                                provide a platform
                                for users sharing something with each other
                            </div>
                            <div id="homeAboutContent2">
                                Contract and Inbox can be created
                                to help them to reach their agreement
                            </div>
                        </Col>
                    </Row>
                </div>


                {/* <Row id="homePostRow">
                    <Col lg={12} xs={12} id="homePost">
                        <div>Post</div>
                        <div id="homePostBottomLine" />
                    </Col>
                </Row> */}

                <div className="homeSearch">
                    <Row>
                        <Col lg={12} xs={12} id="homeSearchComponents">

                            {/* <Col lg={12} xs={12} id="homeSearchInput"> */}
                                {/* <input type="text" placeholder="SEARCH POST" />
                                <button type="submit"><FontAwesome.FaSearch /></button> */}
                                {/* <div className="custom-select"> */}
                                <select value={this.state.selectCategoryId} onChange={this.handleSelectCategory} onMouseOut={this.props.selectCategoryData.bind(this, this.state.selectCategoryId)}>
                                    <option value="">Category</option>
                                    <option value="1000">All</option>
                                    <option value="1">Fashion</option>
                                    <option value="2">Electric Product</option>
                                    <option value="3">Vehicle</option>
                                    <option value="4">Food & Drink</option>
                                    <option value="5">Toy</option>
                                    <option value="6">Others</option>
                                </select>
                                {/* </div> */}
                            {/* </Col> */}
                        </Col>
                    </Row>


                    <Row className="post">
                        <Col lg={12} xs={12} id="postColumn">

                            {homedata}

                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12} xs={12} id="openpost">
                            {this.props.isLoginSuccess &&

                                <Link to="/postform">
                                    <button type="submit">CLICK TO POST</button>
                                </Link>
                            }
                        </Col>
                    </Row>

                </div>
            </div >
        );
    }
}

const mapStateToProps = (rootState: IRootState) => {
    return {
        userid: rootState.islogin.userid,
        // tslint:disable-next-line:object-literal-sort-keys
        homedata: rootState.homedata.homedata,
        isLoginSuccess: rootState.islogin.isLoginSuccess,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        onloadHomeData: (userid: number) => dispatch(fetchHomeDate(userid)),

        selectCategoryData: (selectCategoryId: string) => dispatch(fetchCategoryData(selectCategoryId))
    };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default Home;