import { useEffect, useState } from "react";
import CustomerOrderRow from "./CustomOrderRow";
import { Link } from 'react-router-dom';

const OrderList = ({ Heading, show, customerOrders }) => {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        if (Heading === "Canceled Orders" || Heading=="Completed Orders") {
            setHide(true);
        }
    }, [Heading]);

    // Determine which items to display
    const itemsToDisplay = show ? customerOrders?.slice(0, 4) : customerOrders;

    return (
        <div className="w-full bg-white p-4 bg-card border border-border rounded-lg dark:bg-customBlue shadow-lg">
            <div className="flex justify-between border-b-2 border-border pb-2">
                <div>
                    <h2 className="text-2xl font-bold text-card-foreground">
                        {Heading} ({customerOrders?.length})
                    </h2>
                </div>
                <div>
                    {show &&  (
                        <Link to="/all-orders">
                            <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700">
                                View More
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            {customerOrders?.totalItems === 0 ? (
                <div className="text-center mt-4 text-muted-foreground">
                    No orders found.
                </div>
            ) : (
                <div className="w-full overflow-x-auto">
                    <table className="w-full mt-6 bg-card border-border rounded-lg">
                        <thead>
                            <tr className="border-b-[1px]">
                                <th className=" pl-2 pr-4 py-3 text-left text-s font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                                <th className="pr-4 py-3  text-s font-medium text-muted-foreground uppercase tracking-wider text-center">Product</th>
                                <th className="pr-4 py-3 text-center text-s font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                                <th className="pr-4 py-3 text-center text-s font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                                <th className="pr-2 py-3 text-center text-s font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className={`${hide ? "hidden" : "block"} pr-1 py-3  text-s font-medium text-muted-foreground uppercase tracking-wider`}>Approval</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border ">
                            {itemsToDisplay?.map((order) => (
                                <CustomerOrderRow key={order.id} {...order} hide={hide} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderList;
