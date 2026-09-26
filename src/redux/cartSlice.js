import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("cart")
        ) || []
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCartQty: (
      state,
      action
    ) => {
      const {
        productId,
        quantity,
        variantId = null,
      } = action.payload;

      const existing =
        state.items.find(
          (item) =>
            item.productId ===
              productId &&
            (item.variantId || null) ===
              (variantId || null)
        );

      if (quantity === 0) {
        state.items =
          state.items.filter(
            (item) =>
              !(
                item.productId ===
                  productId &&
                (item.variantId || null) ===
                  (variantId || null)
              )
          );
      } else if (existing) {
        existing.quantity =
          quantity;
      } else {
        state.items.push({
          productId,
          variantId,
          quantity,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(
          state.items
        )
      );
    },

    clearCart: (state) => {
      state.items = [];

      localStorage.removeItem(
        "cart"
      );
    },
  },
});

export const {
  setCartQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;