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
        return result?.data;

    } catch (err) {

    }

}

export const getProductBySlug = async (slug) => {
    let url = API_BASE_URL + API_URLS.GET_PRODUCT(slug);
    try {
        const result = await axios(url, {
            method: 'GET'
        })
        return result.data
    } catch (err) {
        console.log(err);
    }

}