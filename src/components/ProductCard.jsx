import { useContext } from "react";

import {
  FiPlus,
  FiMinus,
} from "react-icons/fi";

import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  // FIND ITEM IN CART

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      {/* IMAGE */}

      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      {/* CONTENT */}

      <div className="p-4">
        {/* TITLE */}

        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-bold">
              {product.name}
            </h2>

            {product.available === false && (
  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full inline-block mt-1">
    Out of Stock
  </span>
)}

            {/* IN CART LABEL */}

            {cartItem && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block mt-1">
                {cartItem.quantity} in cart
              </span>
            )}
          </div>

          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-lg text-sm">
            {product.category}
          </span>
        </div>

        {/* PRICE */}

        <p className="text-2xl font-bold text-orange-500">
          ₹{product.price}
        </p>

        {/* ACTION BUTTONS */}

        {!product.available ? (
  <button
    disabled
    className="mt-4 w-full bg-gray-300 text-gray-600 p-3 rounded-xl font-semibold cursor-not-allowed"
  >
    Out of Stock
  </button>
) : !cartItem ? (
  <button
    onClick={() =>
      addToCart(product)
    }
    className="mt-4 w-full bg-orange-500 hover:bg-orange-600 transition text-white p-3 rounded-xl font-semibold"
  >
    Add to Cart
  </button>
) : (
  <div className="mt-4 flex items-center justify-between bg-orange-50 rounded-xl p-2">
    <button
      onClick={() =>
        decreaseQuantity(
          product.id
        )
      }
      className="bg-white shadow p-3 rounded-lg"
    >
      <FiMinus />
    </button>

    <span className="text-xl font-bold">
      {cartItem.quantity}
    </span>

    <button
      onClick={() =>
        increaseQuantity(
          product.id
        )
      }
      className="bg-orange-500 text-white p-3 rounded-lg"
    >
      <FiPlus />
    </button>
  </div>
)}
      </div>
    </div>
  );
}

export default ProductCard;