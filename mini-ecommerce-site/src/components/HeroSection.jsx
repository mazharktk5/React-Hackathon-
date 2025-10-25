import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ products }) {
    const navigate = useNavigate();
    const featured = products[0];

    return (
        <section className="w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-3xl py-16 px-6 mb-12 shadow-lg">
            <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">

                {/* Text */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Discover. Shop. Enjoy.
                    </h1>

                    <p className="text-gray-800 text-lg max-w-md">
                        Your favorite collection is ready. Choose what suits your vibe and let style evolve.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 duration-200"
                    >
                        Start Shopping
                    </button>
                </div>

                {/* Image */}
                <div className="relative flex justify-center items-center">
                    <div className="absolute w-60 h-60 bg-white opacity-20 blur-2xl rounded-full"></div>

                    <div className="w-56 h-56 bg-white rounded-2xl shadow-xl flex justify-center items-center overflow-hidden border border-gray-200">
                        {featured ? (
                            <img
                                src={featured.image}
                                alt="Featured product"
                                className="w-48 h-48 object-contain transform hover:scale-110 transition"
                            />
                        ) : (
                            <span className="text-gray-600 text-sm">Loading...</span>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
