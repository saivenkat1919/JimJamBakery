import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/config";

import OwnerNavbar from "../components/OwnerNavbar";
import OrderCard from "../components/OrderCard";
import AnalyticsCards from "../components/AnalyticsCards";

function OwnerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
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
  }, []);

  // ANALYTICS

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.total,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <div className="bg-gray-100 min-h-screen">
      <OwnerNavbar />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* PAGE HEADING */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Bakery Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor orders and bakery
            performance
          </p>
        </div>

        {/* ANALYTICS CARDS */}

        <AnalyticsCards
          totalOrders={totalOrders}
          totalRevenue={totalRevenue}
          pendingOrders={pendingOrders}
          deliveredOrders={deliveredOrders}
        />

        {/* RECENT ORDERS */}

        <h2 className="text-2xl font-bold mb-4">
          Recent Orders
        </h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;