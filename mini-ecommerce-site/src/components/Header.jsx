import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const active = ({ isActive }) =>
        isActive ? "text-blue-600 font-semibold" : "text-gray-700";

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/?search=${search}`);
    }

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">

                {/* Logo */}
                <div
                    className="text-2xl font-bold text-blue-600 cursor-pointer whitespace-nowrap"
                    onClick={() => navigate("/")}
                >
                    Mini E-Com
                </div>

                {/* Search */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 flex justify-center order-3 sm:order-none w-full sm:w-auto"
                >
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-lg border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </form>

                {/* Navigation */}
                <nav className="flex items-center gap-6 whitespace-nowrap text-sm font-medium">
                    <NavLink to="/" className={active}>Home</NavLink>

                    <NavLink to="/checkout" className={active}>Checkout</NavLink>

                    {/* Cart link with badge */}
                    <NavLink to="/cart" className="relative">
                        <span className={active}>Cart</span>
                        <span className="
              absolute -top-2 -right-3 
              bg-red-600 text-white text-xs
              font-semibold rounded-full 
              h-5 w-5 flex items-center justify-center
              shadow-md
            ">
                            {totalItems}
                        </span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
