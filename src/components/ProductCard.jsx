import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } =
    useContext(CartContext);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold">
            {product.name}
          </h2>

          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-lg text-sm">
            {product.category}
          </span>
        </div>

        <p className="text-2xl font-bold text-orange-500">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 transition text-white p-3 rounded-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;