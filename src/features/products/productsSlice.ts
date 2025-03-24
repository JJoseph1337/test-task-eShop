import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products"
    );
    return await response.json();
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action) => {
        state.loading = false;
        state.products = action.payload;
      }
    );
    builder.addCase(
      fetchProducts.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Ошибка загрузки";
      }
    );
  },
});

export default productsSlice.reducer;
