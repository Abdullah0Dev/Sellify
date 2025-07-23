// Define type for the price object
type ItemPrice = {
  size: "S" | "M" | "L"; // Assuming these are the only possible sizes
  price: number;
  quantity?: number;
};

// Define product category type
type ProductCategory = {
  id: string;
  name: string;
};
// Define the main item product type
type CartProductType = {
  _id?: string;
  prices: ItemPrice[];
  average_rating: number;
  images: string[]; // Assuming these are image resource IDs
  ratings_count: string;
  brand?: string;
  selectedSize?: "S" | "M" | "L";
  name: string;
  description: string;
  category: string;
};

type CartSliceType = {
  cartList: CartProductType[];
  totalPrice: number;
  totalItems: number;
};

export { CartSliceType, CartProductType, ItemPrice };
