"use client";

import TicketTypesCard from "./EventTicketTypesCard";


const TicketTypeList = () => {
  const dummyTickets = [
    {
      id: 1,
      title: "VIP Ticket",
      qty: 10,
      priceTitle: "Harga Tiket",
      remainingText: "20 - Tiket Remaining",
    },
    {
      id: 2,
      title: "Regular Ticket",
      qty: 10,
      priceTitle: "Harga Tiket",
      remainingText: "50 - Tiket Remaining",
    },
    {
      id: 3,
      title: "Festival Ticket",
      qty: 10,
      priceTitle: "Harga Tiket",
      remainingText: "100 - Tiket Remaining",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {dummyTickets.map((ticket) => (
        <div
          key={ticket.id}
          className="overflow-hidden py-4"
        >
          <TicketTypesCard
            title={ticket.title}
            qty={ticket.qty}
            priceTitle={ticket.priceTitle}
            remainingText={ticket.remainingText}
          />
        </div>
      ))}
    </div>
  );
};

export default TicketTypeList;