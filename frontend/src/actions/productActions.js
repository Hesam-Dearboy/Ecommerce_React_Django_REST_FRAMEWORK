import { 
    PRODUCT_LIST_FAIL ,
    PRODUCT_LIST_REQUEST ,
    PRODUCT_LIST_SUCCESS,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,

    PRODUCT_BRAND_LIST_FAIL,
    PRODUCT_BRAND_LIST_REQUEST,
    PRODUCT_BRAND_LIST_SUCCESS,

    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,

    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,


    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,


    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,

    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,

    BANNER_FAIL,
    BANNER_REQUEST,
    BANNER_SUCCESS,


    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    
} from '../constants/porductConstants'
import axios from 'axios'


export const listProducts = (keyword = '' , page = 1 , brand= '' , category='') => async(dispatch) =>{

    if(page === null){
        page = 1
    }else{
        page = page
    }
    

    if(brand === null){
        brand = ''
    }else{
        brand = brand
    }

    if(category === null){
        category = ''
    }else{
        category = category
    }

    try{
        dispatch({type : PRODUCT_LIST_REQUEST})
        
        const{data} = await axios.get(`/api/products?keyword=${keyword}&brandName=${brand}&categoryName=${category}&page=${page}`)

        dispatch({
            type : PRODUCT_LIST_SUCCESS , 
            payload : data
        })

    }catch(error){
        dispatch({

            type : PRODUCT_LIST_FAIL ,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message ,

        })
    }
}

export const listBrandProducts = (brandName = '') => async(dispatch) =>{
    try{
        dispatch({type : PRODUCT_BRAND_LIST_REQUEST})
        
        const{data} = await axios.get(`/api/products/brand${brandName}`)

        dispatch({
            type : PRODUCT_BRAND_LIST_SUCCESS , 
            payload : data
        })

    }catch(error){
        dispatch({

            type : PRODUCT_BRAND_LIST_FAIL ,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message ,

        })
    }
}

export const listCategoryProducts = (categoryName = '') => async(dispatch) =>{
    try{
        dispatch({type : PRODUCT_CATEGORY_LIST_REQUEST})
        
        const{data} = await axios.get(`/api/products/category${categoryName}`)

        dispatch({
            type : PRODUCT_CATEGORY_LIST_SUCCESS , 
            payload : data
        })

    }catch(error){
        dispatch({

            type : PRODUCT_CATEGORY_LIST_FAIL ,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message ,

        })
    }
}





export const listTopProducts = () => async(dispatch) =>{
    try{
        dispatch({type : PRODUCT_TOP_REQUEST})
        
        const{data} = await axios.get(`/api/products/top/`)

        dispatch({
            type : PRODUCT_TOP_SUCCESS , 
            payload : data
        })

    }catch(error){
        dispatch({

            type : PRODUCT_TOP_FAIL ,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message ,

        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteProduct = (id) => async (dispatch , getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin : {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )

        
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL ,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProduct = () => async (dispatch , getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin : {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/create/`,
            {},
            config
        )

        
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload : data ,           
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL ,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateProduct = (product) => async (dispatch , getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin : {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )

        
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload : data ,           
        })

        dispatch({type : PRODUCT_DETAILS_SUCCESS , payload : data})

    }catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL ,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createReviewProduct = (productId , review) => async (dispatch , getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin : {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )

        
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload : data ,           
        })

        
    }catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL ,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listBanners = () => async(dispatch) =>{
    try{
        dispatch({type : BANNER_REQUEST})
        
        const{data} = await axios.get(`/api/products/banners/`)

        dispatch({
            type : BANNER_SUCCESS , 
            payload : data
        })

    }catch(error){
        dispatch({

            type : BANNER_FAIL ,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message ,

        })
    }
}