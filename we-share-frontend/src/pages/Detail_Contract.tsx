import * as React from 'react';
import { connect } from 'react-redux';
import { IContractDetail } from 'src/models';
import Rating from 'src/pages/Rating';
import { IRootState } from 'src/redux/store';

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
            return <div onClick={this.ratingPopupShow.bind(this, data)} key={i}>
                <p>name: {data.name}</p>
                <p>percentageToShare: {data.percentageToShare}</p>
                <p>daysToUse: {data.daysToUse}</p>
                <p>status: {data.is_agree === true ? 'Agree' : 'Waiting for Confirmation'}</p>
            </div>
        })

        const shareDetail = this.props.contractDetail.map((data: any, i: number) => {
            return <div key={i}>
                <h1>Title: {data.productName}</h1>
                <p>Price: {data.price}</p>
                <p>Description: {data.description}</p>
            </div>
        })

        return (
            <div className="static-modal">
                <h1>{shareDetail[0]}</h1>
                {/* <p>{this.props.contractDetail[0].created_at}</p> */}
                {showContractDetail}

                <Rating ratingPopup={this.state.showRatingPopup}
                    showRatingPopupData={this.state.ratingPopupData} ratingPopupClose={this.ratingPopupClose} />

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