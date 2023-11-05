"use client";

import { Products } from "@/features/types";
import { useEffect, useState } from "react";
import Buttons from "@/features/Buttons";
import NewProduct from "@/features/NewProduct";
import UpdateProduct from "@/features/UpdateProduct";

const Admin = () => {
  const [product, setProduct] = useState<Products[]>([]);

  const [create, setCreate] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      // const response = await fetch('/mocks/dishes.json');
      const response = await fetch("/api/products");
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {!create && (
        <div className="w-full pt-24 flex justify-center">
          <Buttons
            title="Lag produkt"
            containerStyles="w-36 py-[16px] rounded bg-orange-600 mx-2"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            // rightIcon='/right-arrow.svg'
            handleClick={() => setCreate(!create)}
          />
        </div>
      )}

      {create && (
        <div className="w-full flex justify-center">
          <NewProduct setCreate={setCreate} fetchProducts={fetchProducts} />
        </div>
      )}

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-y-4 gap-x-4 pt-4">
        {product.map(({ id, productName, description, image, price }) => {
          return (
            <UpdateProduct
              key={id}
              products={{ id, productName, description, image, price }}
              fetchProducts={fetchProducts}
            />
          );
        })}
      </div>
    </>
  );
};

export default Admin;
