import { API_BASE_URL, API_URLS } from './constant'
import axios from 'axios'

export const getAllProducts = async (id, typeId) => {
    let url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?categoryId=${id}`;
    if (typeId) {
        url = url + `&typeId=${typeId}`;
    }

    try {
        const result = await axios(url, {
            method: 'GET'
        })
        console.log("products ", result.data)
        return result?.data;

    } catch (err) {

    }

}