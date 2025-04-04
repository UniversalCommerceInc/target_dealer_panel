import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import LogIn from '../pages/Login'
import SignUp from '../pages/Signup'
import Dashboard from '../pages/Dashboard'

import DefaultLayout from '../pages/DefaultLayout'
import ProductList from '../pages/ProductList'
import AllOrderList from '../pages/AllOrderList'
import PendingOrderList from '../pages/PendingOrderList'
import CompleteOrderList from '../pages/CompleteOrderList'
import Profile from '../pages/Profile'
import Scan_order from '../pages/Scan_order'

import ProductDetails from '../pages/ProductDetails'

import PageNotFound from '../pages/PageNotFound'
import CreateProduct from '../pages/CreateProduct'
import OrderDetails from '../pages/OrderDetails'
import CanceledOrderList from '../pages/CanceledOrderList'
import Varients from '../pages/Varients'
import MediaComponent from '../components/MediaComponent'
import Transactions from '../components/Transation'



const AllRoutes = () => {
 

  return (
    <><Routes>
        <Route path="/" element={<DefaultLayout><Dashboard/></DefaultLayout>} />
        <Route path="/dashboard" element={<DefaultLayout><Dashboard/></DefaultLayout>} />
        <Route path="/auth/sign-in" element={<LogIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path='/all-orders' element={<DefaultLayout><AllOrderList/></DefaultLayout>} />
        <Route path='/orders/pending' element={<DefaultLayout><PendingOrderList/></DefaultLayout>} />
        <Route path='/orders/completed' element={<DefaultLayout><CompleteOrderList/></DefaultLayout>} />
        <Route path='/orders/cancel' element={<DefaultLayout><CanceledOrderList/></DefaultLayout>} />

        <Route path='/order/:id' element={<DefaultLayout><OrderDetails/></DefaultLayout>} />
        <Route path='/profile' element={<DefaultLayout><Profile/></DefaultLayout>} />
        <Route path='/scan-order' element={<DefaultLayout><Scan_order/></DefaultLayout>} />
        <Route path='/products' element={<DefaultLayout><ProductList/></DefaultLayout>} />
        <Route path='/product/:id' element={<DefaultLayout><ProductDetails/></DefaultLayout>} />
        <Route path='/products/create' element={<DefaultLayout><CreateProduct/></DefaultLayout>} />
        <Route path='/product/:productId/varients/:varientId' element={<DefaultLayout><Varients/></DefaultLayout>} />
        <Route path='/media' element={<Transactions/>} />
        <Route path="*" element={<PageNotFound />} />

        </Routes>
       {/* {isAuth&& <DefaultLayout>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/all-orders' element={<AllOrderList/>} />

        <Route path='/orders/pending' element={<PendingOrderList/>} />
        <Route path='/orders/completed' element={<CompleteOrderList/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/scan-order' element={<Scan_order/>} />
        <Route path='/products' element={<ProductList/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />

       
        <Route path="*" element={<PageNotFound />} />
      </Routes>
        </DefaultLayout>} */}
      
    </>
  )
}

export default AllRoutes