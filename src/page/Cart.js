import React from "react";
import { useSelector } from "react-redux";
import emptyCartImage from "../asset/empty.gif";
import CartProduct from "../component/CartProduct";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
    const productCartItem = useSelector((state) => state.product.cartItem);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const totalPrice = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.total),
        0
    );
    const totalQty = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.qty),
        0
    );

    const handlePayment = async () => {
        if (user.email) {
            const stripePromise = await loadStripe(
                process.env.REACT_APP_STRIPE_PUBLIC_KEY
            );
            const res = await fetch(
                `${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(productCartItem),
                }
            );
            if (res.statusCode === 500) return;
            const data = await res.json();

            toast("Redirect to payment Gateway...!")
            stripePromise.redirectToCheckout({sessionId: data})
        } else{
            toast.error("You have not login!")
            setTimeout(() => {
                navigate("/login")
            }, 1000)
        }
    };
    return (
        <div className="p-2 md:p-4">
            <h2 className="text-lg font-bold md:text-2xl text-slate-600">
                Your Cart Items
            </h2>
            <div className="">
                {productCartItem[0] ? (
                    <div className="flex gap-3 my-4">
                        {/* Display cart items */}
                        <div className="w-full max-w-3xl">
                            {productCartItem.map((el) => {
                                return (
                                    <CartProduct
                                        key={el._id}
                                        id={el._id}
                                        name={el.name}
                                        image={el.image}
                                        category={el.category}
                                        qty={el.qty}
                                        total={el.total}
                                        price={el.price}
                                    />
                                );
                            })}
                        </div>

                        {/* Total cart items */}
                        <div className="w-full max-w-md ml-auto">
                            <p className="bg-blue-500 text-white p-2 text-lg">
                                Summary
                            </p>
                            <div className="flex w-full py-2 text-lg border-b">
                                <p>Total Quantity :</p>
                                <p className="ml-auto w-32 font-bold">
                                    {totalQty}
                                </p>
                            </div>
                            <div className="flex w-full py-2 text-lg border-b">
                                <p>Total Price :</p>
                                <p className="ml-auto w-32 font-bold">
                                    {totalPrice}{" "}
                                    <span className="text-red-500">₫</span>
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="bg-red-500 hover:bg-red-600 w-1/2 text-lg font-bold py-2 text-white rounded-md"
                                    onClick={handlePayment}
                                >
                                    Payment
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center w-full">
                            <img
                                src={emptyCartImage}
                                className="w-full max-w-sm"
                                alt="emptyCart"
                            />
                            <p className="text-3xl font-bold text-slate-500">
                                Empty Cart
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
