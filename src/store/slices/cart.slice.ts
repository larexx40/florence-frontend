import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem } from "@/@types/cart.type"

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId && i.color === action.payload.color && i.size === action.payload.size
      )
      if (existing) {
        existing.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
