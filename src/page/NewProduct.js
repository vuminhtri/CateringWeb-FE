import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const uploadImage = async (e) => {
    if(e.target.files.length === 0){
      return;
    }
    const dataImage = await ImagetoBase64(e.target.files[0]);
    setData({ ...data, image: dataImage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, category, price } = data;
    if (name && image && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const fetchRes = await fetchData.json();
      console.log(fetchRes);
      toast.success(fetchRes.message);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast.error("Please enter required fields!");
    }
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          className="bg-slate-200 p-1 my-1"
          type="text"
          name="name"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          name="category"
          id="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option defaultValue={"other"}>select category</option>
          <option value="fruits">Fruits</option>
          <option value="vegetable">Vegetables</option>
          <option value="icescream">Ice Cream</option>
          <option value="pizza">Pizza</option>
          <option value="rice">Rice</option>
          <option value="cake">Cake</option>
          <option value="burger">Burger</option>
          <option value="sandwich">Sandwich</option>
        </select> 

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" alt="product"/>
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
              onChange={uploadImage}
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="text"
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={4}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
          value={data.description}
        />

        <button className="w-2/5 m-auto bg-blue-300 hover:bg-blue-500 text-white text-xl font-medium mt-4 py-1 drop-shadow flex items-center justify-center rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
