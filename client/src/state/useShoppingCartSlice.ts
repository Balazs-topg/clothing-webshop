import getCookie from "@/utils/getCookie";

import { create } from "zustand";

interface UseShoppingCart {
  // addItem: Function;
  // removeItem: Function;
  items: any[];
  isOpen: Boolean;
  updateCount: Function;
  increment: Function;
  decrement: Function;
  open: Function;
  close: Function;
  resetCart: Function;
  fetchAndSetCart: Function;
}

const debounce = (func: Function, wait: number) => {
  let timeout: any;
  return (...args: any) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const sendUpdatedItem = async (item: any, newCount: number) => {
  const userInfoCookie = getCookie("userInfo");
  const guestUserIdCookie = getCookie("guestUserId");

  fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/${
      userInfoCookie ? "user" : "guest-user"
    }/${
      userInfoCookie ? JSON.parse(userInfoCookie).id : guestUserIdCookie
    }/cart/update-count`,
    {
      method: "post",
      headers: {
        userAuth: getCookie("userAuth")!,
        guestUserAuth: getCookie("guestUserAuth")!,
      },
      body: JSON.stringify({
        articleId: item.id,
        newCount: +newCount,
      }),
    },
  );
};
const debouncedSendUpdatedItem = debounce(sendUpdatedItem, 750); // Adjust 500 to your preferred debounce time in ms

export const useShoppingCartSlice = create<UseShoppingCart>()((set) => ({
  items: [],
  isOpen: false,

  fetchAndSetCart: async () => {
    const userInfoCookie = getCookie("userInfo");
    const guestUserIdCookie = getCookie("guestUserId");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/${
        userInfoCookie ? "user" : "guest-user"
      }/${
        userInfoCookie ? JSON.parse(userInfoCookie).id : guestUserIdCookie
      }/cart`,
      {
        method: "get",
        headers: {
          userAuth: getCookie("userAuth")!,
          guestUserAuth: getCookie("guestUserAuth")!,
        },
      },
    );
    const data = await response.json();

    const stateFormat = data.content.cartItems.map((cartItem: any) => {
      const frozenArticle = { ...cartItem.articles };
      frozenArticle.count = cartItem.quantity;
      return frozenArticle;
    });

    set((state: any) => {
      return { items: stateFormat };
    });
  },

  resetCart: () => set((state: any) => ({ items: [] })),

  updateCount: (item: any, newCount: number) =>
    set((state: any) => {
      debouncedSendUpdatedItem(item, newCount);
      const updatedItems = state.items.map((stateItem: any) => {
        if (item.id === stateItem.id) stateItem.count = newCount;
        return stateItem;
      });
      const removeIfCountIsNull = updatedItems.filter(
        (stateItem: any) => stateItem.count > 0,
      );
      //yessir
      if (
        state.items.filter((stateItem: any) => stateItem.id === item.id)
          .length === 0
      ) {
        item.count = 1;
        return { items: [...state.items, item] };
      }
      return { items: removeIfCountIsNull };
    }),

  increment: (item: any) =>
    set((state: any) => {
      debouncedSendUpdatedItem(item, item.count ? item.count + 1 : 1);
      const updatedCount = state.items.map((stateItem: any) => {
        if (stateItem.id === item.id) stateItem.count++;
        return stateItem;
      });
      if (
        state.items.filter((stateItem: any) => stateItem.id === item.id)
          .length === 0
      ) {
        item.count = 1;
        return { items: [...state.items, item] };
      }
      return { items: updatedCount };
    }),
  decrement: (item: any) =>
    set((state: any) => {
      debouncedSendUpdatedItem(item, +item.count - 1);
      const updatedCount = state.items.map((stateItem: any) => {
        if (stateItem.id === item.id) stateItem.count--;
        return stateItem;
      });
      const removeIfCountIsNull = updatedCount.filter(
        (stateItem: any) => stateItem.count > 0,
      );
      return { items: removeIfCountIsNull };
    }),

  open: () =>
    set((state: any) => {
      return { isOpen: true };
    }),
  close: () =>
    set((state: any) => {
      return { isOpen: false };
    }),
}));
