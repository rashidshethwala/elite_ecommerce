import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const { paymentMethodId, amount } = location.state || {};
  
  // Generate random order number
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully processed.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium text-gray-900">{orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium text-gray-900">•••• {paymentMethodId?.slice(-4) || '1234'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium text-gray-900">${amount || '0.00'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span>Order confirmation sent to your email</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Truck className="w-4 h-4" />
            <span>Expected delivery: {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/products"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
          
          <Link
            to="/"
            className="block w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;