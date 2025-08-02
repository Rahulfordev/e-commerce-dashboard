"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/lib/validators/product";
import { toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { SubmitHandler } from "react-hook-form";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    try {
      console.log("Simulated POST:", data);
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Product added successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white rounded-xl shadow border border-gray-100 p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-black">
          Add a New Product
        </h2>

        {[
          { label: "Title", name: "title", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Category", name: "category", type: "text" },
          { label: "Image URL", name: "image", type: "text" },
        ].map((field) => (
          <div key={field.name} className="space-y-1">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              {...register(field.name as keyof ProductFormData)}
              type={field.type}
              id={field.name}
              className="w-full px-4 py-2 border border-pastelLavender rounded-md focus:outline-none focus:ring-1 focus:ring-pastelLavender transition"
            />
            {errors[field.name as keyof ProductFormData] && (
              <p className="text-sm text-red-500">
                {errors[field.name as keyof ProductFormData]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="space-y-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            id="description"
            className="w-full px-4 py-2 border border-pastelLavender rounded-md focus:outline-none focus:ring-1 focus:ring-pastelLavender transition"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primarySecondary cursor-pointer transition duration-200 shadow-md hover:shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          Add Product
        </button>
      </form>
    </section>
  );
}
