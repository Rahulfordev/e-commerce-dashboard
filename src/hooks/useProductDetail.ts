import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/types";

export const useProductDetail = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return res.data;
    },
  });
};
