import axios from 'axios';
import config from '../constants/Config';

export async function HTTP (method, uri, data, headers = null, params = null) {

    let url = (config.API_URL + uri);


    let query = {
        method: method,
        url: url
    };

    if (headers !== null) {
        query.headers = headers;
    }

    if (params !== null) {
        query.params = params;
    }

    if (method === 'post' || method === 'put' || method === 'delete' || method === 'patch') {
        query.data = data;
    }

    console.log("Query after header & params: ", query);

    const response = await axios(query);

    console.log("response from axios received: ");

    return response;

}
