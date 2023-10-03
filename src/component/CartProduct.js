import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { TbPlus, TbMinus } from "react-icons/tb";
import {
    deleteItemInCart,
    increaseQty,
    decreaseQty,
} from "../redux/productSlide";
import { useDispatch } from "react-redux";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch();
    return (
        <div className="flex gap-4 p-2 border rounded bg-slate-200 border-slate-300">
            <div className="p-3 overflow-hidden bg-white rounded">
                <img
                    src={image}
                    className="object-cover w-40 h-28"
                    alt="cart product"
                />
            </div>
            <div className="flex flex-col w-full gap-1">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold capitalize text-slate-600 md:text-xl">
                        {name}
                    </p>
                    <div
                        className="cursor-pointer text-slate-700 hover:text-red-500"
                        onClick={() => dispatch(deleteItemInCart(id))}
                    >
                        <AiFillDelete />
                    </div>
                </div>
                <p className="font-medium text-slate-500">{category}</p>
                <p className="text-base font-bold">
                    <span>{price}</span>
                    <span className="text-red-500">₫</span>
                </p>
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        {qty > 0 ? (
                            <button
                                className="p-1 mt-2 rounded bg-slate-300 hover:bg-slate-400"
                                onClick={() => dispatch(decreaseQty(id))}
                            >
                                <TbMinus />
                            </button>
                        ): (
                          <div className="p-1 mt-2" style={{width: '23px'}} ></div>
                        )}
                        <p className="p-1 mt-2 font-semibold">{qty}</p>
                        <button
                            className="p-1 mt-2 rounded bg-slate-300 hover:bg-slate-400"
                            onClick={() => dispatch(increaseQty(id))}
                        >
                            <TbPlus />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                        <p>Total:</p>
                        <p>
                            {total}
                            <span className="text-red-500">₫</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
