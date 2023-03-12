import {createStore , combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer , productDetailsReducer , productDeleteReducer , productCreateReducer , productUpdateReducer , productReviewCreateReducer  ,productTopRatedReducer , bannersListReducer , productBrandListReducer , productCategoryListReducer } from './reducers/productsReducers'
import {cartReducer} from './reducers/cartReducers'
import { orderCreateReducer , orderDetailsReducer , orderPayReducer , orderListMyReducer , orderListReducer , orderDeliverReducer  } from './reducers/orderReducers'
import {userLoginReducer , userListReducer , userRegisterReducer , userDetailsReducer ,userUpdateProfileReducer , userDeleteReducer , userUpdateReducer , verifyCodeReducer , resendCodeReducer} from './reducers/userReducers'


const reducer = combineReducers({
     productList : productListReducer,
     productDetails : productDetailsReducer,
     productDelete : productDeleteReducer,
     productCreate : productCreateReducer ,
     productUpdate : productUpdateReducer,
     productReviewCreate : productReviewCreateReducer , 
     productTopRated : productTopRatedReducer,
     productBrandList : productBrandListReducer,
     productCategoryList : productCategoryListReducer,
     bannersList : bannersListReducer,

     
     cart : cartReducer,
     
     userLogin : userLoginReducer , 
     userRegister : userRegisterReducer,
     userDetails : userDetailsReducer,
     userUpdateProfile : userUpdateProfileReducer,
     userList : userListReducer ,
     userDelete :userDeleteReducer,
     userUpdate : userUpdateReducer , 
     verifyCode : verifyCodeReducer , 
     resendCode : resendCodeReducer,

     orderCreate : orderCreateReducer,
     orderDetails : orderDetailsReducer,
     orderPay : orderPayReducer , 
     orderListMy : orderListMyReducer ,
     orderList : orderListReducer , 
     orderDeliver : orderDeliverReducer,
     
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null



const shippingAddressInfoFromStorage = localStorage.getItem('shippingAddrress') ?
    JSON.parse(localStorage.getItem('shippingAddrress')) : {}


const initialState = {
    cart:{cartItems: cartItemsFromStorage , shippingAddress:shippingAddressInfoFromStorage} ,
    userLogin : {userInfo : userInfoFromStorage },
    
}

const middleware = [thunk]

const store = createStore(reducer , initialState ,
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store