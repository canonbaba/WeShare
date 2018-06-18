import * as React from 'react';
import { Button } from 'react-bootstrap';
import './css/create_post.css';

interface IPostFormState {
    product_name: string;
    product_price: string;
    product_pricepercent: string;
    product_description: string;
    photo: string;
    photo_url: string;
}

class PostFormBuilder extends React.Component<{}, IPostFormState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            product_name: '',
            product_price: '',
            product_pricepercent: '',
            // tslint:disable-next-line:object-literal-sort-keys
            product_description: '',
            photo: '',
            photo_url: ''
        };
    }

    public nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ product_name: e.target.value })
    }

    public priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ product_price: e.target.value });
    }

    public pricePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ product_pricepercent: e.target.value });
    }

    public descriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ product_description: e.target.value });
    }

    public imageChange = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                photo: file,
                // tslint:disable-next-line:object-literal-sort-keys
                photo_url: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    public render() {

        const { photo_url } = this.state;
        let $imagePreview = null;
        if (photo_url) {
            $imagePreview = (<img src={photo_url} />);
        } else {
            $imagePreview = (<div className='imageframestyle'>Please select an Image for Preview</div>);
        }

        return (
            <div className="static-modal">
                <form>
                    <h1>Invitation</h1>
                    <h5>Name of Product</h5>
                    <input type="text" placeholder="name" onChange={this.nameChange} value={this.state.product_name} />

                    <h5>Price</h5>
                    <input type="text" placeholder="$" onChange={this.priceChange} value={this.state.product_price} />

                    <h5>Percentage of Price</h5>
                    <input type="text" placeholder="how much you willing to pay" onChange={this.pricePercentChange} value={this.state.product_pricepercent} />

                    <h5>Description</h5>
                    <textarea placeholder="Description" onChange={this.descriptionChange} value={this.state.product_description} />


                    <input className="fileInput"
                        type="file"
                        onChange={this.imageChange} value={this.state.product_description} />
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>


                    <h5>Select</h5>
                    <select>
                        <option value="">Please select</option>
                        <option value="fashion">Fashion</option>
                    </select>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        );
    }
}

// const PostForm = connect(mapStateToProps, mapDispatcgToProps)(PostFormBuilder)

export default PostFormBuilder;