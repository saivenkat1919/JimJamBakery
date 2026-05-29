import { useState } from "react";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "../firebase/config";

function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] =
    useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] =
    useState(false);

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        category,
        image,
        available: true,
      });

      alert("Product added");

      setName("");
      setPrice("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={addProduct}
      className="bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">
        Add Product
      </h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) =>
          setImage(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
        required
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded-lg"
      >
        {loading
          ? "Adding..."
          : "Add Product"}
      </button>
    </form>
  );
}

export default AddProductForm;