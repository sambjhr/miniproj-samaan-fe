"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { ApiError } from "next/dist/server/api-utils";


const ticketSchema = z.object({
  name: z.string().min(1, "Ticket name is required."),
  price: z.coerce.number().min(0, "Price must be 0 or more."),
  quota: z.coerce.number().int().min(1, "Quota must be at least 1."),
});

const formSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters."),
    category: z.string().min(3, "Category must be at least 3 characters."),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters."),
    startDate: z.string().min(1, "Start date is required."),
    endDate: z.string().min(1, "End date is required."),
    location: z.string().min(1, "Location is required."),
    image: z.instanceof(File, { message: "Thumbnail is required." }),
    tickets: z
      .array(ticketSchema)
      .min(1, "At least 1 ticket type is required."),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

  export type FormValues = z.infer<typeof formSchema>;

const WritePage = () => {
  const router = useRouter();
  const session = useSession();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      category: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      image: undefined,
      tickets: [{ name: "", price: 0, quota: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tickets",
  });

  const { mutateAsync: write, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const token = session.data?.user.accessToken;
      if(!token) throw new ApiError(401, "No acess token");

      const formData = new FormData();
      
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("start_date", data.startDate);
      formData.append("end_date", data.endDate);
      formData.append("location", data.location);
      formData.append("image", data.image);
      formData.append("tickets", JSON.stringify(data.tickets));

      // Kirim data ke database
      await axiosInstance.post(`/events/`, formData, {
        headers: {Authorization: `Bearer ${token}`},
      });
    },
    onSuccess: () => {
      toast.success("Event created successfully!");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to create event.");
    },
  });

  // 🧩 Submit handler
  async function onSubmit(data: z.infer<typeof formSchema>) {
    await write(data);
  }

  // 🧩 UI Form
  return (
    <div>
      <div className="container mx-auto p-4 max-w-7xl">
        <form id="form-write" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Event Name</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    placeholder="Enter your event name here!"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Category */}
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Input
                    {...field}
                    id="category"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    placeholder="Category"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    placeholder="Short description"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Start & End Date */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

            {/* location */}
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input
                    {...field}
                    id="location"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    placeholder="Location - exp: Jakarta"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Thumbnail */}
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">Thumbnail Image</FieldLabel>
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

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Types of Ticket</FieldLabel>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ name: "", price: 0, quota: 1 })}
                  className="gap-2"
                >
                  <Plus size={16} />
                  Add Ticket
                </Button>
              </div>

              <div className="mt-4 space-y-4">
                {fields.map((f, index) => (
                  <div
                    key={f.id}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Ticket #{index + 1}</p>

                      {fields.length > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                          Remove
                        </Button>
                      ) : null}
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                      {/* Ticket Name */}
                      <Controller
                        name={`tickets.${index}.name`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Ticket Name</FieldLabel>
                            <Input
                              {...field}
                              placeholder="VIP / Regular / etc"
                            />
                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* Price */}
                      <Controller
                        name={`tickets.${index}.price`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Price</FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              min={0}
                              placeholder="100000"
                            />
                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* Quota */}
                      <Controller
                        name={`tickets.${index}.quota`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Quota</FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              min={1}
                              placeholder="100"
                            />
                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Field>

            {/* Submit Button */}
            <Field className="w-fit">
              <Button type="submit" form="form-write" disabled={isPending}>
                {isPending ? "Loading..." : "Submit"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default WritePage;
