"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type TicketLine = {
  name: string;
  price: string; // "Rp100.000,00"
};

export type TransactionDetailData = {
  id: string | number;
  eventName: string;
  eventDate: string;
  status: string; // "To Pay" / "To be confirm" / etc
  dateline?: string;
  tickets: TicketLine[];
  total: string; // "Rp300.000,00"
  image?: string; // thumbnail event
};

const uploadSchema = z.object({
  image: z.instanceof(File, { message: "Bukti pembayaran wajib diupload." }),
});

type UploadForm = z.infer<typeof uploadSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  trx: TransactionDetailData | null;
  // kalau mau handle submit upload beneran nanti:
  onUpload?: (file: File, trx: TransactionDetailData) => Promise<void> | void;
};

export default function TransactionDetail({
  open,
  onClose,
  trx,
  onUpload,
}: Props) {
  const form = useForm<UploadForm>({
    resolver: zodResolver(uploadSchema),
    mode: "onChange",
    defaultValues: { image: undefined },
  });

  if (!open || !trx) return null;

  const canUpload = trx.status.toLowerCase() === "to pay";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
      />

      {/* card */}
      <div className="relative z-10 w-full max-w-md rounded-[40px] border border-slate-300 bg-white p-6">
        {/* top image */}
        <div className="h-44 w-full overflow-hidden rounded-2xl bg-slate-200">
          <img
            src={trx.image || "/thumbnail.jpeg"}
            alt={trx.eventName}
            className="block h-full w-full object-cover"
          />
        </div>

        {/* info */}
        <div className="mt-6 space-y-2 text-slate-900">
          <p className="text-xl">
            <span className="font-semibold">Transactionid:</span> {trx.id}
          </p>
          <p className="text-xl">{trx.eventName}</p>
          <p className="text-xl">{trx.eventDate}</p>
        </div>

        <hr className="my-5 border-slate-300" />

        {/* jenis tiket */}
        <div className="text-slate-900">
          <p className="text-2xl font-bold">Jenis Tiket:</p>

          <div className="mt-3 space-y-2">
            {trx.tickets.map((t, idx) => (
              <div key={idx} className="flex items-center justify-between text-xl">
                <p>{idx + 1}. {t.name}</p>
                <p>{t.price}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-5 border-slate-300" />

        {/* total harga */}
        <div className="flex items-center justify-between text-slate-900">
          <p className="text-2xl font-bold">Harga</p>
          <p className="text-2xl">{trx.total}</p>
        </div>

        {/* status + dateline */}
        <div className="mt-8 text-center text-slate-900">
          <p className="text-xl">Status: {trx.status}</p>
          <p className="mt-4 text-xl">
            Dateline Pembayaran:
            <br />
            {trx.dateline ? trx.dateline : "(jika belum bayar)"}
          </p>
        </div>

        {/* upload bukti pembayaran (hanya kalau To Pay) */}
        {canUpload ? (
          <div className="mt-8">
            <form
              onSubmit={form.handleSubmit(async (data) => {
                if (onUpload) await onUpload(data.image, trx);
                // reset setelah submit
                form.reset();
              })}
            >
              <FieldGroup>
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      {/* label dibuat seperti tombol pill */}
                      <FieldLabel
                        htmlFor="image"
                        className="mx-auto block w-full cursor-pointer rounded-full bg-slate-300 py-4 text-center text-xl font-medium text-slate-900"
                      >
                        upload bukti pembayaran
                      </FieldLabel>

                      {/* SNIPPET kamu (tetap Controller + Input file) */}
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        aria-invalid={fieldState.invalid ? "true" : "false"}
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) field.onChange(file);
                        }}
                      />

                      {fieldState.error && (
                        <div className="mt-3">
                          <FieldError errors={[fieldState.error]} />
                        </div>
                      )}
                    </Field>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-4 w-full rounded-full"
                  disabled={!form.formState.isValid}
                >
                  Submit
                </Button>
              </FieldGroup>
            </form>
          </div>
        ) : null}

        {/* close button kecil */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm text-slate-700 shadow"
        >
          Close
        </button>
      </div>
    </div>
  );
}