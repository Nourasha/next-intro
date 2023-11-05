"use client";

import React, { useState } from "react";
import CustomButtons from "./Buttons";
import Handlebutton from "./HandleButton";
import { Products } from "@/features/types";

type ProductsProps = {
  products: Products;
  fetchProducts: Function;
};

export default function UpdateProduct({
  products,
  fetchProducts,
}: ProductsProps) {
  const { id, productName, description, image, price } = products;

  const [beingEdited, setBeingEdited] = useState<boolean>(false);
  const [newName, setName] = useState<string>(productName);
  const [newDescription, setDescription] = useState<string>(description);
  const [newImage, setImage] = useState<string>(image);
  const [newPrice, setPrice] = useState<number | null>(price);
  const [loading, setLoading] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setPrice(isNaN(value) ? null : value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form data:", {
      id,
      newName,
      newDescription,
      newImage,
      newPrice,
    });

    let requestOptions: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        productName: newName,
        description: newDescription,
        image: newImage,
        price: newPrice,
      }),
    };

    setLoading(true);

    let response = await fetch("/api/products", requestOptions);

    setLoading(false);

    if (!response.ok) {
      console.log(response);
      return;
    }

    //success
    console.log(response);
    setBeingEdited(false);
    fetchProducts();
  };

  return beingEdited ? (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg place-self-center"
      style={{ height: "413px", width: "384px" }}
    >
      <form onSubmit={handleSubmit} className="px-6 py-4">
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newName}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newDescription}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="image"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newImage}
            onChange={handleImageChange}
            required
            readOnly
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            step="any"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newPrice ?? ""}
            onChange={handlePriceChange}
            required
          />
        </div>

        <div className="flex justify-center pt-4 w-">
          {loading ? (
            <Handlebutton />
          ) : (
            <>
              <CustomButtons
                title="Cancel"
                containerStyles="w-28 py-[16px] rounded-lg bg-green-700 mx-2"
                textStyles="text-white text-[14px] leading-[17px] font-bold"
                handleClick={() => {
                  setBeingEdited(false);
                }}
              />

              <CustomButtons
                title="Save"
                btnType="submit"
                containerStyles="w-28 py-[16px] rounded-lg bg-green-700 mx-2"
                textStyles="text-white text-[14px] leading-[17px] font-bold"
              />
            </>
          )}
        </div>
      </form>
    </div>
  ) : (
    <div className="max-w-sm rounded overflow-hidden shadow-lg place-self-center">
      <div className="w-80 h-48">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={productName}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="float-right mx-5 my-3">$ {price}</div>
      <div className="flex mt-12 pb-4">
        <CustomButtons
          title="Edit"
          containerStyles="float-left w-28 py-[16px] rounded-lg bg-orange-600 mx-2"
          textStyles="text-white text-[14px] leading-[17px] font-bold"
          // rightIcon='/right-arrow.svg'
          handleClick={() => setBeingEdited(true)}
        />
      </div>
    </div>
  );
}
