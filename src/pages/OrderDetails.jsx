import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { approveOrderStatus, fetchSingleOrder, updateOrderStatus } from "../slices/orderSlice";
// import { mapApiOrderToComponent } from "../utils/orderMapper"; // Import the mapping function
import OrderProductTable from "../components/OrderProductTable";
import TaxSummary from "../components/TaxSummary";
import QRCodeComponent from "../components/QrCode";
import Breadcrumb from "../components/Breadcrumb";
import Loader from "../components/Loader";
import ConfirmationModal from "../components/ConformationModal";

const mutedFgClass = "text-muted-foreground dark:text-muted-foreground";
const inputClasses =
  "bg-input border text-sm border-border rounded-md py-2 px-3 pr-8 text-primary focus:outline-none focus:ring focus:ring-primary focus:border-primary/80";

const formatCurrency = (amount) => {
  const currency = process.env.REACT_APP_CURRENCY || "EUR"; // Updated default to EUR to match API
  const symbol =
    currency === "USD"
      ? "$"
      : currency === "EUR"
      ? "€"
      : currency === "GBP"
      ? "£"
      : currency === "INR"
      ? "₹"
      : "";

  return `${symbol}${amount.toFixed(2)}`;
};

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order: apiOrder, loading, error } = useSelector((state) => state.orders);
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState("");
  const [update, setUpdate] = useState(0);
  const [mappedOrder, setMappedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [dispatch, id, update]);

  useEffect(() => {
    if (apiOrder) {
      // Map the API order to the component format
      const mapped = mapApiOrderToComponent(apiOrder);
      setMappedOrder(mapped);
      if (mapped && mapped.orderState) {
        setStatus(mapped.orderState);
      }
    }
  }, [apiOrder]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setPendingStatus(newStatus);
    setIsModalOpen(true);
  };
 
  const confirmStatusChange = () => {
    setStatus(pendingStatus);
    dispatch(
      updateOrderStatus( { orderId:id, version:apiOrder.version, orderState:pendingStatus  })
    ).then(() => {
      dispatch(fetchSingleOrder(id));
    });
    setIsModalOpen(false);
  };

  const cancelStatusChange = () => {
    setIsModalOpen(false);
  };
 
  const handleApprovalClick = () => {
    dispatch(approveOrderStatus({ orderId:id, version:apiOrder.version })).then(() => {
      dispatch(fetchSingleOrder(id));
      setUpdate((pre) => pre + 1);
    });
  };
  
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mappedOrder) {
    return <div>No order found</div>;
  }

 
  const {
    customer,
    orderState,
    lines,
    total,
    subTotal,
    shipping,
    taxSummary,
    payments,
    shippingAddress,
    createdAt,
    updatedAt,
    nextStates,
    fulfillments,
    deliveryType,
  } = mappedOrder;
  const isApproved = fulfillments !== undefined;
  
  const getBadgeColor = () => {
    switch (deliveryType) {
      case "Standard Shipment":
        return "bg-blue-400 text-white";
      case "ship":
        return "bg-green-400 text-white";
      case "pickup":
        return "bg-orange-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };
  
  const discount =
    lines?.reduce((acc, el) => {
      return acc + el.linePrice;
    }, 0) - subTotal;
    
  return (
    <div className="p-2 bg-white dark:bg-black rounded-lg">
      <div className="mb-6">
        <Breadcrumb />
      </div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold dark:text-card-foreground">
          Order: #{id}
        </h2>
        <button
          onClick={handleApprovalClick}
          disabled={isApproved}
          className={`${
            isApproved
              ? "bg-[#f8a4b8] text-white"
              : "bg-primary text-white dark:bg-primary-foreground dark:text-primary-foreground"
          } px-4 py-2 rounded-md`}
        >
          {isApproved ? "Approved" : "Approve"}
        </button>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-grow md:mr-4">
          <div className="mt-6">
            <OrderProductTable
              items={lines?.map((line) => ({
                name: line.productVariant.name,
                sku: line.productVariant.sku,
                unitPrice: formatCurrency(line.linePrice),
                quantity: line.quantity,
                total: formatCurrency(line.linePrice * line.quantity),
                image: line.featuredAsset.preview,
              }))}
              summary={{
                totalDiscount: `- ${formatCurrency(discount || 0)}`,
                subTotal: formatCurrency(total-shipping),
                shipping: formatCurrency(shipping),
                total: formatCurrency(total),
              }}
            />
          </div>
          <div className="mt-6">
            <TaxSummary
              taxSummary={taxSummary?.map((tax) => ({
                description: tax.description,
                taxRate: `${tax.taxRate}%`,
                taxBase: formatCurrency(tax.taxBase),
                taxTotal: formatCurrency(tax.taxTotal),
              }))}
            />
          </div>
        </div>
        <div className="rounded-lg bg-card text-card-foreground dark:bg-card dark:text-card-foreground">
          <div className="p-4 mb-4 bg-card border border-border rounded-lg md:mt-6">
            <div className="text-muted font-semibold">Status</div>
            <hr />
            <div className={`flex items-center justify-between mt-2 `}>
              <select
                className={`w-full ${inputClasses} ${
                  orderState === "Complete"
                    ? "bg-green-100"
                    : orderState === "Open"
                    ? "bg-orange-100"
                    : orderState === "Cancelled"
                    ? "bg-red-200"
                    : "bg-blue-200"
                } px-4 py-2 font-semibold border rounded ${
                  !isApproved ? "bg-gray-200 text-black" : ""
                }`}
                name="state"
                id="state"
                value={status}
                onChange={handleStatusChange}
                disabled={!isApproved}
              >
                <option value={orderState}>{orderState}</option>
                {nextStates?.map((nextState, i) => (
                  <option
                    key={i}
                    value={nextState}
                    disabled={!isApproved}
                  >
                    {nextState}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Customer</h2>
            <hr />
            <div className="flex items-center my-4">
              <img
                alt="user-icon"
                src="https://openui.fly.dev/openui/24x24.svg?text=👤"
                className="w-6 h-6 mr-2"
              />
              <span className="text-primary font-medium">
                {customer?.firstName} {customer?.lastName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div>Delivery Type:</div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor()}`}
              >
                {deliveryType?.charAt(0)?.toUpperCase() + deliveryType?.slice(1)}
              </span>
            </div>
            {shippingAddress && (
              <>
                <h3 className="text-md font-semibold mb-1 mt-2">Shipping address</h3>
                <hr />
                <p className="text-muted-foreground mt-2">
                  {shippingAddress.company && `${shippingAddress.company}\n`}
                  {shippingAddress.streetLine1}
                  {shippingAddress.streetLine2 && ` ${shippingAddress.streetLine2}`}
                  <br />
                  {shippingAddress.city}, {shippingAddress.province}{" "}
                  {shippingAddress.postalCode}
                  <br />
                  📍 {shippingAddress.country}
                  <br />
                  📞 {shippingAddress.phoneNumber}
                </p>
              </>
            )}
          </div>
          <div className="my-4 p-4 rounded-lg border border-border">
            <h2 className="text-lg pb-2 font-semibold">Payments</h2>
            <hr />
            <div className="bg-card mt-2 text-muted-foreground dark:bg-card dark:text-muted-foreground">
              <div className="flex justify-between">
                <p>
                  Payment{" "}
                  <span className="font-semibold text-primary dark:text-primary">
                    {formatCurrency(payments?.[0]?.amount || 0)}
                  </span>
                </p>
                <p>
                  <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full dark:bg-green-500 dark:text-white">
                    Settled
                  </span>
                </p>
              </div>
              <p>Payment method: {payments?.[0]?.method || "N/A"}</p>
              <p>
                Amount:{" "}
                <span className="font-semibold dark:text-primary">
                  {formatCurrency(payments?.[0]?.amount || 0)}
                </span>
              </p>
              <p>
                Transaction ID:{" "}
                <span className="font-semibold">
                  {payments?.[0]?.transactionId || "N/A"}
                </span>
              </p>
            </div>
          </div>
          <div
            className={`rounded-lg border border-border p-4 ${mutedFgClass}`}
          >
            <p className="py-2">
              ID: <span className="font-semibold">{id}</span>
            </p>
            <hr />
            <p className="pt-2">
              Created at:{" "}
              <span className="font-semibold">
                {new Date(createdAt).toLocaleString()}
              </span>
            </p>
            <p>
              Updated at:{" "}
              <span className="font-semibold">
                {new Date(updatedAt).toLocaleString()}
              </span>
            </p>
            <QRCodeComponent orderId={id} />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmStatusChange}
        onCancel={cancelStatusChange}
        message={`Are you sure you want to change the order status to "${pendingStatus}"?`}
        status={pendingStatus}
      />
    </div>
  );
};

export default OrderDetails;
/**
 * Maps the API order data to the format expected by the OrderDetails component
 * @param {Object} apiOrder - The order data from the API
 * @return {Object} The transformed order data
 */
export const mapApiOrderToComponent = (apiOrder) => {
  if (!apiOrder) return null;
  
  // Extract line items
  const lines = apiOrder.lineItems.map(item => ({
    productVariant: {
      name: item.name["en-US"] || Object.values(item.name)[0],
      sku: item.variant.sku
    },
    quantity: item.quantity,
    linePrice: item.totalPrice.centAmount / 100, // Convert cents to base currency
    featuredAsset: {
      preview: item.variant.images?.[0]?.url || "https://openui.fly.dev/openui/24x24.svg?text=📦"
    }
  }));

  // Extract tax summary
  const taxSummary = apiOrder.taxedPrice?.taxPortions.map(tax => ({
    description: tax.name,
    taxRate: tax.rate * 100, // Convert decimal to percentage
    taxBase: apiOrder.taxedPrice.totalNet.centAmount / 100,
    taxTotal: tax.amount.centAmount / 100
  }));

  // Calculate subtotal
  const subTotal = apiOrder.taxedPrice?.totalNet.centAmount / 100 || 0;
  
  // Extract shipping cost
  const shipping = apiOrder.shippingInfo?.price.centAmount / 100 || 0;
  
  // Extract payment information
  const payments = apiOrder.paymentInfo?.payments.map(payment => ({
    method: "Credit Card", // Default since actual method isn't specified in the API
    amount: apiOrder.totalPrice.centAmount / 100,
    transactionId: payment.id
  }));

  // Determine next possible states based on current state
  let nextStates = [];
  switch(apiOrder.orderState) {
    case "Open":
      nextStates = ["Confirmed", "Complete", "Cancelled"];
      break;
    case "Confirmed":
      nextStates = ["Complete", "Cancelled"];
      break;
    case "InProgress":
      nextStates = ["Shipped", "Cancelled"];
      break;
    case "Shipped":
      nextStates = ["Delivered", "Returned"];
      break;
    case "Delivered":
      nextStates = ["Complete", "Returned"];
      break;
    case "Complete":
      nextStates = ["Cancelled"];
      break;
    case "Cancelled":
      nextStates = [];
      break;
    default:
      nextStates = [];
  }

  // Map shipping address
  const shippingAddress = apiOrder.shippingAddress ? {
    company: "",
    streetLine1: `${apiOrder.shippingAddress.streetName} ${apiOrder.shippingAddress.streetNumber}`,
    streetLine2: "",
    city: apiOrder.shippingAddress.city,
    province: apiOrder.shippingAddress.region || "",
    postalCode: apiOrder.shippingAddress.postalCode,
    country: apiOrder.shippingAddress.country,
    phoneNumber: apiOrder.shippingAddress.mobile
  } : null;

  // Extract customer information
  const customer = {
    firstName: apiOrder.shippingAddress?.firstName || "",
    lastName: apiOrder.shippingAddress?.lastName || ""
  };

  // Determine delivery type
  let deliveryType =  apiOrder.custom.fields.deliveryType || "Standard Shipment";

  return {
    order: {
      state: apiOrder.orderState
    },
    customer,
    orderState: apiOrder.orderState,
    lines,
    total: apiOrder.totalPrice.centAmount / 100,
    subTotal,
    shipping,
    taxSummary,
    payments,
    shippingAddress,
    createdAt: apiOrder.createdAt,
    updatedAt: apiOrder.lastModifiedAt,
    nextStates,
    fulfillments: apiOrder.custom.fields.isApproved ,
    deliveryType
  };
};