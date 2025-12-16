import React from "react";

type OrderSummaryItem = {
  label: string;
  value: string;
};

type OrderSummaryProps = {
  items?: OrderSummaryItem[];
  subtotal?: string;
  points?: string;
  total?: string;
};

export default function OrderSummary({
  items = Array.from({ length: 5 }).map(() => ({
    label: "1x Jenis Tiket",
    value: "Rp.total harga",
  })),
  subtotal = "Rp123.000.000,00",
  points = "(Rp456.789,00)",
  total = "Rp123.000.000,00",
}: OrderSummaryProps) {
  return (
    <aside className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="px-8 py-8">
        {/* Title */}
        <h3 className="text-3xl font-bold text-slate-900">
          Order Summary
        </h3>

        {/* Items */}
        <div className="mt-8 space-y-6">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-slate-700"
            >
              <p>{it.label}</p>
              <p>{it.value}</p>
            </div>
          ))}
        </div>

        <hr className="my-8 border-slate-200" />

        {/* Subtotal */}
        <div className="space-y-4 text-slate-700">
          <div className="flex items-center justify-between text-xl">
            <p>Subtotal :</p>
            <p>{subtotal}</p>
          </div>

          <div className="flex items-center justify-between text-xl">
            <p>Points :</p>
            <p>{points}</p>
          </div>
        </div>

        <hr className="my-6 border-slate-200" />

        {/* Total (dekat subtotal) */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-slate-900">Total:</p>
          <p className="text-2xl font-bold text-slate-900">{total}</p>
        </div>
      </div>
    </aside>
  );
}