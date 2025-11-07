import React from 'react';
// FIX: Updated import path for types.
import { CartItem, Tenant } from '../shared/types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  tenant: Tenant;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, tenant }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
      <div className={`relative w-full max-w-lg mx-4 rounded-lg shadow-xl ${tenant.theme.backgroundColor} ${tenant.theme.backgroundColor === 'bg-white' ? 'text-stone-800' : 'text-white'}`} onClick={(e) => e.stopPropagation()}>
        <div className={`flex justify-between items-center p-5 rounded-t-lg ${tenant.theme.primaryColor}`}>
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-3xl font-light hover:opacity-75">&times;</button>
        </div>
        
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center py-10">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-700">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center py-4">
                  <img src={item.imageUrl} alt={item.name} className="h-20 w-20 object-cover rounded-md" />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                      className={`w-16 p-1 text-center rounded-md ${tenant.theme.backgroundColor === 'bg-white' ? 'bg-gray-200' : 'bg-slate-700'}`}
                    />
                    <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500 hover:text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className={`p-5 rounded-b-lg ${tenant.theme.secondaryColor}`}>
            <div className="flex justify-between items-center text-xl font-bold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className={`w-full py-3 rounded-lg font-bold text-white ${tenant.theme.accentColor} hover:opacity-90 transition-all`}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;