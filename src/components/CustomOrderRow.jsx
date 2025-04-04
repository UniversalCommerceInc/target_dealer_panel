// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchAllOrders, updateOrderStatus } from "../slices/orderSlice";
// import toast, { Toaster } from "react-hot-toast";

// const CustomerOrderRow = ({ customer, lines, createdAt, hide, id, state,fulfillments }) => {
//   const [buttonText, setButtonText] = useState("");
//   const [confirmationEnabled, setConfirmationEnabled] = useState(true);
//   const navigate = useNavigate();
//   const [textColor,setColor]=useState("text-blue-500")
// const dispatch = useDispatch();
// const orderstate=useParams();
//   useEffect(() => {
//     // Set button text and confirmation state based on the order state
//     if(fulfillments?.[0]?.id && state=="PaymentSettled"){
//       setButtonText("Approved");
//       setConfirmationEnabled(false);

//     }else{

    
//     switch (state) {
//       case "Delivered":
//         setButtonText("Delivered");
//         setColor("text-green-400")
//         setConfirmationEnabled(false);
//         break;
//       case "Cancelled":
//         setButtonText("Cancelled");
//         setColor("text-red-400")

//         setConfirmationEnabled(false);
//         break;
//       case "PaymentSettled":
//         setButtonText("Approve");
//         setConfirmationEnabled(true);
//         break;
//       default:
//         setButtonText("Approved");

//         setConfirmationEnabled(false);
//     }
//   }
//   }, [state,fulfillments]);

//   const handleClick = () => {
//     navigate(`/order/${id}`);
//   };

//   const handleConfirm = () => {
//     if (state === "PaymentSettled"  ) {
//       dispatch(updateOrderStatus({ id: id,status: "fulfill" })).then(()=>{    
//           dispatch(fetchAllOrders(orderstate));
//       });

//       // setButtonText("Approved");
//       setConfirmationEnabled(false);
//     }
//   };

//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     return date.toISOString().split("T")[0];
//   }

//   return (
//     <tr  className="">
//       <td className="  pl-2 pr-2 py-4 whitespace-nowrap cursor-pointer" onClick={handleClick}>
//         <div className="text-card-foreground font-semibold">{`${customer?.firstName} ${customer?.lastName}`}</div>
//         <div className="text-muted-foreground">{customer?.emailAddress}</div>
//       </td>
//       <td className=" text-center   pr-2 py-4 whitespace-nowrap cursor-pointer" onClick={handleClick}>
//         <div className="text-card-foreground ">{lines?.[0]?.productVariant?.name
//     ?.split(' ')
//     .slice(0, 4)
//     .join(' ')
//   }
// </div>
//       </td>
//       <td className="pr-2 py-4 text-center  whitespace-nowrap  text-card-foreground cursor-pointer" onClick={handleClick}>#{id}</td>
//       <td className="  text-center   pr-2 py-4 whitespace-nowrap text-card-foreground cursor-pointer" onClick={handleClick}>{formatDate(createdAt)}</td>
//       <td className="pr-2 py-4  text-center  whitespace-nowrap cursor-pointer" onClick={handleClick}>
//         <span
//           className={`py-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//             state === "PaymentSettled"
//               ? "bg-orange-100 text-orange-500"
//               : state === "Cancelled"
//               ? "bg-red-100 text-red-500"
//               : "bg-green-100 text-green-500"
//           }`}
//         >
//           <div
//             className={`w-2 h-2 m-auto mr-1 rounded-full ${
//               state === "PaymentSettled"
//                 ? "bg-orange-500"
//                 : state === "Cancelled"
//                 ? "bg-red-500"
//                 : "bg-green-500"
//             }`}
//           ></div>
//           {state}
//         </span>
//       </td>
//       <td className={`${hide ? "hidden" : "block"} ${textColor}  py-4 whitespace-nowrap`}>
//         {buttonText && (
//           <button
//             onClick={handleConfirm}
//             disabled={!confirmationEnabled}
//             className={`px-4 py-2 bg-transparent border-primary ${
//               confirmationEnabled
//                 ? "border border-blue-500 hover:bg-blue-500 hover:text-white"
//                 : "cursor-not-allowed opacity-50"
//             } rounded-lg`}
//           >
//             {buttonText}
//           </button>
//         )}
       
