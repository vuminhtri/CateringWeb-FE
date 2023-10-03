import React, { useEffect, useState } from "react";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { useSelector } from "react-redux";

const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [...new Set(productData.map((el) => el.category))];
    // console.log(categoryList);
    const loadingArrayFeature = new Array(10).fill(null);

    const [filterBy, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(productData);
    }, [productData]);

    const handleFilterProduct = (category) => {
        setFilterBy(category);
        const filter = productData.filter(
            (el) => el.category.toLowerCase() === category.toLowerCase()
        );
        setDataFilter(() => {
            return [...filter];
        });
    };
    const filterProducts = categoryList.map((el) => (
        <FilterProduct
            category={el}
            key={el}
            isActive={el.toLowerCase() === filterBy.toLowerCase()}
            onClick={() => handleFilterProduct(el)}
        />
    ));
    return (
        <div>
            <div className="my-5">
                <h2 className="font-bold text-2xl text-slate-800 mb-4">
                    {heading}
                </h2>

                <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
                    {categoryList[0] ? (
                        filterProducts
                    ) : (
                        <div className="min-h-[150px] flex justify-center items-center">
                            <p>Loading...</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-4 justify-center my-4">
                    {dataFilter[0]
                        ? dataFilter.map((el) => {
                            return (
                                <CardFeature
                                    key={el._id + el.category}
                                    id={el._id}
                                    image={el.image}
                                    name={el.name}
                                    category={el.category}
                                    price={el.price}
                                />
                            );
                        })
                        : loadingArrayFeature.map((el, index) => (
                            <CardFeature
                                loading={"Loading..."}
                                key={index + "products"}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AllProduct;
