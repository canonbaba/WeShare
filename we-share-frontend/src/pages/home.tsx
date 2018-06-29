import * as React from 'react';
import { Row } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Col from 'reactstrap/lib/Col';
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
            return <div onClick={this.postShow.bind(this, data)} key={i}>
                <div className="overflowPost">
                    <h1>{data.nameOfProduct}</h1>
                    <img src={data.photo} />
                    <h5>People Shared: {data.numberOfShareUser}</h5>
                    <h5>Rating: {data.averageRating}</h5>
                </div>
            </div>
        })

        return (
            <div className="static-modal homepage">

                <PostPopup postPopup={this.state.postshow}
                    postData={this.state.postPopupData}
                    postPopupClose={this.postPopupClose} />

                <Row>
                    <Col lg={12} xs={12} className="homeUpper">

                        <Col lg={5} xs={5} id="homeinput"><input type="text" placeholder="SEARCH POST" /></Col>
                        <Col lg={1} xs={1} id="sumbitbutton"><button type="submit"><FontAwesome.FaSearch /></button></Col>
                        <Col lg={1} xs={1} className="custom-select">
                            <select value={this.state.selectCategoryId} onChange={this.handleSelectCategory} onMouseOut={this.props.selectCategoryData.bind(this, this.state.selectCategoryId)}>
                                <option value="">ALL</option>
                                <option value="1">FASHION</option>
                                <option value="2">ELECTRIC PRODUCT</option>
                                <option value="3">VEHICLE</option>
                                <option value="4">FOOD & DRINK</option>
                                <option value="5">TOY</option>
                                <option value="6">OTHERS</option>
                            </select>
                        </Col>
                    </Col>
                </Row>


                <Row className="post">
                    <Col lg={12} xs={12} className="postright">

                        {homedata}

                    </Col>
                    <Col lg={12} xs={12} id="openpost">
                        {this.props.isLoginSuccess &&
                            <div id="homePost">
                                <Link to="/postform">
                                    <button type="submit">CLICK TO POST</button>
                                </Link>
                            </div>}
                    </Col>


                </Row>

            </div>
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