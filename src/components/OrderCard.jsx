import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

function OrderCard({ order }) {
  const updateStatus = async (status) => {
    try {
      const orderRef = doc(db, "orders", order.id);

      await updateDoc(orderRef, {
        status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Preparing: "bg-blue-100 text-blue-700",
  Ready: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
};

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">
            {order.customerName}
          </h2>

          <p
  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
>
  {order.status}
</p>
        </div>

        <div className="font-bold">
          ₹{order.total}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div key={index}>
            {item.name} × {item.quantity}
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() =>
            updateStatus("Preparing")
          }
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          Preparing
        </button>

        <button
          onClick={() =>
            updateStatus("Ready")
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Ready
        </button>

        <button
          onClick={() =>
            updateStatus("Delivered")
          }
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Delivered
        </button>
      </div>
    </div>
  );
}

export default OrderCard;