//       </td>
//     </tr>
//   );
// };

// export default CustomerOrderRow;
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { approveOrderStatus, fetchAllOrders, updateOrderStatus } from "../slices/orderSlice";
import toast, { Toaster } from "react-hot-toast";

const CustomerOrderRow = ({ customer, lineItems, createdAt, hide, id, orderState, fulfillments,shippingAddress,version,custom }) => {
  const [buttonText, setButtonText] = useState("");
  const [confirmationEnabled, setConfirmationEnabled] = useState(true);
  const navigate = useNavigate();
  const [textColor, setColor] = useState("text-blue-500");
  const dispatch = useDispatch();
  const state=orderState;
  const orderstate = useParams();

  useEffect(() => {
    if ( custom.fields.isApproved) {
      setButtonText("Approved");
      setConfirmationEnabled(false);
    } else {
      switch (state) {
        case "Complete":
          setButtonText("Delivered");
          setColor("text-green-400");
          setConfirmationEnabled(false);
          break;
        case "Cancelled":
          setButtonText("Cancelled");
          setColor("text-red-400");
          setConfirmationEnabled(false);
          break;
        case "Open":
          setButtonText("Approve");
          setConfirmationEnabled(true);
          break;
        default:
          setButtonText("Approved");
          setConfirmationEnabled(false);
      }
    }
  }, [state, fulfillments]);

  const handleClick = () => {
    navigate(`/order/${id}`);
  };

  const handleConfirm = () => {
    if (custom.fields.isApproved==undefined) {
      dispatch(approveOrderStatus({ orderId:id, version})).then(() => {
        dispatch(fetchAllOrders(orderState));
      });
      setConfirmationEnabled(false);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  return (
    <tr className="">
      <td className="pl-2 pr-2 py-4 whitespace-nowrap cursor-pointer" onClick={handleClick}>
        <div className="text-card-foreground font-semibold">{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</div>
        <div className="text-muted-foreground">{shippingAddress?.email}</div>
      </td>
      <td className="text-center pr-2 py-4 whitespace-nowrap cursor-pointer" onClick={handleClick}>
        <div className="text-card-foreground">
          {lineItems?.slice(0, 4).map((line, index) => (
            <div key={index}> {line?.name?.["en-US"]?.split(" ").slice(0, 2).join(" ")}</div>
          ))}
        </div>
      </td>
      <td className="pr-2 py-4 text-center whitespace-nowrap text-card-foreground cursor-pointer" onClick={handleClick}>#{id}</td>
      <td className="text-center pr-2 py-4 whitespace-nowrap text-card-foreground cursor-pointer" onClick={handleClick}>{formatDate(createdAt)}</td>
      <td className="pr-2 py-4 text-center whitespace-nowrap cursor-pointer" onClick={handleClick}>
        <span
          className={`py-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            state === "Open"
              ? "bg-orange-100 text-orange-500"
              : state === "Cancelled"
              ? "bg-red-100 text-red-500"
              : "bg-green-100 text-green-500"
          }`}
        >
          <div
            className={`w-2 h-2 m-auto mr-1 rounded-full ${
              state === "PaymentSettled"
                ? "bg-orange-500"
                : state === "Cancelled"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          ></div>
          {state}
        </span>
      </td>
      <td className={`${hide ? "hidden" : "block"} ${textColor} py-4 whitespace-nowrap`}>
        {buttonText && (
          <button
            onClick={handleConfirm}
            disabled={!confirmationEnabled}
            className={`px-4 py-2 bg-transparent border-primary ${
              confirmationEnabled
                ? "border border-primary text-primary hover:bg-primary hover:text-white"
                : "cursor-not-allowed opacity-50 text-primary"
            } rounded-lg`}
          >
            {buttonText}
          </button>
        )}
      </td>
    </tr>
  );
};

export default CustomerOrderRow;

