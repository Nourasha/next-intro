import { Products } from "@/features/types";
import Image from "next/image";

export default function Product(props: Products) {
  const { id, productName, image, description, price } = props;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg place-self-center">
      <div className="w-full h-48">
        <Image
          className="w-screen h-full object-cover"
          src={image}
          alt={productName}
          height={500}
          width={500}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="float-right mx-5 my-3">$ {price}</div>
    </div>
  );
}
