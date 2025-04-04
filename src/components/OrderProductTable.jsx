import React from 'react';

const tableHeaderClass = 'py-2 px-4 border-b-2 border-border text-left text-sm font-semibold';
const tableCellClass = 'py-2 px-4 border-b border-border';

const ProductItem = ({ image,  name, sku, unitPrice, quantity, total }) => (
  <tr className="product-item">
    <td className={tableCellClass}>
      <img className="w-40" alt={name} src={image} />
    </td>
    <td className={tableCellClass}>{name}</td>
    <td className={tableCellClass}>{sku}</td>
    <td className={tableCellClass}>{unitPrice}</td>
    <td className={`${tableCellClass} text-center`}>{quantity}</td>
    <td className={tableCellClass}>{total}</td>
  </tr>
);

const SubTotalShipping = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span>{value}</span>
  </div>
);

const TotalSection = ({total}) => (
  <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
    <span>Total</span>
    <span>{total}</span>
  </div>
);

const OrderProductTable = ({items,summary}) => {
  const totalDiscount = summary.totalDiscount || 0;


return  <div className="overflow-x-auto p-4 bg-card border border-border rounded-lg">
    <table className="min-w-full ">
      <thead>
        <tr>
          <th className={tableHeaderClass}>IMAGE</th>
          <th className={tableHeaderClass}>PRODUCT NAME</th>
          <th className={tableHeaderClass}>SKU</th>
          <th className={tableHeaderClass}>UNIT PRICE</th>
          <th className={tableHeaderClass}>QUANTITY</th>
          <th className={tableHeaderClass}>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((items)=>{
return  <ProductItem
{...items}
/>
        })}
       </tbody>
    </table>
    <div className="mt-4">
    <SubTotalShipping label="Discount" value={totalDiscount} />

      <SubTotalShipping label="Sub total" value={summary.subTotal} />
      <SubTotalShipping label="Shipping" value={summary.shipping} />
      <TotalSection total={summary.total} />
    </div>
  </div>
}

export default OrderProductTable;
