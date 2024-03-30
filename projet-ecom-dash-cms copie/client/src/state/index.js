// globalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  billboard: null,
  catHome: null,
  token: null,
  productData: [],
  cart: [],
  compare: [],
  productCategory: [],
  currentStore: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setBillboard: (state, action) => {
      state.billboard = action.payload.billboard;
    },
    setNoBillboard: (state) => {
      state.billboard = null;
    },
    setCatBill: (state, action) => {
      state.catHome = action.payload.catHome;
    },
    deleteCatBill: (state) => {
      state.catHome = null;
    },
    setCurStore: (state, action) => {
      state.currentStore = action.payload.currentStore;
    },
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    addToHomeCat: (state, action) => {
      const index = state.productCategory.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        // L'élément existe déjà, mettez à jour la quantité
        state.productCategory[index].quantity = action.payload.quantity;
      } else {
        // L'élément n'existe pas, ajoutez-le au tableau
        state.productCategory.push(action.payload);
      }
    },

    deleteItemToHomeCat: (state, action) => {
      state.productCategory = state.productCategory.filter(
        (item) => item.id !== action.payload
      );
    },
    resetHomeCat: (state) => {
      state.productCategory = [];
    },
    addToCompare: (state, action) => {
      const index = state.compare.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        // L'élément existe déjà, mettez à jour la quantité
        state.compare[index].quantity += action.payload.quantity;
      } else {
        // L'élément n'existe pas, ajoutez-le au tableau
        state.compare.push(action.payload);
      }
    },
    deleteCompare: (state, action) => {
      state.compare = state.compare.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCompare: (state) => {
      state.compare = [];
    },
    addToCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        // L'élément existe déjà, mettez à jour la quantité
        state.cart[index].quantity += action.payload.quantity;
      } else {
        // L'élément n'existe pas, ajoutez-le au tableau
        state.cart.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    resetCart: (state) => {
      state.cart = [];
    },
    increamentQuantity: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      );
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  addToCart,
  addToCompare,
  deleteCompare,
  resetCompare,
  increamentQuantity,
  decrementQuantity,
  setProductData,
  deleteItem,
  resetCart,
  setCurStore,
  setProductCategory,
  addToHomeCat,
  deleteItemToHomeCat,
  resetHomeCat,
  setBillboard,
  setNoBillboard,
  setCatBill,
  deleteCatBill,
} = globalSlice.actions;

export default globalSlice.reducer;
