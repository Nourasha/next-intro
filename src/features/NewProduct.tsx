import React, { useState } from "react";
import CustomButton from "./Buttons";
import HandleButton from "./HandleButton";
import Link from "next/link";

type CreateProductProps = {
  setCreate: Function;
  fetchProducts: Function;
};

const NewProduct = ({ setCreate, fetchProducts }: CreateProductProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("https://picsum.photos/200/300");
  const [price, setPrice] = useState<number | null>(null);
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
    console.log("Form data:", { name, description, image, price });

    let requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, image, price }),
    };

    setLoading(true);

    let response = await fetch("/api/products", requestOptions);

    setLoading(false);

    //success
    console.log(response);
    setCreate(false);
    fetchProducts();

    // Reset form fields
    setName("");
    setDescription("");
    setImage("");
    setPrice(null);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-2xl place-self-center w-80 mt-24">
      <form onSubmit={handleSubmit} className="px-6 py-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={image}
            onChange={handleImageChange}
            required
            readOnly
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            step="any"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={price ?? ""}
            onChange={handlePriceChange}
            required
          />
        </div>

        <div className="flex justify-center">
          {loading ? (
            <HandleButton />
          ) : (
            <>
              <CustomButton
                title="Cancel"
                containerStyles="w-28 py-[16px] rounded-lg bg-orange-600 mx-2"
                textStyles="text-white text-[14px] leading-[17px] font-bold"
                handleClick={() => {
                  setCreate(false);
                }}
              />

              <CustomButton
                title="Create"
                btnType="submit"
                containerStyles="w-28 py-[16px] rounded-lg bg-orange-600 mx-2"
                textStyles="text-white text-[14px] leading-[17px] font-bold"
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
