/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

type FormType = {
    productName: string;
    category: string;
    desc: string;
    brand: string;
    rating: string;
    images: string[]
    prices: { size: string; price: string }[];
};

type UpdatePreviewContextType = {
    form: FormType;
    setForm: React.Dispatch<React.SetStateAction<FormType>>
}
export const UpdatePreviewContext = createContext<UpdatePreviewContextType | null>(null)

// make the provider

export const UpdatePreviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [form, setForm] = useState<FormType>({
        productName: "",
        category: "",
        desc: "",
        brand: "",
        rating: "",
        images: [],
        prices: [
            { size: "S", price: "" },
            { size: "M", price: "" },
            { size: "L", price: "" },
        ],
    });
    return (
        <UpdatePreviewContext.Provider value={{ form, setForm }} >
            {children}
        </UpdatePreviewContext.Provider>
    )
}

export const usePreviewUpdater = () => {
    const context = useContext(UpdatePreviewContext)
    if (!context) throw new Error("usePreviewUpdater must be used within UpdatePreviewProvider");
    return context;
}