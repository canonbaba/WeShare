import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IContractDetail } from 'src/models';
import Rating from 'src/pages/Rating';
import { IRootState } from 'src/redux/store';
import './css/Detail_Contract.css';

interface IDetailContratProps {
    contractDetail: IContractDetail[];
    userid: number;
}

interface IDetailContractState {
    showRatingPopup: boolean;
    ratingPopupData: IContractDetail;
}

class PureDetailContrat extends React.Component<IDetailContratProps, IDetailContractState> {
    constructor(props: IDetailContratProps) {
        super(props);


        this.state = {
            showRatingPopup: false,
            // tslint:disable-next-line:object-literal-sort-keys
            ratingPopupData: {
                contract_id: 0,
                user_id: 0,
                // tslint:disable-next-line:object-literal-sort-keys
                percentageToShare: '',
                daysToUse: '',
                is_agree: false,
                name: '',
                productName: '',
                price: '',
                description: '',
                created_at: ''
            }
        };
    }


    public ratingPopupShow = (data: IContractDetail) => {
        this.setState({
            showRatingPopup: !this.state.showRatingPopup,
            // tslint:disable-next-line:object-literal-sort-keys
            ratingPopupData: data
        })
    }


    public ratingPopupClose = () => {
        this.setState({
            showRatingPopup: false
        })
    }

    public render() {
        const showContractDetail = this.props.contractDetail.map((data: any, i: number) => {
            return <div id="detailPeople" key={i}>
                <p id="detailPeopleParticipant">Participant: {data.name}</p>
                <p id="detailPeopleGrey">Price To Share: {data.percentageToShare}</p>
                <p id="detailPeopleGrey">Which day will use: {data.daysToUse}</p>
                <p id="detailPeopleGrey">Status: {data.is_agree === true ? 'Agree' : 'Waiting for Confirmation'}</p>
                <div id="detailPeopleButton">
                    {this.props.userid === data.user_id ?
                        null :
                        <button onClick={this.ratingPopupShow.bind(this, data)}>Rating</button>}
                </div>

            </div>
        })

        const shareDetail = this.props.contractDetail.map((data: any, i: number) => {
            return <div id="shareDetailContent" key={i}>
                <h1>Title: {data.productName}</h1>
                <p>Price: {data.price}</p>
                <p>Description: {data.description}</p>
            </div>
        })

        return (
            <div className="static-modal" id="detail_contract">
                <Row id="detail_contractContent">
                    <Col lg={12} xs={12} id="shareDetail">

                        {shareDetail[0]}

                    </Col>
                    <Col lg={12} xs={12} id="showContractDetail">
                        {/* <p>{this.props.contractDetail[0].created_at}</p> */}
                        {showContractDetail}

                        <Rating ratingPopup={this.state.showRatingPopup}
                            showRatingPopupData={this.state.ratingPopupData} ratingPopupClose={this.ratingPopupClose} />
                    </Col>
                </Row>

            </div>
        );
    }
}

const mapStateToProps = (rootState: IRootState) => {
    return {
        contractDetail: rootState.contractDetail.contractDetail,
        userid: rootState.islogin.userid
    }
}

const mapDispatchToProps = (dispatch: any) => ({

});

const DetailContrat = connect(mapStateToProps, mapDispatchToProps)(PureDetailContrat)

export default DetailContrat;