import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ name, image, category, price, loading, id }) => {
    return (
        <div className="bg-white shadow-md p-2 rounded min-w-[150px]">
            {name ? (
                <>
                    <Link
                        to={`/menu/${id}`}
                        onClick={() =>
                            window.scrollTo({ top: "0", behavior: "smooth" })
                        }
                    >
                        <div className="w-40 min-h-[150px]">
                            <img src={image} className="w-full h-full" alt="Product in Cart"/>
                        </div>
                        <h3 className="font-semibold text-slate-600 text-center capitalize">
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
                </>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <p>{loading}</p>
                </div>
            )}
        </div>
    );
};

export default HomeCard;
