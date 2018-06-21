import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Container } from 'reactstrap';
// import ButtonDropdown from 'reactstrap/lib/ButtonDropdown';
import Col from 'reactstrap/lib/Col';
// import DropdownItem from 'reactstrap/lib/DropdownItem';
// import DropdownMenu from 'reactstrap/lib/DropdownMenu';
// import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import Row from 'reactstrap/lib/Row';
import { fetchHomeDate } from 'src/redux/home/action';
import { IRootState } from 'src/redux/store';
import './css/Homepage.css';


interface IHomeProps {
    userid: number; // can't declare it's undefined?
    homedata: IHomeData[];
    onloadHomeData: (userid: number) => void;
}

interface IHomeState {
    // dropdownOpen: boolean
    productDescription: string;
}

class HomePage extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        this.state = {
            // dropdownOpen: false
            productDescription: '', // should be number in backend
        };
    }


    public componentDidMount() {
        this.props.onloadHomeData(this.props.userid);
    }

    // public toggle() {
    //     this.setState({
    //         // dropdownOpen: !this.state.dropdownOpen
    //     });
    // }

    public handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ productDescription: e.target.value });
    }

    public render() {
        const homedata = this.props.homedata.map((data: any, i: number) => {
            return <ul key={i}>
            <li><img src={data.photo} /></li>
            <li>title: {data.nameOfProduct}</li>
            <li>number of people: {data.numberOfShareUser}</li>
            <li>rating: {data.averageRating}</li>
            </ul>
        });

        // const homedataName = this.props.homedata.map((data: any, i: number) => {
        //     return <li key={i}>{data.photo}</li>
        // });
        
        return (
            <div className="static-modal">
                <h1>HOMEAGE</h1>
                <div>
                    {homedata}
                </div>
                <Container>
                    <Row>
                        <select value={this.state.productDescription} onChange={this.handleSelectCategory}>
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

                <div>
                    <Col xs="4" sm="4">
                        <Card>
                            <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </div>

                <div>
                    <Link to="/postform">
                        <button type="submit">Post</button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (rootState: IRootState) => {
    return {
        userid: rootState.islogin.userid,
        // tslint:disable-next-line:object-literal-sort-keys
        homedata: rootState.homedata.homedata
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        onloadHomeData: (userid: number) => dispatch(fetchHomeDate(userid))
    };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default Home;