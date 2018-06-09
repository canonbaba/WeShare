import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class Example extends React.Component<{}, {show:boolean}> {
    constructor(props: {}, show:boolean) {
      super(props, show);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
      };
    }
  
    public handleClose() {
      this.setState({ show: false });
    }
  
    public handleShow() {
      this.setState({ show: true });
    }
  
    public render() {
  
      return (
        <div>
          <p>Click to get the full Modal experience!</p>
          <Button color="primary">Primary</Button>
          <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
        LOL
        </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton={true}>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Text in a modal</h4>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  


export default Example; 



  