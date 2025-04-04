import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../slices/orderSlice';
import OrderList from './OrderList';
import Loader from './Loader';

const OrderListComponent = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // You can also pass the query based on your needs
  // dispatch(fetchOrders('complete')); // Example for completed orders

  return (
    <div>
      {loading && <Loader/>}
      {error && <p>Error: {error}</p>}
      <OrderList Heading="All Orders " show={true} customerOrders={orders} />
    </div>
  );
};

export default OrderListComponent;
