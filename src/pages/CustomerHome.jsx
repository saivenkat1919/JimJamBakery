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

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-orange-50 min-h-screen">
      <Navbar />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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