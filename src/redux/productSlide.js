import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    productList: [],
    cartItem: [],
};
export const productSlide = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload];
        },
        addItemtoCart: (state, action) => {
            // console.log(action);
            const check = state.cartItem.some(
                (el) => el._id === action.payload._id
            );
            if (check) {
                toast.error("Already Item in Cart");
            } else {
                toast.success("Item Add Successfully");
                const total = action.payload.price;
                state.cartItem = [
                    ...state.cartItem,
                    { ...action.payload, qty: 1, total: total },
                ];
            }
        },
        deleteItemInCart: (state, action) => {
            //   console.log(action);
            toast.success("Item Had Been Deleted");
            const index = state.cartItem.findIndex(
                (el) => el._id === action.payload
            );
            state.cartItem.splice(index, 1);
            console.log(index);
        },
        increaseQty: (state, action) => {
            const index = state.cartItem.findIndex(
                (el) => el._id === action.payload
            );
            let qty = state.cartItem[index].qty;
            const qtyInc = ++qty, price = state.cartItem[index].price;
            state.cartItem[index].qty = qtyInc;
            state.cartItem[index].total = price * qtyInc;
        },
        decreaseQty: (state, action) => {
            const index = state.cartItem.findIndex(
                (el) => el._id === action.payload
            );
            let qty = state.cartItem[index].qty;
            const qtyInc = --qty, price = state.cartItem[index].price;
            state.cartItem[index].qty = qtyInc;
            state.cartItem[index].total = price * qtyInc;
        },
    },
});

export const {
    setDataProduct,
    addItemtoCart,
    deleteItemInCart,
    increaseQty,
    decreaseQty,
} = productSlide.actions;

export default productSlide.reducer;
