import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { BsCalendar, BsCurrencyDollar, BsFilter } from 'react-icons/bs';
import { MdPayment, MdOutlineFilterList, MdOutlineColumns, MdFilterList } from 'react-icons/md';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { AiOutlineExport } from 'react-icons/ai';
import { BiColumns } from 'react-icons/bi';
const transactions = [
    {
        amount: '€131.00',
        currency: 'EUR',
        status: 'Succeeded',
        paymentMethod: 'Visa',
        last4: '4242',
        description: 'pi_3Ppx8hSGTUXQrd4J1D51skaT',
        customer: 'vkr@mail.com',
        date: 'Aug 21, 12:20 AM',
    },
    {
        amount: '€7.39',
        currency: 'EUR',
        status: 'Succeeded',
        paymentMethod: 'Visa',
        last4: '4242',
        description: 'pi_3PpwxnSGTUXQrd4J1fKvvlVb',
        customer: 'vkr@mail.com',
        date: 'Aug 21, 12:09 AM',
    },

    {
        amount: '€131.00',
        currency: 'EUR',
        status: 'Succeeded',
        paymentMethod: 'Visa',
        last4: '4242',
        description: 'pi_3Ppx8hSGTUXQrd4J1D51skaT',
        customer: 'vkr@mail.com',
        date: 'Aug 21, 12:20 AM',
    },
    {
        amount: '€7.39',
        currency: 'EUR',
        status: 'Succeeded',
        paymentMethod: 'Visa',
        last4: '4242',
        description: 'pi_3PpwxnSGTUXQrd4J1fKvvlVb',
        customer: 'vkr@mail.com',
        date: 'Aug 21, 12:09 AM',
    },
    {
        amount: '€45.00',
        currency: 'EUR',
        status: 'Failed',
        paymentMethod: 'Mastercard',
        last4: '1234',
        description: 'pi_3Ppx9hSGTUXQrd4J1D52skaU',
        customer: 'abc@mail.com',
        date: 'Aug 22, 01:15 PM',
    },
    {
        amount: '€89.99',
        currency: 'EUR',
        status: 'Succeeded',
        paymentMethod: 'Visa',
        last4: '5678',
        description: 'pi_3Ppx0hSGTUXQrd4J1D53skaV',
        customer: 'xyz@mail.com',
        date: 'Aug 23, 03:45 PM',
    },
    {
        amount: '€12.50',
        currency: 'EUR',
        status: 'Pending',
        paymentMethod: 'Amex',
        last4: '9876',
        description: 'pi_3Ppx1hSGTUXQrd4J1D54skaW',
        customer: 'lmn@mail.com',
        date: 'Aug 24, 10:30 AM',
    },


];

const flexClass = 'flex items-center space-x-2'
const successClass = 'bg-green-200 text-green-800 text-xs  px-2 py-1 rounded-md'
const Transactions = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Transactions</h1>
                <button className="bg-indigo-500 text-white px-4 py-2 rounded flex items-center">
                    <FaPlus className="mr-2" />
                    Create Payment
                </button>
            </div>
            <div className="flex items-center justify-between mb-6">
                <div className=" w-full  space-x-4">
                    <button className="bg-white w-[18%] font-semibold border-2 text-indigo-600 py-6 px-6 rounded focus:outline-none">All <p className="ml-2 text-gray-500">28</p></button>
                    <button className="bg-white w-[18%] border-2 font-semibold text-gray-600 py-6 px-6 rounded focus:outline-none">Succeeded <p className="ml-2 font-semibold text-gray-500">27</p></button>
                    <button className="bg-white w-[18%] border-2 font-semibold text-gray-600 py-6 px-6 rounded focus:outline-none">Refunded <p className="ml-2 text-gray-500">0</p></button>
                    <button className="bg-white w-[18%] border-2 font-semibold text-gray-600 py-6 px-6 rounded focus:outline-none">Failed <p className="ml-2 font-semibold text-gray-500">27</p></button>
                    <button className="bg-white w-[18%] font-semibold border-2 text-gray-600 py-6 px-6 rounded focus:outline-none">Uncaptured <p className="ml-2 text-gray-500">27</p></button>

                </div>

            </div>
            <div className="flex justify-between items-center space-x-2 my-2">
                {/* Date and Time */}
                <div className="flex items-center space-x-2">

                    <button className="flex items-center border text-xs px-1 py-1 rounded  hover:bg-gray-200">
                        <BsCalendar className="mr-2" />
                        <span>Date and time</span>
                    </button>

                    {/* Amount */}
                    <button className="flex items-center border text-xs  px-1 py-1 rounded hover:bg-gray-200">
                        <BsCurrencyDollar className="mr-2" />
                        <span>Amount</span>
                    </button>

                    {/* Currency */}
                    <button className="flex items-center border text-xs  px-1 py-1 rounded hover:bg-gray-200">
                        <BsCurrencyDollar className="mr-2" />
                        <span>Currency</span>
                    </button>

                    {/* Status */}
                    <button className="flex items-center border text-xs px-1 py-1 rounded hover:bg-gray-200">
                        <HiOutlineStatusOnline className="mr-2" />
                        <span>Status</span>
                    </button>

                    {/* Payment Method */}
                    <button className="flex items-center border text-xs  px-1 py-1 rounded hover:bg-gray-200">
                        <MdPayment className="mr-2" />
                        <span>Payment method</span>
                    </button>

                    {/* More Filters */}
                    <button className="flex items-center border text-xs  px-1 py-1 rounded hover:bg-gray-200">
                        <MdFilterList className="mr-2" />
                        <span>More filters</span>
                    </button>
                </div>
                <div className="flex items-center space-x-2">

                    {/* Export */}
                    <button className="flex items-center border text-xs px-1 py-1 rounded hover:bg-gray-200">
                        <AiOutlineExport className="mr-2" />
                        <span>Export</span>
                    </button>

                    {/* Edit Columns */}
                    <button className="flex items-center border  px-1 py-1 rounded text-xs hover:bg-gray-200">
                        <BiColumns className="mr-2" />
                        <span>Edit columns</span>
                    </button>
                </div>
            </div>



            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full bg-white text-xs">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Payment method
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Refunded date
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Dispute amount
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Dispute reason
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                </td>

                                <td className="px-2 py-4 whitespace-nowrap">

                                    <div className={flexClass}>
                                        <span className=" text-zinc-800">{transaction.amount}</span>
                                        <span className="text-xs text-zinc-600">{transaction.currency}</span>
                                        <span className={successClass}>
                                            Succeeded{' '}
                                            <span aria-hidden="true" role="img">
                                                ✔️
                                            </span>
                                        </span>
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    {transaction.paymentMethod} •••• {transaction.last4}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {transaction.description}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    {transaction.customer}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    {transaction.date}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                    —
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-center  text-gray-500">
                                    —
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-center  text-gray-500">
                                    —
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <span className="text-gray-500">Viewing 1-20 of 28 results</span>
                <div className="flex space-x-2">
                    <button className="text-gray-500 py-2 px-4 rounded-lg focus:outline-none">Previous</button>
                    <button className="text-gray-500 py-2 px-4 rounded-lg focus:outline-none">Next</button>
                </div>
            </div>

        </div>
    );
};

export default Transactions;
