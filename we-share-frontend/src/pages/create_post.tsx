import * as React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { remoteSavePost } from 'src/redux/create_post/actions';
import { IRootState } from 'src/redux/store';
import './css/create_post.css';

interface IPostFormProps {
    userid: number;
    createPost: (productName: string, productPrice: string, productPricePercent: string, numberOfShareUser: string, productDescription: string, productCategory: string, photo: string, photoUrl: string, userid: number) => void;
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
        let $imagePreview = null;
        if (photoUrl) {
            $imagePreview = (<img src={photoUrl} />);
        } else {
            $imagePreview = (<div className='imageframestyle'>Please select an Image for Preview</div>);
        }

        return (
            <div className="static-modal">
                <form>
                    <h1>Invitation</h1>
                    <h5>Name of Product</h5>
                    <input type="text" placeholder="name" onChange={this.nameChange} value={this.state.productName} />

                    <h5>Price</h5>
                    <input type="text" placeholder="$" onChange={this.priceChange} value={this.state.productPrice} />

                    <h5>Percentage of Price</h5>
                    <input type="text" placeholder="how much you willing to pay" onChange={this.pricePercentChange} value={this.state.productPricePercent} />

                    <h5>Number of People</h5>
                    <input type="text" placeholder="how many you tend to invite" onChange={this.numberPeopleChange} value={this.state.numberOfShareUser} />

                    <h5>Description</h5>
                    <textarea placeholder="Description" onChange={this.descriptionChange} value={this.state.productDescription} />


                    <input className="fileInput"
                        type="file"
                        onChange={this.imageChange} />
                    <div>
                        {$imagePreview}
                    </div>


                    <h5>Select</h5>
                    <select value={this.state.productCategory} onChange={this.productCategoryChange}>
                        <option value="">Please select</option>
                        <option value="1">Fashion</option>
                        <option value="2">electric product</option>
                        <option value="3">vehicle</option>
                        <option value="4">food & drink</option>
                        <option value="5">toy</option>
                        <option value="6">others</option>
                    </select>

                    <Link to='/home'>
                        <Button onClick={this.props.createPost.bind(this, this.state.productName, this.state.productPrice, this.state.productPricePercent,
                            this.state.numberOfShareUser,
                            this.state.productDescription, this.state.productCategory, this.state.photo, this.state.photoUrl, userid)}>Submit</Button>
                    </Link>
                </form>
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
        createPost: (productName: string, productPrice: string, productPricePercent: string, numberOfShareUser: string, productDescription: string, productCategory: string, photo: string, photoUrl: string, userid: number) => dispatch(remoteSavePost(productName, productPrice, productPricePercent, numberOfShareUser, productDescription, productCategory, photo, photoUrl, userid))
    }
}

const PostForm = connect(mapStateToProps, mapDispatchToProps)(PostFormBuilder)

export default PostForm;