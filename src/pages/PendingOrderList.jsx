import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../slices/orderSlice';
import OrderList from '../components/OrderList';
import Loader from '../components/Loader';

const PendingOrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders('Open')); // Fetch pending orders
  }, [dispatch]);

  // Handle loading and error states
  if (loading) {
    return <Loader/>;
  }

  // if (error) {
  //   return <div>Error fetching orders: {error}</div>;
  // }

  return (
    <OrderList Heading="Pending Orders" show={false} customerOrders={orders} />
  );
};

export default PendingOrderList;
