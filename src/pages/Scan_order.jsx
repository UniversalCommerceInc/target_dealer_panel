import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import jsQR from 'jsqr';

const ScanOrder = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [confirmScan, setConfirmScan] = useState(false);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data && data.text) {
      const orderId = data.text;
      setScanResult(orderId);
      setError(null);
      setIsCameraOpen(false);

      setTimeout(() => {
        // navigate(`/order/${orderId}`);
        navigate(`/order/${orderId}`, { state: 'scan-order' });
      }, 3000); // Delay for showing popup
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              setPreviewImage(reader.result);
              setConfirmScan(true);
            } else {
              handleError(new Error('No QR code found'));
            }
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              setPreviewImage(e.target.result);
              setConfirmScan(true);
            } else {
              handleError(new Error('No QR code found'));
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white dark:bg-customBlue shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Scan QRCode</h2>
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center mb-4 overflow-hidden">
          {isCameraOpen ? (
            <div className="relative">
              <QrScanner
                delay={300}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
              />
              {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-2 border-red-500 w-48 h-48" />
              </div> */}
            </div>
          ) : previewImage ? (
            <img src={previewImage} alt="QR Code Preview" className="h-full w-full object-contain" />
          ) : (
            <div {...getRootProps()} className="flex cursor-pointer items-center justify-center h-full w-full">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-500">Drop the files here...</p>
              ) : (
                <p className="text-gray-500">Drag or paste QRCode here, or click to upload</p>
              )}
            </div>
          )}
        </div>
        {confirmScan && previewImage?<div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  const img = new Image();
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0, img.width, img.height);
                    const imageData = context.getImageData(0, 0, img.width, img.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                      handleScan({ text: code.data });
                    } else {
                      handleError(new Error('No QR code found'));
                    }
                  };
                  img.src = previewImage;
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm Scan
              </button>
              <button
                onClick={() => setConfirmScan(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>:
        <button
          onClick={() => setIsCameraOpen((prev) => !prev)}
          className="w-full bg-btnBlue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isCameraOpen ? 'Disable Camera' : 'Enable Camera'}
        </button>}
      </div>
      {/* {confirmScan && previewImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <img src={previewImage} alt="QR Code Preview" className="mb-4" />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  const img = new Image();
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0, img.width, img.height);
                    const imageData = context.getImageData(0, 0, img.width, img.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                      handleScan({ text: code.data });
                    } else {
                      handleError(new Error('No QR code found'));
                    }
                  };
                  img.src = previewImage;
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm Scan
              </button>
              <button
                onClick={() => setConfirmScan(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
      {scanResult && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg">
          <p className="font-bold">Order with orderId: {scanResult}</p>
        </div>
      )}
      {error && (
        <div className="fixed bottom-4 right-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg">
          <p className="font-bold">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
};

export default ScanOrder;
