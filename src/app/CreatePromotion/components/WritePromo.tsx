"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface ThumbnailResponse {
  fileURL: string;
  filePath: string;
}

const formSchema = z
  .object({
    voucherName: z
      .string()
      .min(3, "Voucher name must be at least 3 characters."),
    discountType: z.enum(["PERCENT", "AMOUNT"]),
    discountValue: z.coerce.number().min(1, "Discount value is required."),
    eventId: z.string().min(1, "Event ID is required."),

    startDate: z.string().min(1, "Start date is required."),
    endDate: z.string().min(1, "End date is required."),

    image: z.instanceof(File, { message: "Image is required." }),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) => (data.discountType === "PERCENT" ? data.discountValue <= 100 : true),
    {
      message: "Percent must be 1 - 100",
      path: ["discountValue"],
    }
  );

const CreatePromotionVoucherPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      voucherName: "",
      discountType: "PERCENT",
      discountValue: 10,
      eventId: "",
      startDate: "",
      endDate: "",
      image: undefined,
    },
  });

  const { mutateAsync: createVoucher, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      // Upload image
      const formData = new FormData();
      const folderName = "images";
      const fileName = Date.now() + Math.floor(Math.random() * 1000);
      const url = `/api/files/${folderName}/${fileName}`;

      formData.append("file", data.image);
      const upload = await axiosInstance.post<ThumbnailResponse>(url, formData);

      // Save voucher (sesuaikan endpoint & field sesuai API kamu)
      await axiosInstance.post(`/api/data/PromotionVouchers`, {
        voucher_name: data.voucherName,
        discount_type: data.discountType, // "PERCENT" | "AMOUNT"
        discount_value: data.discountValue,
        event_id: data.eventId,
        start_date: data.startDate,
        end_date: data.endDate,
        image: upload.data.fileURL,
      });
    },
    onSuccess: () => {
      toast.success("Promotion voucher created successfully!");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to create promotion voucher.");
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await createVoucher(data);
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <form id="form-voucher" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Nama Voucher */}
            <Controller
              name="voucherName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="voucherName">Nama Voucher</FieldLabel>
                  <Input
                    {...field}
                    id="voucherName"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    placeholder="Contoh: NEWYEAR10"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Jenis Potongan + Nilai */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name="discountType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Jenis Potongan</FieldLabel>
                    <select
                      value={field.value}
                      onChange={field.onChange}
                      className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-600/30"
                      aria-invalid={fieldState.invalid ? "true" : "false"}
                    >
                      <option value="PERCENT">Persen (%)</option>
                      <option value="AMOUNT">Nominal (Rp)</option>
                    </select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="discountValue"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                    <FieldLabel>
                      Nilai Potongan (
                      {form.watch("discountType") === "PERCENT" ? "%" : "Rp"})
                    </FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      aria-invalid={fieldState.invalid ? "true" : "false"}
                      placeholder={
                        form.watch("discountType") === "PERCENT" ? "10" : "50000"
                      }
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Event ID */}
            <Controller
              name="eventId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="eventId">
                    Berlaku pada Event (Event ID)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="eventId"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    placeholder="Masukkan ID Event"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Start Date & End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="startDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                    <Input
                      {...field}
                      id="startDate"
                      type="datetime-local"
                      aria-invalid={fieldState.invalid ? "true" : "false"}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="endDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="endDate">End Date</FieldLabel>
                    <Input
                      {...field}
                      id="endDate"
                      type="datetime-local"
                      aria-invalid={fieldState.invalid ? "true" : "false"}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Image */}
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">Voucher Image</FieldLabel>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) field.onChange(file);
                    }}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit */}
            <Field className="w-fit">
              <Button type="submit" form="form-voucher" disabled={isPending}>
                {isPending ? "Loading..." : "Submit"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default CreatePromotionVoucherPage;