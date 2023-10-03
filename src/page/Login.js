import React, { useState } from "react";
import loginsignupimg from "../asset/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch} from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    // console.log(data);
    const navigate = useNavigate();

    // const userData = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        if (email && password) {
            const fetchData = await fetch(
                `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const dataRes = await fetchData.json();
            console.log(dataRes);
            if (dataRes.alert) {
                toast.success(dataRes.message);
                dispatch(loginRedux(dataRes));
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                toast.error(dataRes.message);
            }
        } else {
            toast.error("Please enter required fields!");
        }
    };
    return (
        <div className="p-3 md:p-4">
            <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
                {/* <h1 className="text-center text-2xl font-bold">Sign up</h1> */}
                <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
                    <img src={loginsignupimg} className="w-full" alt=""/>
                </div>

                <form
                    className="w-11/12 py-3 flex flex-col"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    />

                    <label htmlFor="password">Password</label>
                    <div className="flex mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleOnChange}
                            className="w-full bg-slate-200 border-none outline-none"
                        />
                        <span
                            className="flex pt-1 text-xl cursor-pointer"
                            onClick={handleShowPassword}
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <button className=" w-full max-w-[150px] m-auto bg-blue-300 hover:bg-blue-500 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                        Login
                    </button>
                </form>

                <p className="text-sm mt-2">
                    Don't have account?{" "}
                    <Link to={"/signup"} className="text-blue-400 underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
