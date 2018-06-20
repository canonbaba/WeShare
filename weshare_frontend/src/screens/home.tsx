import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import ButtonDropdown from 'reactstrap/lib/ButtonDropdown';
import Col from 'reactstrap/lib/Col';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import Row from 'reactstrap/lib/Row';
import './css/Homepage.css';



interface IHomeState {
    dropdownOpen: boolean
}

class Home extends React.Component<{}, IHomeState> {
    constructor(props: {}) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    public toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    public render() {
        return (
            <div className="static-modal">

                <h1>HOMEAGE</h1>
                <Container>
                    <Row>
                        <Col className="cat" xl="2" md="2">
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle>
                                    Category
                                    </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Electric Product</DropdownItem>
                                    <DropdownItem>Vehicle</DropdownItem>
                                    <DropdownItem>Video Game</DropdownItem>
                                    <DropdownItem>Food＆Drink</DropdownItem>
                                    <DropdownItem>Toy</DropdownItem>
                                    <DropdownItem>Others</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                        <Col xl="8" md="8"><input type="text" placeholder="Search..." /></Col>
                        <Col xl="2" md="2"><button type="submit">GO</button></Col>
                    </Row>
                    <div className="post">
                        <div>Content</div>
                    </div>
                </Container>
                <div>
                    <Link to="/postform">
                    <button type="submit">Post</button>
                    </Link>
                </div>
            </div>
        );
    }
}


export default Home;