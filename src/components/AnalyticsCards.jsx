function AnalyticsCards({
  totalOrders,
  totalRevenue,
  pendingOrders,
  deliveredOrders,
}) {
  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      color: "bg-blue-500",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue}`,
      color: "bg-green-500",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      color: "bg-yellow-500",
    },
    {
      title: "Delivered Orders",
      value: deliveredOrders,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white p-6 rounded-2xl shadow-lg`}
        >
          <h2 className="text-lg font-medium">
            {card.title}
          </h2>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;