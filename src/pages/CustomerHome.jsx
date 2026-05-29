import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/config";

import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

function CustomerHome() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
  useState(true);

  const [search, setSearch] =
  useState("");

const [selectedCategory, setSelectedCategory] =
  useState("All");

  const fetchProducts = async () => {
    setLoading(true);
    const snapshot = await getDocs(
      collection(db, "products")
    );
    

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(
        data.filter(
            (product) => product.available
        )
        );
        setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );
}

const categories = [
  "All",
  "Cakes",
  "Pastries",
  "Cookies",
  "Drinks",
  "Snacks",
];

const filteredProducts = products.filter(
  (product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All"
        ? true
        : product.category ===
          selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
);

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-6">

        <div className="max-w-7xl mx-auto px-4 py-6 flex gap-3 overflow-x-auto">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() =>
        setSelectedCategory(category)
      }
      className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
        selectedCategory === category
          ? "bg-orange-500 text-white"
          : "bg-white text-gray-700"
      }`}
    >
      {category}
    </button>
  ))}
</div>
  <input
    type="text"
    placeholder="Search bakery items..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full bg-white p-4 rounded-2xl shadow border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
  />
</div>

      <div className="max-w-7xl mx-auto px-4 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
  <div className="col-span-full text-center py-20">
    <h2 className="text-3xl font-bold text-gray-500 mb-3">
      No matching products
    </h2>

    <p className="text-gray-400">
      Try another search or category
    </p>
  </div>
) : (
  filteredProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))
)}
      </div>
    </div>
  );
}

export default CustomerHome;