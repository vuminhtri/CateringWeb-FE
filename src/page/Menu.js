import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addItemtoCart } from "../redux/productSlide";

const Menu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData.filter((el) => el._id === id)[0];
  // console.log(productDisplay);
  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    dispatch(addItemtoCart(productDisplay));
  };
  const handleBuy = () => {
    dispatch(addItemtoCart(productDisplay));
    navigate("/cart");
  };
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto bg-white md:flex">
        <div className="w-full max-w-sm p-5 overflow-hidden">
          <img
            src={productDisplay.image}
            className="h-full transition-all hover:scale-105"
            alt={productDisplay.image}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold capitalize text-slate-600 md:text-4xl">
            {productDisplay.name}
          </p>
          <p className="text-2xl font-medium text-slate-500">
            {productDisplay.category}
          </p>
          <p className="font-bold">
            <span>{productDisplay.price}</span>
            <span className="text-red-500">₫</span>
          </p>
          <div className="flex gap-3">
            <button
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              onClick={handleBuy}
            >
              Buy
            </button>
            <button
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              onClick={handleAddCartProduct}
            >
              Add to Cart
            </button>
          </div>
          <div>
            <p className="font-medium text-slate-600">Description : </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;
