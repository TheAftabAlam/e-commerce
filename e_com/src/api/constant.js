export const API_URLS = {
    GET_PRODUCTS:'/api/products',
    GET_PRODUCT: (slug) => `/api/products/${slug}`,
    GET_CATEGORIES:'/api/category',
    GET_CATEGORY: (id) => `/api/category/${id}`,
}

export const API_BASE_URL = 'http://localhost:8080';