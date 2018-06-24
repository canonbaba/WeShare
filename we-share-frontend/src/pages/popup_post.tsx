import * as React from 'react';
import { Glyphicon, Modal } from 'react-bootstrap';
import { IHomeData } from 'src/models';

interface IPostPopupProps {
    postPopup: boolean;
    postData: IHomeData;
    postPopupClose:() => void;
}

class PostPopup extends React.Component<IPostPopupProps,{show:boolean}> {
    constructor(props: IPostPopupProps) {
        super(props);

        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    public handleClose = () => {
        this.setState({ show: false });
    }

    public render() {
        return (
            <div className="static-modal" onClick={this.props.postPopupClose}>
                <Modal show={this.props.postPopup} onHide={this.handleClose}>
                <button onClick={this.props.postPopupClose}><Glyphicon glyph="remove" /></button>
                    <h1>LOL</h1>
                    <h2>{this.props.postData.id}</h2>
                    <h2>nameOfProduct: {this.props.postData.nameOfProduct}</h2>
                    <h2>price: {this.props.postData.price}</h2>
                    <h2>numberOfShareUser: {this.props.postData.numberOfShareUser}</h2>
                    <h2>percentageOfPay: {this.props.postData.percentageOfPay}</h2>
                    <h2>description: {this.props.postData.description}</h2>
                    <h2>averageRating: {this.props.postData.averageRating}</h2>
                    <h2>created_at: {this.props.postData.created_at}</h2>
                    <img src={this.props.postData.photo}/>
                </Modal>
            </div>
        );
    }
}

export default PostPopup;