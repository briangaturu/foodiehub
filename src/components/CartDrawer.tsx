import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  closeCart, removeFromCart,
  incrementQuantity, decrementQuantity, clearCart,
} from "../features/cart/cartSlice";
import { ordersApi } from "../features/api/ordersApi";
import swal from "sweetalert2";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const [createOrder] = ordersApi.useCreateOrderMutation();

  const total = items.reduce((sum, item) => sum + item.mealPrice * item.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    try {
      for (const item of items) {
        await createOrder({ userId: user?.userId, mealId: item.mealId });
      }
      dispatch(clearCart());
      dispatch(closeCart());
      swal.fire("Order Placed! 🎉", "Your orders have been placed successfully.", "success");
    } catch (error) {
      swal.fire("Something went wrong", "Please try again", "error");
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => dispatch(closeCart())}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">🛒 Your Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-5xl mb-4">🍽️</p>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some delicious meals!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.mealId} className="flex gap-3 items-center bg-gray-50 rounded-xl p-3">
                <img
                  src={item.mealUrl}
                  alt={item.mealName}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{item.mealName}</p>
                  <p className="text-orange-500 font-bold text-sm">Ksh {item.mealPrice}</p>
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.mealId))}
                      className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center hover:bg-orange-200"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.mealId))}
                      className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center hover:bg-orange-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.mealId))}
                  className="text-red-400 hover:text-red-600 text-lg flex-shrink-0"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t bg-white">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-xl font-bold text-orange-500">Ksh {total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 hover:shadow-lg"
            >
              Checkout ({items.length} {items.length === 1 ? "item" : "items"})
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 mt-2 text-sm text-red-400 hover:text-red-600 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;