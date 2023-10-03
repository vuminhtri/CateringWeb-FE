import React, { useState } from "react";
import logo from "../asset/logo2_1.png";
import { Link } from "react-router-dom";
import {
    HiMenu,
    HiOutlineUserCircle,
    HiOutlineLogin,
    HiOutlineLogout,
    HiOutlinePlusCircle,
} from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { RiContactsFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
    const [showAccountManagement, setShowAccountManagement] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleShowAccountManagement = () => {
        setShowAccountManagement(!showAccountManagement);
    };
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    };
    const handleLogout = () => {
        dispatch(logoutRedux());
        toast.success("Logout successfully");
    };

    const productCartItem = useSelector((state) => state.product.cartItem)
    return (
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
            {/* Desktop */}
            <div className="flex items-center h-full justify-between">
                <Link to={""}>
                    <div className="h-12">
                        <img className="h-full" src={logo} alt="Logo" />
                    </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-7 ">
                    <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
                        <Link to={""}>Home</Link>
                        <Link to={"menu"}>Menu</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    <div className="text-slate-600 md:hidden" onClick={handleShowMenu}>
                        <div className="text-2xl cursor-pointer mt-0.5">
                            <HiMenu />
                        </div>
                        {showMenu && (
                            <div className="absolute right-0 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                                <nav className="text-base flex flex-col">
                                    <Link
                                        to={""}
                                        className="px-2 py-1 whitespace-nowrap cursor-pointer flex items-center"
                                    >
                                        <span className="mr-2">
                                            <FaHome />
                                        </span>
                                        Home
                                    </Link>
                                    <Link
                                        to={"menu/63f0fdbb3bcc2f97fa53d25d"}
                                        className="px-2 py-1 whitespace-nowrap cursor-pointer flex items-center"
                                    >
                                        <span className="mr-2">
                                            <BiSolidFoodMenu />
                                        </span>
                                        Menu
                                    </Link>
                                    <Link
                                        to={"about"}
                                        className="px-2 py-1 whitespace-nowrap cursor-pointer flex items-center"
                                    >
                                        <span className="mr-2">
                                            <FaHome />
                                        </span>
                                        About
                                    </Link>
                                    <Link
                                        to={"contact"}
                                        className="px-2 py-1 whitespace-nowrap cursor-pointer flex items-center"
                                    >
                                        <span className="mr-2">
                                            <RiContactsFill />
                                        </span>
                                        Contact
                                    </Link>
                                </nav>
                            </div>
                        )}
                    </div>

                    <div className="text-2xl text-slate-600 relative">
                        <Link to={"cart"}>
                            <BsCartFill />
                            <div className="absolute -top-1 -right-2 text-white bg-red-500 h-4 w-4 rounded-full text-xs text-center">
                                {productCartItem.length}
                            </div>
                        </Link>
                    </div>
                    <div className="text-slate-600" onClick={handleShowAccountManagement}>
                        <div className="text-3xl cursor-pointer w-7 h-7 rounded-full overflow-hidden">
                            {userData.image ? (
                                <img
                                    src={userData.image}
                                    className="w-full h-full"
                                    alt="User"
                                />
                            ) : (
                                <HiOutlineUserCircle />
                            )}
                        </div>
                        {showAccountManagement && (
                            <div className="absolute right-0 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                                    <Link
                                        to={"newproduct"}
                                        className="whitespace-nowrap cursor-pointer flex items-center"
                                    >
                                        <span className="mr-2">
                                            <HiOutlinePlusCircle />
                                        </span>
                                        New Product
                                    </Link>
                                )}
                                {userData._id ? (
                                    <p
                                        className="whitespace-nowrap cursor-pointer flex items-center"
                                        onClick={handleLogout}
                                    >
                                        <span className="mr-2">
                                            <HiOutlineLogout />
                                        </span>
                                        Logout
                                    </p>
                                ) : (
                                    <Link
                                        to={"login"}
                                        className="whitespace-nowrap cursor-pointer flex items-center"
                                    >
                                        <span className="mr-2">
                                            <HiOutlineLogin />
                                        </span>
                                        Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile */}
        </header>
    );
};

export default Header;
