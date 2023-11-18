import React from 'react'
import '../src/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Pages/Home'
import Contact from './components/Pages/Contact'
import Products from './components/Pages/Products'
import Product from './components/Pages/Product'
import Cart from './components/Pages/Cart'
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import OrderList from './components/Pages/OrderList'
import AddProduct from './components/Admin/AddProduct'
import EditProduct from './components/Admin/EditProduct'
import ViewProduct from './components/Admin/ViewProduct'
import AdminNavBar from './components/Admin/AdminNavBar'

function App() {
  return (
    <>
      <div id="page-container">
        <div id="content-wrap">
         
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/product' element={<Product />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/orderlist/:id' element={<OrderList/>} /> 
              <Route path='/contact' element={<Contact />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/forgot_password' element={<ForgotPassword />} />
              <Route path='/reset_password/:token' element={<ResetPassword />} />
              <Route path='/addProduct' element={<AddProduct />} />
              <Route path='/editProduct' element={<EditProduct />} />
              <Route path='/viewProduct' element={<ViewProduct />} />
              <Route path='/adminNavBar' element={<AdminNavBar />} />
            </Routes>
          </BrowserRouter>
        </div>
        
      </div>
    </>
  )
}

export default App