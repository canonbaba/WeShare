import * as React from 'react';
import { connect } from 'react-redux';
import { IProfilePostData, IProfileRatingData } from 'src/models';
import { fetchProfilePostData } from 'src/redux/profile/actions';
import { IRootState } from 'src/redux/store';


interface IPorfileProps {
    userid: number,
    // tslint:disable-next-line:object-literal-sort-keys
    loginName: string,
    loginEmail: string,
    onloadProfileData: (userid: number) => void;
    profilePost: IProfilePostData[];
    profileRating: IProfileRatingData[];
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
                <ul>
                    <li>Title: {data.nameOfProduct}</li>
                    <li>Price: {data.price}</li>
                    <li>Number of PPL: {data.numberOfShareUser}</li>
                    <li>Willing % to pay: {data.percentageOfPay}</li>
                    <li>Description: {data.description}</li>
                    <li>Photo: <img src={data.photo}/></li>
                </ul>
            </div>
        });

        const profileRating = this.props.profileRating.map((data: any, i: number) => {
            return <div key={i}>
                <ul>
                    <li>rating: {data.rating}</li>
                    <li>Name: {data.name}</li>
                    <li>comment: {data.comment}</li>
                    <li>updated_at: {data.updated_at.toString().slice(0,10)}</li>
                </ul>
            </div>
        });

        return (
            <div className="static-modal">
                <h1>PROFILE</h1>
                <p>Login user Name: {this.props.loginName}</p>
                <p>Login user Email: {this.props.loginEmail}</p>

                {profilePost}

                {profileRating}
                
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
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        onloadProfileData: (userid: number) => dispatch(fetchProfilePostData(userid))
    };
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(PureProfile);

export default Profile;