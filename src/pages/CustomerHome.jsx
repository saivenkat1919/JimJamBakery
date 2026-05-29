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

  const fetchProducts = async () => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <Navbar />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomerHome;