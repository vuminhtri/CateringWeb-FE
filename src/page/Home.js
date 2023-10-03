// import React, { useEffect, useMemo, useRef, useState } from "react";
import React, { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import HomeCard from "../component/HomeCard";
import CardFeature from "../component/CardFeature";
// import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  // const homeProductCartListVegetables = productData.filter(
  //   (el) => el.category === "vegetable",
  //   []
  // );
  const homeProductCartListVegetables = useMemo(() => {
    return productData.filter((el) => el.category === "vegetable");
  }, [productData]);

  const productCards = homeProductCartList.map((el) => (
    <HomeCard
      key={el._id}
      id={el._id}
      image={el.image}
      name={el.name}
      price={el.price}
      category={el.category}
    />
  ));
  

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 220;
  };
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 220;
  };

  // const categoryList = [...new Set(productData.map((el) => el.category))];
  // // console.log(categoryList);

  // const [filterBy, setFilterBy] = useState("");
  // const [dataFilter, setDataFilter] = useState([]);

  // useEffect(() => {
  //   setDataFilter(productData);
  // }, [productData]);

  // const handleFilterProduct = (category) => {
  //   setFilterBy(category);
  //   const filter = productData.filter(
  //     (el) => el.category.toLowerCase() === category.toLowerCase()
  //   );
  //   setDataFilter(() => {
  //     return [...filter];
  //   });
  // };
  // console.log(dataFilter);



  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">
              Bike Delivery
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
              alt="Bike"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fasted Delivery in{" "}
            <span className="text-red-600">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has
            survived not only five centuries
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0] ? productCards : loadingArray.map((el, index) => (
            <HomeCard key={index + "loading"} loading={"Loading..."} />
          ))}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center pb-4">
          <h2 className="font-bold text-2xl text-slate-800 ">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={prevProduct}
            >
              <GrPrevious />
            </button>
            <button
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={nextProduct}
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
              return (
                <CardFeature
                  key={el._id + "vegetable"}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
            : loadingArrayFeature.map((el, index) => {
              return (
                <CardFeature
                  key={index + "loading"}
                  loading={"Loading..."}
                />
              );
            })}
        </div>
      </div>

      <AllProduct heading={"Products"}/>
    </div>
  );
};

export default Home;
