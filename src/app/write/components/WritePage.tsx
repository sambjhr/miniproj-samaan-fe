"use client";

import Navbar from "@/components/Navbar";
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

interface ThumbnailResponse {
  fileURL: string;
  filePath: string;
}

// 🧩 Skema validasi form
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  organizer: z.string().min(3, "Author must be at least 3 characters."),
  category: z.string().min(3, "Category must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  image: z.instanceof(File, { message: "Thumbnail is required." }),
});

const WritePage = () => {
  const router = useRouter();

  // 🧩 Gunakan useForm dengan zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      organizer: "",
      category: "",
      description: "",
      content: "",
      image: undefined,
    },
  });

  // 🧩 Mutation untuk submit form
  const { mutateAsync: write, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      const folderName = "images";
      const fileName = Date.now() + Math.floor(Math.random() * 1000);
      const url = `/api/files/${folderName}/${fileName}`;

      formData.append("file", data.image);

      // Upload file
      const result = await axiosInstance.post<ThumbnailResponse>(url, formData);

      // Kirim data ke database
      await axiosInstance.post(`/api/data/Blogs`, {
        author: data.organizer,
        category: data.category,
        content: data.content,
        description: data.description,
        title: data.title,
        thumbnail: result.data.fileURL,
      });
    },
    onSuccess: () => {
      toast.success("Blog created successfully!");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to create blog.");
    },
  });

  // 🧩 Submit handler
  async function onSubmit(data: z.infer<typeof formSchema>) {
    await write(data);
  }

  // 🧩 UI Form
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
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
                    placeholder="Your title"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Author harusnya bisa langsung ambil dari pas login*/} 
            {/* <Controller
              name="author"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="author">Organizer</FieldLabel>
                  <Input
                    {...field}
                    id="author"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    placeholder="Author name"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}

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


            {/* ini untuk tempat masukin types of ticket */}



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
