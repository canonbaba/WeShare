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
            return <Row id="profilePostContent" key={i}>
                <Col lg={6} xs={6} id="profilePostContentImg">
                    <img src={data.photo} />
                </Col>
                <Col lg={6} xs={6} id="profilePostContentData">
                    <h5>{data.nameOfProduct}</h5>
                    <p>Price: {data.price}</p>
                    <p>Willing % to pay: {data.percentageOfPay}</p>
                    <p>People Shared: {data.numberOfShareUser}</p>
                    {/* <p>Description:</p>
                    <p>{data.description}</p> */}
                </Col>
            </Row>
        });

        const profileRating = this.props.profileRating.map((data: any, i: number) => {
            return <div id="profileRatingNN" key={i}>
                <div id="profileRatingName">
                    <div>Rating: {data.rating}</div>
                </div>
                <div id="profileRatingNumber">
                    <p>Name: {data.name}</p>
                </div>
                <p id="profileRatingComment">Comment: {data.comment}</p>
                <p id="profileRatingDay">Time: {data.updated_at.toString().slice(0, 19)}</p>
            </div>
        });

        const profileContract = this.props.profileContract.map((data: any, i: number) => {
            return <div id="profileContractContentP" onClick={this.props.contractDetail.bind(this, data.contractId)} key={i}>
                <Link to={'/detail_contract'}>

                    <p id="profileContractContentPCreator">Contract Creator Name : {data.name}</p>
                    <p id="profileContractContentPName">Title: {data.productName}</p>
                    <p id="profileContractContentPPrice">price: {data.price}</p>
                    <p id="profileContractContentPState">state: {data.is_confirm ? 'Confirm' : 'click to see Detail'}</p>
                    {/* <p>Contract ID: {data.contractId}</p> */}

                </Link >
                {data.is_agree ?
                    <div id="profileContractContentPAgreeAfter">
                        Agreed
                    </div>
                    :
                    <Link id="profileContractContentPAgree" to={`/contractsSign/${data.contractId}`}>Go To Agree The Contract</Link>
                }

            </div>
        });

        return (
            <div className="static-modal profile">

                <div id="profileContentRow">
                    <div id="profileContent">
                        <div id="fontIcons"><FontAwesome.FaUser /></div>
                        {/* <h1>PROFILE</h1> */}
                        <p>Name: {this.props.loginName}</p>
                        <p>Email: {this.props.loginEmail}</p>
                    </div>
                </div>

                <div id="profile_postH1Row">
                    <div id="profile_postH1">
                        <h1>Your Post</h1>
                        <div id="profile_post">
                            {/* <div id="profilePost"> */}
                            {/* <div> */}
                            {/* <div> */}
                            {profilePost}
                            {/* </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>

                <div id="profileRatingRow">
                    <div id="profileRating">
                        <h1>Rating & Comment</h1>
                        {profileRating}

                    </div>
                </div>

                <div id="profileContractDiv">
                    <div id="profileContract">
                        <h1>Contract</h1>
                        <div id="profileContractContent">

                            {profileContract}

                        </div>
                    </div>
                </div>
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