import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { IHomeData } from 'src/models';
import PostPopup from 'src/pages/popup_post';
import { fetchHomeDate } from 'src/redux/home/action';
import { IRootState } from 'src/redux/store';
import './css/Homepage.css';


interface IHomeProps {
    userid: number; // can't declare it is undefined?
    homedata: IHomeData[];
    onloadHomeData: (userid: number) => void;
    isLoginSuccess: boolean;
    // showProfileLogo: () => void;
}

interface IHomeState {
    postshow: boolean;
    productCategory: string;
    postPopupData: IHomeData;
}

class HomePage extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            postshow: false,
            productCategory: '', // should be number in backend
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
        this.setState({ productCategory: e.target.value });
    }

    public render() {
        const homedata = this.props.homedata.map((data: any, i: number) => {
            return <div onClick={this.postShow.bind(this, data)} key={i}>
                <ul>
                    <li><img src={data.photo} /></li>
                    <li>title: {data.nameOfProduct}</li>
                    <li>number of people: {data.numberOfShareUser}</li>
                    <li>rating: {data.averageRating}</li>
                </ul>
            </div>
        });

        return (
            <div className="static-modal">

                <PostPopup postPopup={this.state.postshow}
                    postData={this.state.postPopupData}
                    postPopupClose={this.postPopupClose} />
                {/* <Button onClick={this.postShow}>PostPopup testing</Button> */}

                <h1>HOMEAGE</h1>

                {homedata}

                <Container>
                    <Row>
                        <select value={this.state.productCategory} onChange={this.handleSelectCategory}>
                            <option value="">Please select</option>
                            <option value="1">Fashion</option>
                            <option value="2">electric product</option>
                            <option value="3">vehicle</option>
                            <option value="4">food & drink</option>
                            <option value="5">toy</option>
                            <option value="6">others</option>
                        </select>
                        <Col xl="8" md="8"><input type="text" placeholder="Search..." /></Col>
                        <Col xl="2" md="2"><button type="submit">GO</button></Col>
                    </Row>
                    <div className="post">
                        <div>Content</div>
                    </div>
                </Container>


                {this.props.isLoginSuccess &&
                    <div>
                        <Link to="/postform">
                            <button type="submit">Post</button>
                        </Link>
                    </div>}

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
        onloadHomeData: (userid: number) => dispatch(fetchHomeDate(userid))
    };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default Home;