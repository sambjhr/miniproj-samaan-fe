import React from "react";

type TicketTypeCardProps = {
  title?: string;
  qty?: number;
  priceTitle?: string;
  remainingText?: string;
};

export default function TicketTypesCard({
  title = "Nama Jenis Tiket",
  qty = 10,
  priceTitle = "Harga Tiket",
  remainingText = "X - Tiket Remaining",
}: TicketTypeCardProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg">
      {/* Top row */}
      <div className="flex items-start justify-between px-8 pt-8 pb-2">
        <p className="text-xl font-extrabold text-slate-900">{title}</p>

        <div className="flex items-center gap-6">
          {/* Qty badge */}
          <div className="flex h-14 min-w-[72px] items-center justify-center rounded-xl bg-slate-100">
            <span className="text-xl font-bold text-slate-900">{qty}</span>
          </div>

          {/* Stepper (visual) */}
          <div className="flex h-14 items-center overflow-hidden rounded-xl bg-sky-100/80">
            <button
              type="button"
              className="flex h-14 w-16 items-center justify-center text-3xl text-slate-700"
              aria-label="Kurangi jumlah"
            >
              −
            </button>

            <div className="h-8 w-px bg-slate-300/70" />

            <button
              type="button"
              className="flex h-14 w-16 items-center justify-center text-3xl text-slate-700"
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-slate-200" />

      {/* Bottom row */}
      <div className="px-8 pt-5 pb-5">
        <p className="text-xl font-extrabold text-slate-900">{priceTitle}</p>
        <p className="mt-3 text-xl text-slate-500">{remainingText}</p>
      </div>
    </div>
  );
}
