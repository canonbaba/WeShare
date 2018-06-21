import * as React from 'react';
import { Glyphicon, Modal } from 'react-bootstrap';


interface IPostPopupProps {
    postPopup: boolean;
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
                </Modal>
            </div>
        );
    }
}

export default PostPopup;