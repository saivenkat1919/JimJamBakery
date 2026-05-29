import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

import Navbar from "../components/Navbar";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where(
        "customerId",
        "==",
        user.uid
      ),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setOrders(data);
      }
    );

    return () => unsubscribe();
  }, [user.uid]);

  const statusColors = {
    Pending:
      "bg-yellow-100 text-yellow-700",
    Preparing:
      "bg-blue-100 text-blue-700",
    Ready:
      "bg-purple-100 text-purple-700",
    Delivered:
      "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Track your bakery orders live
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-500 mb-4">
              No orders yet
            </h2>

            <p className="text-gray-400">
              Place your first bakery order
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{order.id.slice(0, 6)}
                    </h2>

                    <p className="text-gray-500">
                      Total: ₹{order.total}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;