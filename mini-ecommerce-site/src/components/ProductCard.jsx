import React from "react";
import { Star } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
    const filledStars = Math.round(product.rating.rate);

    return (
        <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center
        shadow-[0_10px_25px_rgba(150,150,200,0.25)]
        hover:shadow-[0_12px_30px_rgba(150,150,200,0.35)]
        transition-all duration-300 select-none">

            <div className="h-44 w-full flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                from-pink-200/30 via-purple-200/30 to-indigo-200/30"></div>

                <img
                    src={product.image}
                    alt={product.title}
                    className="relative max-h-40 object-contain 
                    hover:scale-110 transition-transform duration-300"
                />
            </div>

            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">
                {product.title}
            </h3>

            <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < filledStars ? "text-yellow-500" : "text-gray-300"}`}
                        fill={i < filledStars ? "#facc15" : "none"}
                    />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                    ({product.rating.count})
                </span>
            </div>

            <p className="mt-2 text-lg font-bold bg-gradient-to-r 
            from-pink-500 to-indigo-500 text-transparent bg-clip-text">
                ${product.price}
            </p>

            <button
                onClick={onAdd}
                className="mt-3 w-full bg-gradient-to-r from-gray-900 to-gray-800 
                text-white text-sm px-4 py-2 rounded-full font-medium
                hover:opacity-90 active:scale-95 transition"
            >
                Add to Cart
            </button>
        </div>
    );
}
