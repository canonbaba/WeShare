import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IContractDetail } from 'src/models';
import Rating from 'src/pages/Rating';
import { IRootState } from 'src/redux/store';
import './css/Detail_Contract.css';

interface IDetailContratProps {
    contractDetail: IContractDetail[];
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
            return <div id="detailPeople" onClick={this.ratingPopupShow.bind(this, data)} key={i}>
                <p>Participant: {data.name}</p>
                <p>Price To Share: {data.percentageToShare}</p>
                <p>Which day will use: {data.daysToUse}</p>
                <p>Status: {data.is_agree === true ? 'Agree' : 'Waiting for Confirmation'}</p>
            </div>
        })

        const shareDetail = this.props.contractDetail.map((data: any, i: number) => {
            return <div key={i}>
                <h1>Product: {data.productName}</h1>
                <p>Price: {data.price}</p>
                <p>Description: {data.description}</p>
            </div>
        })

        return (
            <div className="static-modal" id="detail_contract">
                <Row>
                    <Col lg={12} xs={12} id="shareDetail">
                        <h1>{shareDetail[0]}</h1>
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
        contractDetail: rootState.contractDetail.contractDetail
    }
}

const mapDispatchToProps = (dispatch: any) => ({

});

const DetailContrat = connect(mapStateToProps, mapDispatchToProps)(PureDetailContrat)

export default DetailContrat;