import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { remoteSavePost } from 'src/redux/create_post/actions';
import { fetchProfilePostData } from 'src/redux/profile/actions';
import { IRootState } from 'src/redux/store';
import './css/create_post.css';

interface IPostFormProps {
    userid: number;
    createPost: (productName: string, productPrice: string, productPricePercent: string, numberOfShareUser: string, productDescription: string, productCategory: string, photo: string, photoUrl: string, userid: number) => void;
    createPostLoadProfilePost: (userid: number) => void;
}


interface IPostFormState {
    productName: string;
    productPrice: string; // should be number in backend
    productPricePercent: string;
    numberOfShareUser: string;
    productDescription: string;
    productCategory: string;
    photo: string;
    photoUrl: string;
}


class PostFormBuilder extends React.Component<IPostFormProps, IPostFormState> {
    constructor(props: IPostFormProps) {
        super(props);

        this.state = {
            productName: '',
            productPrice: '',
            productPricePercent: '',
            // tslint:disable-next-line:object-literal-sort-keys
            numberOfShareUser: '',
            productDescription: '',
            productCategory: '',
            photo: '', // what's that????????
            photoUrl: '',
        };
    }

    public nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ productName: e.target.value })
    }

    public priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ productPrice: e.target.value });
    }

    public pricePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ productPricePercent: e.target.value });
    }

    public numberPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ numberOfShareUser: e.target.value });
    }

    public descriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ productDescription: e.target.value });
    }

    public productCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ productCategory: e.target.value });
    }

    public imageChange = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                photo: file, // useless ,can delete
                // tslint:disable-next-line:object-literal-sort-keys
                photoUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    public render() {
        const { userid } = this.props;

        const { photoUrl } = this.state;
        const $imagePreview = (photoUrl)? (<img src={photoUrl} />) : (<div id='imageframestyle'> Please select an Image for Preview</div>);
         

        return (
            <div className="static-modal" id="createPost">
                <div id="createBackground">
                    <form>

                        <Row className="cname">
                            <Col lg={6} id="cnameCol">
                                <input type="text" placeholder="Name of Product" onChange={this.nameChange} value={this.state.productName} />
                            </Col>
                        </Row>

                        <Row className="cphoto">
                            <Col>
                                {$imagePreview}
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6} xs={6} className="cphotoName1">
                                <button color="secondary">Upload Picture
                                <input type="file" onChange={this.imageChange} />
                                </button>{' '}
                            </Col>
                            <Col lg={6} xs={6} className="ccategory">
                                <select value={this.state.productCategory} onChange={this.productCategoryChange}>
                                    <option value="">Select Category</option>
                                    <option value="1">Fashion</option>
                                    <option value="2">Electric Product</option>
                                    <option value="3">Vehicle</option>
                                    <option value="4">Food & Drink</option>
                                    <option value="5">Toy</option>
                                    <option value="6">Others</option>
                                </select>
                            </Col>
                        </Row>


                        <Row className="cprice">
                            <Col lg={6} xs={6}>
                                <h5>Price:</h5>
                            </Col>
                            <Col lg={6} xs={6}>
                                <input type="number" placeholder="Price of Product" onChange={this.priceChange} value={this.state.productPrice} />
                            </Col>
                        </Row>


                        <Row className="cwilling">
                            <Col lg={6} xs={6}>
                                <h5>Price %:</h5>
                            </Col>
                            <Col lg={6} xs={6}>
                                <input type="number" placeholder="How much you willing to pay" onChange={this.pricePercentChange} value={this.state.productPricePercent} />
                            </Col>
                        </Row>


                        <Row className="cpeople">
                            <Col lg={6} xs={6}>
                                <h5>Number of People:</h5>
                            </Col>
                            <Col lg={6} xs={6}>
                                <input type="number" placeholder="How many people you tend to invite" onChange={this.numberPeopleChange} value={this.state.numberOfShareUser} />
                            </Col>
                        </Row>


                        <Row className="cdescription">
                            <Col lg={6} xs={6} id="cd1">
                                <h5>Description:</h5>
                            </Col>
                            <Col lg={6} xs={6} id="cd2">
                                <textarea placeholder="Description" onChange={this.descriptionChange} value={this.state.productDescription} />
                            </Col>
                        </Row>

                        <div id="createPostButton">
                            <Link to="/profile">
                                <button style={this.state.productName.length < 4? {color: '#b2b2b2'}:{color: 'black'}} disabled={this.state.productName.length < 4}
                                onMouseDown={this.props.createPost.bind(this, this.state.productName, this.state.productPrice, this.state.productPricePercent,
                                    this.state.numberOfShareUser,
                                    this.state.productDescription, this.state.productCategory, this.state.photo, this.state.photoUrl, userid)} onMouseUp={this.props.createPostLoadProfilePost.bind(this, this.props.userid)}>POST</button>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (rootState: IRootState) => {
    return {
        userid: rootState.islogin.userid
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        createPost: (productName: string, productPrice: string, productPricePercent: string, numberOfShareUser: string, productDescription: string, productCategory: string, photo: string, photoUrl: string, userid: number) => dispatch(remoteSavePost(productName, productPrice, productPricePercent, numberOfShareUser, productDescription, productCategory, photo, photoUrl, userid)),
        createPostLoadProfilePost: (userid: number) => dispatch(fetchProfilePostData(userid)),
    }
 }
 

const PostForm = connect(mapStateToProps, mapDispatchToProps)(PostFormBuilder)

export default PostForm;