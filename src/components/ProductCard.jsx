import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-600">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-orange-500 text-white p-2 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;