import { createReducer, on } from "@ngrx/store"
import { load } from "./products.actions"

const products: any[] = [];

export const initialState = {
    products
}

export const productsReducer = createReducer(
    initialState,
    on(load, (state, { products }) => ({ products: [...products] }))
);