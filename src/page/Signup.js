import React, { useState } from "react";
import loginsignupimg from "../asset/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  // console.log(data);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async (e) => {
    const dataimage = await ImagetoBase64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image: dataimage,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword, image } = data;
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const dataReq = {firstName, lastName, email, password, image}
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(dataReq),
          }
        );
        const dataRes = await fetchData.json();
        console.log(dataRes);
        if (dataRes.alert) {
          toast.success(dataRes.message);
          navigate("/login");
        } else {
          toast.error(dataRes.message);
        }
      } else {
        toast.error("Password and confirm password not equal!");
      }
    } else {
      toast.error("Please enter required fields!");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="flex flex-col items-center w-full max-w-sm p-4 m-auto bg-white">
        {/* <h1 className="text-2xl font-bold text-center">Sign up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full shadow-md drop-shadow-md">
          <img
            src={data.image ? data.image : loginsignupimg}
            className="w-full h-full"
            alt="user"
          />

          <label
            htmlFor="profileImage"
            className="absolute bottom-0 w-full text-center cursor-pointer h-1/3"
          >
            <div className="w-full p-1 text-sm text-center text-white transition-opacity duration-300 cursor-pointer bg-slate-500 opacity-30 hover:opacity-100">
              Upload
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form
          className="flex flex-col w-11/12 py-3"
          onSubmit={handleSubmit}
        >
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={data.firstName}
            onChange={handleOnChange}
            className="w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300"
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName}
            onChange={handleOnChange}
            className="w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            className="w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300"
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              className="w-full border-none outline-none bg-slate-200"
            />
            <span
              className="flex pt-1 text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleOnChange}
              className="w-full border-none outline-none bg-slate-200"
            />
            <span
              className="flex pt-1 text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className=" w-full max-w-[150px] m-auto bg-blue-300 hover:bg-blue-500 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
        </form>

        <p className="mt-2 text-sm">
          Already have account?{" "}
          <Link to={"/login"} className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
