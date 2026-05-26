import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  closeCart, removeFromCart,
  incrementQuantity, decrementQuantity, clearCart,
} from "../features/cart/cartSlice";
import { ordersApi } from "../features/api/ordersApi";
import { paymentsApi } from "../features/api/paymentsApi";
import swal from "sweetalert2";

type Step = "cart" | "checkout" | "success";
type PaymentMethod = "mpesa" | "stripe";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const [step, setStep] = useState<Step>("cart");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrderIds, setPlacedOrderIds] = useState<number[]>([]);

  const [createOrder] = ordersApi.useCreateOrderMutation();
  const [initiateMpesa] = paymentsApi.useInitiateMpesaPaymentMutation();
  const [initiateStripe] = paymentsApi.useInitiateStripePaymentMutation();

  const total = items.reduce((sum, item) => sum + item.mealPrice * item.quantity, 0);

  const handleClose = () => {
    dispatch(closeCart());
    setStep("cart");
    setPhoneNumber("");
  };

  // Step 1 — place all orders then go to checkout
  const handleProceedToCheckout = async () => {
    setIsProcessing(true);
    try {
      const orderIds: number[] = [];
      for (const item of items) {
        for (let i = 0; i < item.quantity; i++) {
          const res = await createOrder({ userId: user?.userId, mealId: item.mealId }).unwrap();
         console.log("Order response:", res);
        if (res?.data?.orderId) orderIds.push(res.data.orderId);
      }
    }
    console.log("Order IDs collected:", orderIds);
      setPlacedOrderIds(orderIds);
      setStep("checkout");
    } catch (error) {
      swal.fire("Error", "Failed to place orders. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 2 — pay
  const handlePayment = async () => {
    if (paymentMethod === "mpesa" && !phoneNumber) {
      swal.fire("Missing", "Please enter your M-Pesa phone number.", "warning");
      return;
    }

    setIsProcessing(true);
    try {
      // Pay for each order
      for (const orderId of placedOrderIds) {
        const orderAmount = total / placedOrderIds.length;

        if (paymentMethod === "mpesa") {
          await initiateMpesa({
            userId: user?.userId,
            orderId,
            amount: orderAmount,
            phoneNumber,
          }).unwrap();
        } else {
          await initiateStripe({
            userId: user?.userId,
            orderId,
            amount: orderAmount,
          }).unwrap();
        }
      }

      dispatch(clearCart());
      setStep("success");
    } catch (error) {
      swal.fire("Payment Failed", "Something went wrong. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            {step !== "cart" && step !== "success" && (
              <button
                onClick={() => setStep("cart")}
                className="text-gray-400 hover:text-gray-600 mr-1"
              >
                ←
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-800">
              {step === "cart" && "🛒 Your Cart"}
              {step === "checkout" && "💳 Checkout"}
              {step === "success" && "🎉 Order Placed!"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* ── STEP: CART ── */}
        {step === "cart" && (
          <>
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
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.mealId))}
                          className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center hover:bg-orange-200"
                        >−</button>
                        <span className="text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.mealId))}
                          className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center hover:bg-orange-200"
                        >+</button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.mealId))}
                      className="text-red-400 hover:text-red-600 text-lg flex-shrink-0"
                    >🗑️</button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 py-4 border-t bg-white">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 font-medium">Total</span>
                  <span className="text-xl font-bold text-orange-500">Ksh {total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 hover:shadow-lg disabled:opacity-60"
                >
                  {isProcessing ? "Processing..." : `Proceed to Checkout →`}
                </button>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full py-2 mt-2 text-sm text-red-400 hover:text-red-600 transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </>
        )}

        {/* ── STEP: CHECKOUT ── */}
        {step === "checkout" && (
          <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">

            {/* Order summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-600 mb-3">Order Summary</p>
              {items.map((item) => (
                <div key={item.mealId} className="flex justify-between text-sm text-gray-700 mb-1">
                  <span>{item.mealName} × {item.quantity}</span>
                  <span>Ksh {(item.mealPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-3 pt-3 flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span className="text-orange-500">Ksh {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment method picker */}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-3">Select Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("mpesa")}
                  className={`py-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 flex flex-col items-center gap-1 ${
                    paymentMethod === "mpesa"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 text-gray-500 hover:border-green-300"
                  }`}
                >
                  <span className="text-2xl">📱</span>
                  M-Pesa
                </button>
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className={`py-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 flex flex-col items-center gap-1 ${
                    paymentMethod === "stripe"
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-500 hover:border-indigo-300"
                  }`}
                >
                  <span className="text-2xl">💳</span>
                  Stripe
                </button>
              </div>
            </div>

            {/* M-Pesa phone input */}
            {paymentMethod === "mpesa" && (
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-2">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 2547XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  You will receive an STK push on this number.
                </p>
              </div>
            )}

            {/* Stripe info */}
            {paymentMethod === "stripe" && (
              <div className="bg-indigo-50 rounded-xl p-4 text-sm text-indigo-700">
                <p className="font-semibold mb-1">💳 Pay with Stripe</p>
                <p className="text-xs text-indigo-500">
                  You will be securely charged Ksh {total.toFixed(2)} via Stripe.
                </p>
              </div>
            )}

            {/* Pay button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-3 rounded-xl text-white font-bold transition-all duration-200 hover:shadow-lg disabled:opacity-60 ${
                paymentMethod === "mpesa"
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              }`}
            >
              {isProcessing
                ? "Processing payment..."
                : paymentMethod === "mpesa"
                ? "Pay with M-Pesa"
                : "Pay with Stripe"}
            </button>
          </div>
        )}

        {/* ── STEP: SUCCESS ── */}
        {step === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <div className="text-6xl">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800">Payment Initiated!</h3>
            {paymentMethod === "mpesa" ? (
              <p className="text-gray-500 text-sm">
                Check your phone for the M-Pesa STK push and enter your PIN to complete payment.
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                Your Stripe payment is being processed. You will receive a confirmation shortly.
              </p>
            )}
            <div className="w-16 h-1 rounded-full bg-orange-300 my-2" />
            <p className="text-xs text-gray-400">
              Your orders have been placed and will be prepared once payment is confirmed.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;