// My API HERE!!

// src/services/productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

// Define your product type
export type ProductType = {
  _id?: string;
  name: string;
  description: string;
  images: string[];
  prices: { size: "S" | "M" | "L"; price: number }[];
  category: string;
  brand?: string;
  average_rating: number;
  ratings_count: string;
  quantity: number;
};
const BASE_URL =
  Platform.OS === "ios" ? "http://localhost:4000" : "http://10.0.2.2:4000";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      // Add auth token if needed
      // const token = getState().auth.token;
      // if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Product"], // For cache invalidation
  endpoints: (builder) => ({
    // ✅ Get all products
    getProducts: builder.query<ProductType[], void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
              "Product",
            ]
          : ["Product"],
    }),

    // ✅ Get product by ID
    getProductById: builder.query<ProductType, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // ✅ Create new product
    createProduct: builder.mutation<ProductType, Omit<ProductType, "_id">>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    // ✅ Update product
    updateProduct: builder.mutation<
      ProductType,
      { id: string; updates: Partial<ProductType> }
    >({
      query: ({ id, updates }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),

    // ✅ Delete product
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
