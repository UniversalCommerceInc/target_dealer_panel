import React from 'react';
const data = {
    createdAt: "7/22/24, 2:46 PM",
    paymentSettled: {
      amount: "$191.47",
      details: "Payment details",
      transitions: [
        { from: "PaymentAuthorized", to: "PaymentSettled", time: "7/22/24, 2:46 PM" },
        { id: "ze0hsabxpl", from: "Created", to: "Authorized", time: "7/22/24, 2:46 PM" },
        { from: "ArrangingPayment", to: "PaymentAuthorized", time: "7/22/24, 2:46 PM" },
        { from: "AddingItems", to: "ArrangingPayment", time: "7/22/24, 2:46 PM" },
        { from: "Created", to: "AddingItems", time: "7/22/24, 2:46 PM" }
      ]
    }
  };


  const OrderHistory = () => {
    return (
      <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <div className="border-b pb-2">
          <div className="text-lg font-medium text-black">Order created</div>
          <div className="text-gray-500">{data.createdAt}</div>
        </div>
        <div className="border-b pb-2">
          <div className="text-lg font-medium text-black">Payment settled</div>
          <div className="text-green-500 font-semibold">{data.paymentSettled.amount}</div>
          <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Details</button>
        </div>
        {data.paymentSettled.transitions.map((transition, index) => (
          <div key={index} className="border-b py-2">
            <div className="text-sm text-black">Order transitioned from <span className="font-semibold">{transition.from}</span> to <span className="font-semibold">{transition.to}</span></div>
            <div className="text-gray-500">{transition.time}</div>
          </div>
        ))}
      </div>
    );
  }
  
  export default OrderHistory;
  