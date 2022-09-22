import { HTTP } from '../utils/HTTP';

import {
    SHOW_LOADER,
    HIDE_LOADER
} from './../constants/actionTypes';


export function uploadMedia({ type, imageData, name, isCompress }) {
    console.log("ty and daata",type,imageData);
    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            
            const formData = new FormData();
            console.log("image data",imageData);
            console.log("imageData.originFileObj",imageData.originFileObj);
            if (type === 'file') {
                formData.append('file', imageData);
            } else {
                formData.append('file', imageData.originFileObj);
            }
            
            const token = localStorage.getItem('auth');

            let uri = `/upload/media?type=${type}&name=${name}`;

            if(isCompress){

                uri = `${uri}&isCompress=${isCompress}`

            }

            HTTP('post', uri, formData, { 'content-type': 'multipart/form-data', Authorization: `Bearer ${ token }` })
                .then(function (response) {
                    console.log("response in upload media ==>>", response)
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in upload media", error)
                    reject(error);
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}