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
                <h4>Title: {data.nameOfProduct}</h4>
                <p>Price: {data.price}</p>
                <p>Number of PPL: {data.numberOfShareUser}</p>
                <p>Willing % to pay: {data.percentageOfPay}</p>
                <p>Description: {data.description}</p>
                <p>Photo: <img src={data.photo} /></p>
            </div>
        });

        const profileRating = this.props.profileRating.map((data: any, i: number) => {
            return <div key={i}>
                <p>rating: {data.rating}</p>
                <p>Name: {data.name}</p>
                <p>comment: {data.comment}</p>
                <p>updated_at: {data.updated_at.toString().slice(0, 10)}</p>
            </div>
        });

        const profileContract = this.props.profileContract.map((data: any, i: number) => {
            return <div key={i}>
                <Link to={'/detail_contract'}>
                    <div onClick={this.props.contractDetail.bind(this, data.contractId)}>Created Contract
                    <p>Creator Name : {data.name}</p>
                        <p>Product: {data.productName}</p>
                        <p>price: {data.price}</p>
                        <p>state: {data.is_confirm}</p>
                        <p>Contract ID: {data.contractId}</p>
                    </div>
                </Link>
                <Link to={`/contractsSign/${data.contractId}`}>Go To Agree The Contract</Link>
            </div>
        });

        return (
            <div className="static-modal">
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <div>
                            <FontAwesome.FaUser />
                            <h1>PROFILE</h1>
                            <p>Login user Name: {this.props.loginName}</p>
                            <p>Login user Email: {this.props.loginEmail}</p>
                        </div>
                    </Col>
                    <Col xs={6} md={8}>
                        <div>
                            <h1>Post</h1>
                            <div className='profile_post'>
                                {profilePost}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <div>
                            <h1>Rating</h1>
                            {profileRating}
                        </div>
                    </Col>
                    <Col xs={6} md={8}>
                        <div>
                            <h1>Contract</h1>
                            {profileContract}
                        </div>
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
        profileContract: rootState.profileContract.profileContract
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