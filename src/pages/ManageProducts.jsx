import { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import OwnerNavbar from "../components/OwnerNavbar";
import AddProductForm from "../components/AddProductForm";

function ManageProducts() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setProducts(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAvailability = async (
    id,
    current
  ) => {
    try {
      await updateDoc(
        doc(db, "products", id),
        {
          available: !current,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <OwnerNavbar />

      <div className="p-6 grid md:grid-cols-2 gap-6">
        <AddProductForm />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Product List
          </h2>

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">
                    {product.name}
                  </h3>

                  <p>
                    ₹{product.price}
                  </p>

                  <p>
                    {product.available
                      ? "Available"
                      : "Out of Stock"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      toggleAvailability(
                        product.id,
                        product.available
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;