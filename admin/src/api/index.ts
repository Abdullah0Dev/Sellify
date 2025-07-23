import axios from "axios";

// Optional: create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Type for your product
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

// ✅ Create a new product
export const createProduct = async (product: ProductType) => {
  const res = await axiosInstance.post("/products", product);
  return res.data;
};

// ✅ Get all products
export const getProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

// ✅ Get one product by ID
export const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

// ✅ Update product by ID
export const updateProduct = async (id: string, product: Partial<ProductType>) => {
  const res = await axiosInstance.put(`/products/${id}`, product);
  return res.data;
};

// ✅ Delete product
export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};
