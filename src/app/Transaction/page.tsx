"use client";

import React from "react";

import Navbar from "@/components/Navbar";
import Contactus from "@/components/Contactus";
import EventList from "@/components/ui/EventList";
import PromotionList from "@/components/ui/PromotionList";

import TransactionStatusCard, {
  TransactionStatus,
} from "./components/TransactionStatusCard";

import OnGoingTransactionList from "./components/OnGoingTransactionList";

// ✅ tambahkan import ini
import TransactionDetail, {
  TransactionDetailData,
} from "./components/TransactionDetail";

// ✅ tambahkan import type dari card/list transaksi kamu
import { OnGoingTransaction } from "./components/OnGoingTransactionCard";

const statuses: TransactionStatus[] = [
  {
    id: 1,
    name: "To pay",
    icon: "/gambar/transaction/to-pay.png",
    href: "/transaction?status=to-pay",
  },
  {
    id: 2,
    name: "To Confirm",
    icon: "/gambar/transaction/admin-confirmation.png",
    href: "/transaction?status=to-confirm",
  },
  {
    id: 3,
    name: "My Booking",
    icon: "/gambar/transaction/my-booking.png",
    href: "/transaction?status=my-booking",
  },
  {
    id: 4,
    name: "To Rate",
    icon: "/gambar/transaction/to-rate.png",
    href: "/transaction?status=to-rate",
  },
];

function MyTransactions() {
  // ✅ state modal detail
  const [openDetail, setOpenDetail] = React.useState(false);
  const [selectedTrx, setSelectedTrx] =
    React.useState<TransactionDetailData | null>(null);

  // ✅ handler saat klik card transaksi
  const handleSelectTrx = (trx: OnGoingTransaction) => {
    // hanya buka detail jika belum bayar
    if (trx.status?.toLowerCase() !== "to pay") return;

    // map dari OnGoingTransaction -> TransactionDetailData (untuk tampilan)
    setSelectedTrx({
      id: trx.id,
      eventName: trx.eventName,
      eventDate: trx.eventDate,
      status: trx.status,
      dateline: trx.dateline,
      image: trx.image || "/thumbnail.jpeg",
      tickets: [
        { name: "Tiket vip", price: "Rp100.000,00" },
        { name: "Tiket reguler", price: "Rp100.000,00" },
        { name: "Tiket Konser", price: "Rp100.000,00" },
      ],
      total: "Rp300.000,00",
    });

    setOpenDetail(true);
  };

  return (
    <div>
      <Navbar />

      <div className="container mx-auto space-y-8 pt-10">
        {/* Transaction */}
        <div>
          <h1 className="mx-auto mb-5 p-5 text-4xl font-bold">
            My Transaction
          </h1>
          <div className="container mx-auto grid grid-cols-2 items-stretch gap-8 md:grid-cols-4">
            {statuses.map((status) => (
              <TransactionStatusCard key={status.id} status={status} />
            ))}
          </div>
        </div>

        {/* On Going Transaction */}
        <div>
          <h1 className="mx-auto mb-5 p-5 text-4xl font-bold">
            On Going Transaction
          </h1>

          {/* ✅ kirim handler agar klik card bisa buka modal */}
          <OnGoingTransactionList onSelect={handleSelectTrx} />
        </div>

        {/* Featured Event */}
        <div>
          <h1 className="mx-auto mb-5 p-8 text-4xl font-bold">
            Mungkin kamu juga tertarik:
          </h1>
        </div>
        <EventList />

        {/* Promotion card */}
        <div>
          <h1 className="container mx-auto mb-5 p-10 text-4xl font-bold">
            Promo yang sedang berlangsung:
          </h1>
          <PromotionList />
        </div>
      </div>

      {/* Footer */}
      <Contactus />

      {/* ✅ Modal Transaction Detail (muncul di atas page) */}
      <TransactionDetail
        open={openDetail}
        trx={selectedTrx}
        onClose={() => setOpenDetail(false)}
        onUpload={(file, trx) => {
          console.log("upload bukti pembayaran:", file, "trxId:", trx.id);
          // nanti: call API upload + update status
        }}
      />
    </div>
  );
}

export default MyTransactions;