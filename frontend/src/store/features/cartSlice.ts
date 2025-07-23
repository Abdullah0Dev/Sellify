import { CartProductType, CartSliceType, ItemPrice } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartSliceType = {
  cartList: [],
  totalPrice: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
    addToCart(
      state,
      action: PayloadAction<CartProductType & { selectedSize: "S" | "M" | "L" }>
    ) {
      const newItem = action.payload;

      const existingItem = state.cartList.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        // find size index
        const sizeObj = existingItem.prices.find(
          (p) => p.size === newItem.selectedSize
        );
        if (sizeObj) {
          sizeObj.quantity = (sizeObj.quantity || 0) + 1;
          state.totalItems += 1;
          state.totalPrice += sizeObj.price;
        }
      } else {
        const updatedPrices = newItem.prices.map((p) =>
          p.size === newItem.selectedSize
            ? { ...p, quantity: 1 }
            : { ...p, quantity: 0 }
        );
        state.cartList.push({
          ...newItem,
          prices: updatedPrices,
        });
        state.totalItems += 1;
        state.totalPrice += getPriceForSize(
          updatedPrices,
          newItem.selectedSize
        );
      }
    },

    // ! remove from cart
    removeFromCart(
      state,
      action: PayloadAction<{ id: string; size: "S" | "M" | "L" }>
    ) {
      const item = state.cartList.find((itm) => itm._id === action.payload.id);
      if (!item) return;

      const sizeObj = item.prices.find((p) => p.size === action.payload.size);
      if (sizeObj) {
        const quantityToRemove = sizeObj.quantity || 0;
        state.totalItems -= quantityToRemove;
        state.totalPrice -= sizeObj.price * quantityToRemove;
        sizeObj.quantity = 0;

        // If all quantities are 0, remove whole item
        const allZero = item.prices.every((p) => (p.quantity ?? 0) === 0);
        if (allZero) {
          state.cartList = state.cartList.filter((itm) => itm._id !== item._id);
        }
      }
    },

    // ? incrementCartItemQuantity
    incrementQuantity(
      state,
      action: PayloadAction<{ id: string; size: "S" | "M" | "L" }>
    ) {
      const item = state.cartList.find((itm) => itm._id === action.payload.id);
      const sizeObj = item?.prices.find((p) => p.size === action.payload.size);

      if (item && sizeObj) {
        sizeObj.quantity = (sizeObj.quantity || 0) + 1;
        state.totalItems += 1;
        state.totalPrice += sizeObj.price;
      }
    },

    // ? decrementCartItemQuantity
    decrementQuantity(
      state,
      action: PayloadAction<{ id: string; size: "S" | "M" | "L" }>
    ) {
      const item = state.cartList.find((itm) => itm._id === action.payload.id);
      const sizeObj = item?.prices.find((p) => p.size === action.payload.size);

      if (item && sizeObj && sizeObj.quantity > 0) {
        sizeObj.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= sizeObj.price;

        // If all quantities are 0, remove item completely
        const totalQuantities = item.prices.reduce(
          (sum, p) => sum + (p.quantity || 0),
          0
        );
        if (totalQuantities === 0) {
          state.cartList = state.cartList.filter((itm) => itm._id !== item._id);
        }
      }
    },
    // clearCart
    clearCart(state) {
      state.cartList = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

// Helper function to get price by size
function getPriceForSize(prices: ItemPrice[], size: "S" | "M" | "L"): number {
  return prices.find((p) => p.size === size)?.price || 0;
}

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
