/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import FileUploader from "./common/FileUploader";
import SelectMenu from "./common/SelectMenu";
import { usePreviewUpdater } from "../context/UpdateContext";
import { useLocation, useNavigate } from "react-router";
import { createProduct, updateProduct, type ProductType } from "../api";
import { useAPIActions } from "../context/APIActionContext";
import { ToastContainer, toast } from 'react-toastify';

export default function ProductForm() {
  const { form, setForm } = usePreviewUpdater()
  const { dispatch } = useAPIActions();
  const { pathname } = useLocation()
  const editPageType = pathname.match("edit")
  const navigate = useNavigate()
  useEffect(() => {
    return () => {
      const isEditPage = pathname.includes("/edit")
      if (!isEditPage) {
        setForm({
          productName: "",

          category: "",
          desc: "",
          brand: "",
          rating: "",
          images: [],
          prices: [
            { size: "S", price: "" },
            { size: "M", price: "" },
            { size: "L", price: "" }
          ],
        });
      }
    };
  }, [pathname]); // this detects route change ✅

  const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = pathname.split("/edit/")[1]
    if (editPageType) {
      console.log("Form submitted", form);
      try {
        console.log("res", id);
        const payloadProduct: Partial<ProductType> = {

          name: form.productName, // ✅ rename field
          category: form.category,
          description: form.desc,
          brand: form.brand,
          average_rating: Number(form.rating), // convert string → number
          images: form.images,
          prices: form.prices.map((p) => ({
            size: p.size as "S" | "M" | "L", // fix type
            price: Number(p.price),          // fix type
          })),
        };
        const res = await updateProduct(id, payloadProduct);
        dispatch({ type: 'UPDATE_PRODUCTS', payload: res })
        navigate("/"); // or wherever your list page is
        toast("Product info updated.", { type: 'success' });
      } catch (err) {
        console.error("Failed to update product:", err);
        toast("Couldn't update product.", { type: 'error' });
      }
    } else {
      try {
        const payloadProduct: ProductType = {
          name: form.productName,
          category: form.category,
          description: form.desc,
          brand: form.brand,
          average_rating: Number(form.rating), // convert string → number
          images: form.images,
          prices: form.prices.map((p) => ({
            size: p.size as "S" | "M" | "L", // fix type
            price: Number(p.price), // fix type
          })),
          ratings_count: "",
          quantity: 0
        };
        const res = await createProduct(payloadProduct);
        dispatch({ type: 'ADD_PRODUCTS', payload: res })
        navigate("/"); // or wherever your list page is
        toast("Product Created Successfully.", { type: 'success' });
      } catch (err) {
        console.error("Failed to create product:", err);
        toast("Couldn't created product.", { type: 'error' });
      }
    }
  };
  const sampleCategories = [
    { value: "T-Shirts" },
    { value: "Shirts" },
    { value: "Hoodies" },
    { value: "Sweatshirts" },
    { value: "Jackets" },
    { value: "Pants" },
    { value: "Jeans" },
    { value: "Shorts" },
    { value: "Suits" },
    { value: "Traditional Wear" },
    { value: "Shoes" },
    { value: "Accessories" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow only numbers and a single decimal point
    if (!/^\d*\.?\d*$/.test(val)) return;

    // Limit to 5.0 max
    const num = parseFloat(val);
    if (val === "" || (!isNaN(num) && num <= 5)) {
      setForm(prev => ({ ...prev, rating: val }))
    }
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      {/* <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Create Your New Product!
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        make sure every things is alright and grammarly correct and more hooking for the user to buy and increase the sales
        yet
      </p> */}
      <FileUploader />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked
        theme="light"
      />
      <form className="my-8" onSubmit={handleSubmitProduct}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="name">Product Name</Label>
            <Input onChange={(e) => setForm(prev => ({ ...prev, productName: e.target.value }))} value={form.productName} id="name" placeholder="T-Shirt" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="brand">Brand</Label>
            <Input onChange={(e) => setForm(prev => ({ ...prev, brand: e.target.value }))} value={form.brand} id="brand" placeholder="Adidas" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Input onChange={(e) => setForm(prev => ({ ...prev, desc: e.target.value }))} value={form.desc} className="" id="description" placeholder="An amazing T-Shirt Made by...." type="description" />
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <div className="flex flex-col justify-around">
            <Label htmlFor="name">Prices</Label>
            <div className="flex flex-row space-x-2">
              <LabelInputContainer>
                <Input
                  onChange={(e) => setForm(prev => ({ ...prev, prices: prev.prices.map((item, index) => index === 0 ? { ...item, price: e.target.value } : item) }))}
                  value={form.prices[0].price} id="price-s" className="hide-spinner" placeholder="S: " type="number" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Input
                  onChange={(e) => setForm(prev => ({ ...prev, prices: prev.prices.map((item, index) => index === 1 ? { ...item, price: e.target.value } : item) }))}
                  value={form.prices[1].price} id="price-m" className="hide-spinner" placeholder="M: " type="number" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Input
                  onChange={(e) => setForm(prev => ({ ...prev, prices: prev.prices.map((item, index) => index === 2 ? { ...item, price: e.target.value } : item) }))}
                  value={form.prices[2].price} id="price-l" className="hide-spinner" placeholder="L: " type="number" />
              </LabelInputContainer>
            </div>
          </div>
          <LabelInputContainer>
            <Label htmlFor="rating">Rating</Label>
            <Input
              onChange={handleChange}
              value={form.rating}
              id="rating" placeholder="4.5" min={0} max={5} step={0.1} type="number" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="category">Category</Label>
            <SelectMenu
              onChange={(val) => setForm(prev => ({ ...prev, category: val }))}
              placeholder="Select Category"
              items={sampleCategories}
              selectLabel="Categories"
            />
          </LabelInputContainer>
        </div>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          {editPageType ? "Save Changes" : "Create Product"} &rarr;
          <BottomGradient />
        </button>


      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
