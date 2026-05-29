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

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <Navbar />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length === 0 ? (
  <div className="col-span-full text-center py-20">
    <h2 className="text-2xl font-bold text-gray-500">
      No products available
    </h2>
  </div>
) : (
  products.map((product) => (
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