import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: '',
    categories: ['All'],
    brands: ['All'],
    minPrice: 0,
    maxPrice: 10000,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        },
        setCategories(state, action) {
            state.categories = action.payload;
        },
        setBrands(state, action) {
            state.brands = action.payload;
        },
        setMinPrice(state, action) {
            state.minPrice = action.payload;
        },
        setMaxPrice(state, action) {
            state.maxPrice = action.payload;
        },
        clearFilters(state) {
            state.search = '';
            state.categories = ['All'];
            state.brands = ['All'];
            state.minPrice = 0;
            state.maxPrice = 10000;
        },
    },
});

export const { setSearch, setCategories, setBrands, setMinPrice, setMaxPrice, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
