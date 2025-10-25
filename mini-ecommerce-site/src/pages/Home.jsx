import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

import HeroSection from "../components/HeroSection";
import CategoriesFilter from "../components/CategoriesFilter";
import TrendingProducts from "../components/TrendingProducts";
import NewArrivals from "../components/NewArrivals";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(1000);

    const { addItem } = useCart();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchText = searchParams.get("search")?.toLowerCase() || "";

    async function fetchProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            setProducts(data);
            setDisplayProducts(data);
            setLoading(false);
        } catch {
            setLoading(false);
        }
    }

    async function fetchCategories() {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data);
    }

    useEffect(() => {
        setLoading(true);
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        let filtered = products
            .filter(item => item.price <= maxPrice)
            .filter(item => item.title.toLowerCase().includes(searchText));

        if (selectedCategory) {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        setDisplayProducts(filtered);
    }, [maxPrice, searchText, selectedCategory, products]);

    return (
        <div className="container mx-auto px-4">

            {products.length > 0 && <HeroSection products={products} />}

            {/* Categories + Price Filter Section */}
            <section className="mt-12 mb-6">
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">

                    <div className="flex-grow">
                        <CategoriesFilter
                            categories={categories}
                            selected={selectedCategory}
                            onSelect={setSelectedCategory}
                        />
                    </div>

                    <div className="bg-white p-3 rounded-lg shadow border flex items-center gap-3">
                        <span className="text-gray-700 text-sm whitespace-nowrap">
                            Max Price: ${maxPrice}
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={1000}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-32"
                        />
                    </div>

                </div>
            </section>

            {/* Hide these when a category is chosen */}
            {!selectedCategory && (
                <>
                    <TrendingProducts products={products} onAdd={addItem} />
                    <NewArrivals products={products} onAdd={addItem} />
                </>
            )}

            {/* Products Result Header */}
            <div className="text-center mt-10 mb-6">
                <h2 className="text-3xl font-extrabold 
                    bg-clip-text text-transparent bg-gradient-to-r 
                    from-blue-500 to-purple-600 mb-2">
                    {selectedCategory
                        ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                        : "All Products"}
                </h2>

                <p className="text-gray-600 text-sm">
                    Showing {displayProducts.length} item(s)
                </p>
            </div>

            {/* Filtered Products Grid */}
            <div className="mt-10">
                {loading ? (
                    <p className="text-center text-gray-600 py-12">Loading products...</p>
                ) : displayProducts.length > 0 ? (
                    <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16">
                        {displayProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={() => addItem(product)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 py-12">No products found</p>
                )}
            </div>

        </div>
    );
}
