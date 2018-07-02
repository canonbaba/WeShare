import axios from 'axios';
import { Dispatch } from 'redux';
import { IPostForm } from 'src/models';
import swal from 'sweetalert';

export const POST_SAVE = 'POST_SAVE';
export type POST_SAVE = typeof POST_SAVE;

export interface IPostSaveAction {
    type: POST_SAVE;
    users: IPostForm;
}

export type IPostFormAction = IPostSaveAction;

export function remoteSavePost(productName: string, productPrice: string, productPricePercent: string, numberOfShareUser: string, productDescription: string, productCategory: string, photo: string, photoUrl: string, userid: number) {
    // tslint:disable-next-line:no-console
    console.log(productName,userid,productDescription)
    return (dispatch: Dispatch<IPostFormAction>) => {
        axios
            .post(`${process.env.REACT_APP_API_SERVER}/api/post_form`, {
                productName,
                productPrice,
                productPricePercent,
                // tslint:disable-next-line:object-literal-sort-keys
                numberOfShareUser,
                productDescription,
                productCategory,
                photo, // it just show {}, delete???
                photoUrl,
                userid
            }).then(res => {

                swal('Save Successful');
                // dispatch(nothinghere(res.data))
            }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log(err)
            });
    }
}