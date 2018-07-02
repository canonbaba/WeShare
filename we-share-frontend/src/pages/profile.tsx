import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IProfileContractData, IProfilePostData, IProfileRatingData } from 'src/models';
import { contractDetailData, fetchProfilePostData } from 'src/redux/profile/actions';
import { IRootState } from 'src/redux/store';
import './css/profile.css';



interface IPorfileProps {
    userid: number,
    // tslint:disable-next-line:object-literal-sort-keys
    loginName: string,
    loginEmail: string,
    onloadProfileData: (userid: number) => void;
    profilePost: IProfilePostData[];
    profileRating: IProfileRatingData[];
    profileContract: IProfileContractData[];
    contractDetail: (contractId: number) => void;
}

class PureProfile extends React.Component<IPorfileProps, {}> {
    constructor(props: IPorfileProps) {
        super(props);

        this.state = {
            // nothing here now
        }
    }

    public componentDidMount() {
        this.props.onloadProfileData(this.props.userid);
    }


    public render() {
        const profilePost = this.props.profilePost.map((data: any, i: number) => {
            return <div key={i}>
                <div id="profilePostContent">
                    <h5>{data.nameOfProduct}</h5>
                    <img src={data.photo} />
                    <p>Price: {data.price}</p>
                    <p>People Shared: {data.numberOfShareUser}</p>
                    <p>Willing % to pay: {data.percentageOfPay}</p>
                    {/* <p>Description:</p>
                    <p>{data.description}</p> */}
                </div>
            </div>
        });

        const profileRating = this.props.profileRating.map((data: any, i: number) => {
            return <div key={i}>
                <div id="profileRatingBottomLine">
                    <Row>
                        <Col lg={6} xs={6} id="profileRatingName">
                            <p>Name: {data.name}</p>
                        </Col>
                        <Col lg={6} xs={6} id="profileRatingNumber">
                            <div>Rating: {data.rating}</div>
                        </Col>
                    </Row>
                    <p>Comment: {data.comment}</p>
                    <p>Day: {data.updated_at.toString().slice(0, 19)}</p>
                </div>
            </div>
        });

        const profileContract = this.props.profileContract.map((data: any, i: number) => {
            return <div key={i}>
                <Link to={'/detail_contract'}>
                    <div onClick={this.props.contractDetail.bind(this, data.contractId)}>Created Contract
                    <p>Creator Name : {data.name}</p>
                        <p>Title: {data.productName}</p>
                        <p>price: {data.price}</p>
                        <p>state: {data.is_confirm ? 'Confirm' : 'click to see Detail'}</p>
                        <p>Contract ID: {data.contractId}</p>
                    </div>
                </Link>
                {data.is_agree ?
                    'Agree'
                    :
                    <Link to={`/contractsSign/${data.contractId}`}>Go To Agree The Contract</Link>
                }

            </div>
        });

        return (
            <div className="static-modal profile">
                <Row className="porfileLeft">
                    <Col lg={6} xs={6} className="profilePeople">
                        <div id="profileContent">
                            <div id="fontIcons"><FontAwesome.FaUser /></div>
                            {/* <h1>PROFILE</h1> */}
                            <p>Login user Name: {this.props.loginName}</p>
                            <p>Login user Email: {this.props.loginEmail}</p>
                        </div>
                    </Col>
                    <Col lg={6} xs={6} className="profile_postH1">
                        <h1>Created Post</h1>
                        <Col lg={12} xs={12} className="profile_post">
                            {/* <div id="profilePost"> */}
                            {/* <div> */}
                            {/* <div> */}
                            {profilePost}
                            {/* </div> */}
                            {/* </div> */}
                        </Col>
                    </Col>
                </Row>
                <Row className="porfileRight">
                    <Col lg={6} xs={6} id="profileRating">
                        <h1>Rating</h1>
                        <Col lg={12} xs={12} className="profileRatingScroll">
                            {profileRating}

                        </Col>
                    </Col>
                    <Col lg={6} xs={6} id="profileContractH1">
                        <h1>Contract</h1>
                        <Col lg={12} xs={12} id="profileContract">

                            {profileContract}

                        </Col>
                    </Col>
                </Row>
            </div>
        )
    }

}

const mapStateToProps = (rootState: IRootState) => {
    return {
        userid: rootState.islogin.userid,
        // tslint:disable-next-line:object-literal-sort-keys
        loginName: rootState.islogin.loginName,
        loginEmail: rootState.islogin.loginEmail,
        profilePost: rootState.profilePost.profilePost,
        profileRating: rootState.profileRating.profileRating,
        profileContract: rootState.profileContract.profileContract,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        onloadProfileData: (userid: number) => dispatch(fetchProfilePostData(userid)),
        // tslint:disable-next-line:object-literal-sort-keys
        contractDetail: (contractId: number) => dispatch(contractDetailData(contractId))
    };
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(PureProfile);

export default Profile;