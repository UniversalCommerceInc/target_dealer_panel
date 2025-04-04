import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ orderId }) => {
  const qrValue = orderId;

  return (
    <div className='py-4 space-y-4'>
      <QRCode value={qrValue} />
      <p>Scan the QR code to get the order details.</p>
    </div>
  );
};

export default QRCodeComponent;
