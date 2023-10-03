import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemtoCart } from "../redux/productSlide";

const CardFeature = ({ image, name, category, price, loading, id }) => {
    const dispatch = useDispatch();
    const handleAddCartProduct = (e) => {
        dispatch(addItemtoCart({
            _id: id,
            name: name,
            price: price,
            category: category,
            image: image,
        }))
    }
    return (
        <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-2xl drop-shadow-lg py-5 px-4 ">
            {image ? (
                <>
                    <Link
                        to={`/menu/${id}`}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <div className="h-28">
                            <img
                                src={image}
                                className="h-full w-full"
                                alt="Product in Vegetable Category"
                            />
                        </div>
                        <h3 className="font-semibold text-slate-600 text-center capitalize mt-4 whitespace-nowrap overflow-hidden">
                            {name}
                        </h3>
                        <p className="text-center text-slate-500 font-medium">
                            {category}
                        </p>
                        <p className="text-center font-bold">
                            <span>{price}</span>
                            <span className="text-red-500">₫</span>
                        </p>
                    </Link>
                    <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full" onClick={handleAddCartProduct}>
                        Add to Cart
                    </button>
                </>
            ) : (
                <div className="min-h-[150px] flex justify-center items-center">
                    <p>{loading}</p>
                </div>
            )}
        </div>
    );
}

export default CardFeature;
