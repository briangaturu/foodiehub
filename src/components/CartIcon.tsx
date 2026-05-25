import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { toggleCart } from "../features/cart/cartSlice";

const CartIcon = ({ floating = false }: { floating?: boolean }) => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  if (floating) {
    return (
      <button
        onClick={() => dispatch(toggleCart())}
        className="fixed bottom-8 right-8 z-30 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110"
      >
        🛒
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors"
    >
      <span className="text-xl">🛒</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

export default CartIcon;