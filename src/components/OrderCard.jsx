import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";

function OrderCard({ order }) {
  // STATUS COLORS

  const statusColors = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    Preparing:
      "bg-blue-100 text-blue-700",

    Ready:
      "bg-purple-100 text-purple-700",

    Delivered:
      "bg-green-100 text-green-700",

    Cancelled:
      "bg-red-100 text-red-700",
  };

  // UPDATE STATUS

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      const orderRef = doc(
        db,
        "orders",
        id
      );

      await updateDoc(orderRef, {
        status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      {/* TOP */}

      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {order.customerName}
          </h2>

          <p className="text-gray-500 text-sm">
            {order.customerEmail}
          </p>
        </div>

        {/* STATUS BADGE */}

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      {/* ITEMS */}

      <div className="mt-4 space-y-2">
        {order.items.map(
          (item, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2"
            >
              <span>
                {item.name}
              </span>

              <span>
                × {item.quantity}
              </span>
            </div>
          )
        )}
      </div>

      {/* TOTAL */}

      <div className="mt-4 flex justify-between items-center">
        <h3 className="text-lg font-bold">
          Total
        </h3>

        <p className="text-2xl font-bold text-orange-500">
          ₹{order.total}
        </p>
      </div>

      {/* STATUS SELECT */}

      <select
        value={order.status}
        onChange={(e) =>
          updateStatus(
            order.id,
            e.target.value
          )
        }
        className="w-full border rounded-xl p-3 mt-5"
      >
        <option value="Pending">
          Pending
        </option>

        <option value="Preparing">
          Preparing
        </option>

        <option value="Ready">
          Ready
        </option>

        <option value="Delivered">
          Delivered
        </option>

        <option value="Cancelled">
          Cancelled
        </option>
      </select>
    </div>
  );
}

export default OrderCard;