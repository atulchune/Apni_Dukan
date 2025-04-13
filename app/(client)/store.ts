import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./types/ProductType";

export interface CartItems {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItems[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  deleteCartProduct: (productId: number) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubtotalPrice: () => number;
  getItemCount: (productId: number) => number;
  getGroupedItems: () => CartItems[];
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.ProductId === product.ProductId
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.ProductId === product.ProductId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product.ProductId === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItems[]),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?.ProductId !== productId
          ),
        })),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.ProductPrice ?? 0) * item.quantity,
          0
        );
      },
      getSubtotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.ProductPrice ?? 0;
          const discount = ((item.product.DiscountPrice ?? 0) * price) / 100;
          const discountedPrice = price + discount;
          return total + discountedPrice * item.quantity;
        }, 0);
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product.ProductId === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
    }),
    { name: "cart-store" }
  )
);

export default useCartStore;