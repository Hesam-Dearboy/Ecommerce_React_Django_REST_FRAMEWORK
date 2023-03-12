import React from 'react'
import Homescreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import { HashRouter , Route, Routes} from 'react-router-dom'
import CartScreen from './pages/CartScreen'
import Test from './components/test'
import Test2 from './components/test2'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Loginscreen from './pages/Loginscreen'
import RegisterScreen from './pages/RegisterScreen'
import ProfileScreen from './pages/ProfileScreen'
import ShippingScreen from './pages/ShippingScreen'
import PlaceOrderScreen from './pages/PlaceOrderScreen'
import OrderScreen from './pages/OrderScreen'
import UserListScreen from './pages/UserListScreen'
import UserEditScreen from './pages/UserEditScreen'
import PaymentScreen from './pages/PaymentScreen'
import BrandsProductsList from './pages/BrandsProductsList'
import ProductListScreen from './pages/ProductListScreen'
import OrderListScreen from './pages/OrderListScreen'
import ProductEditScreen from './pages/ProductEditScreen'
import SearchScreen from './pages/SearchScreen'
import CodeVerify from './pages/CodeVerify'
import CategoryProducts from './pages/CategoryProducts'
import ScrollTop from './components/ScrollTop'





function App() {
  return (
    <HashRouter>
    <ScrollTop/>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Homescreen/>} />
        <Route path='/product/:_id' element={<ProductScreen/>} />
        <Route path='/brands' element={<BrandsProductsList/>} />
        <Route path='/category' element={<CategoryProducts/>} />
        <Route path='/cart/:_id?' element={<CartScreen/>}/>
        <Route path='/order/:id' element={<OrderScreen/>}/>
        <Route path='/login' element={<Loginscreen/>}/>
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/codeverify' element={<CodeVerify/>} />
        <Route path='/profile' element={<ProfileScreen/>} />
        <Route path='/shipping' element={<ShippingScreen/>} />
        <Route path='/placeorder' element={<PlaceOrderScreen/>} />
        <Route path='/login/shipping' element={<ShippingScreen/>} />
        <Route path='/payment' element={<PaymentScreen/>} />
        <Route path='/admin/userlist' element={<UserListScreen/>} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
        <Route path='/admin/productlist' element={<ProductListScreen/>} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />
        <Route path='/admin/orderlist' element={<OrderListScreen/>} />
        <Route path='/search' element={<SearchScreen/>} />
        <Route path='/test' element={<Test/>} />
        <Route path='/test2' element={<Test2/>} />

      </Routes>
     </HashRouter>
  )
}

export default App