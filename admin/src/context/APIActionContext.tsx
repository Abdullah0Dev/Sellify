/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import type { ProductType } from "@/api";
import React, { createContext, useContext, useReducer } from "react";


// Create the context

type APIActionContextType = {
    state: any;
    dispatch: React.Dispatch<any>
}
const APIActionContext = createContext<APIActionContextType | null>(null)
type StateType = {
    products: ProductType[];
};
type ActionType =
    | { type: "SET_PRODUCTS"; payload: ProductType[] }
    | { type: "ADD_PRODUCTS"; payload: ProductType }
    | { type: "DELETE_PRODUCTS"; payload: ProductType }
    | { type: "UPDATE_PRODUCTS"; payload: ProductType };
const APIActionReducer = (state: StateType, action: ActionType): StateType => {
    // each dispatch have the (type: , and the payload) so we're .. type
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                products: action.payload // set the products to all the payloads
            }
        case 'ADD_PRODUCTS':
            return {
                products: [action.payload, ...state.products]
            }
        case 'DELETE_PRODUCTS':
            return {
                products: state.products.filter((p: any) => p._id !== action.payload._id)
            }
        case 'UPDATE_PRODUCTS':
            return {
                products: state.products.map((p: any) => p._id === action.payload._id ? action.payload : p)
            }
        default:
            return state;
    }
}

// Create the context provider component
export const APIActionContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(APIActionReducer, {
        products: [] // initial state
    })
    return (
        <APIActionContext.Provider value={{ state, dispatch }}>
            {children}
        </APIActionContext.Provider>
    );
};

// Create the useAPIAction hook to access the context
export const useAPIActions = () => {
    const context = useContext(APIActionContext)
    if (!context) throw new Error('useAPIActions must be used within a APIActionContextProvider')
    return context;
};