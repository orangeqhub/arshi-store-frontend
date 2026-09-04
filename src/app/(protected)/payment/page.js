"use client";

import PaymentPageContent from "@/components/payment/paymentpage";

export default function PaymentPage() {
  // DUMMY CART DATA
  const cartItems = [
    {
      id: 1,
      name: "Mango Pickle (500g)",
      quantity: 1,
      price: 299,
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80",
    },
    {
      id: 2,
      name: "Murukulu (250g)",
      quantity: 2,
      price: 149,
      image:
        "https://images.unsplash.com/photo-1606491956689-2ea866880f85?w=400&q=80",
    },
  ];

  const summary = {
    subtotal: 597,
    total_items: 3,
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <PaymentPageContent
          cartItems={cartItems}
          summary={summary}
        />
      </div>
    </section>
  );
}