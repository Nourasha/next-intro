import { Products } from "@/features/types"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const data = [
    {
        id: "1",
        productName: "product 1",
        image: "https://picsum.photos/id/0/200/300",
        description:"",
        price: 100
    },
    {
        id: "2",
        productName: "product 2",
        image: "https://picsum.photos/id/30/200/300",
        description:"",
        price: 200
    },
    {
        id: "3",
        productName: "product 3",
        image: "https://picsum.photos/id/225/200/300",
        description:"",
        price: 300
    },
]

export async function GET() {
    try {
        return NextResponse.json(data, {status:200})
    } catch(error) {
        return new NextResponse(JSON.stringify({messege:"No Products Found!"}), {status:404})
    }
}

export async function POST(req: NextRequest) {
    const {productName, image, description, price} = await req.json()
    const id = crypto.randomBytes(16).toString("hex")
    data.push({id, productName, image, description, price})
    const updtaedData = JSON.stringify(data)

    return new NextResponse(
        updtaedData,
        {status: 201, headers:{"content-type":"application/json"}}
    )
  }

  export async function PATCH(req: NextRequest){
    const {id, productName, image, description, price} = await req.json()
    const productsId = data.findIndex((product: Products) => product.id === id)
    if(productsId === -1){
        return new NextResponse(
            JSON.stringify({messege: "No Product found!"}), {status: 404, headers:{"content-type":"application/json"}}
        )
    }
    let pickedProduct = data[productsId]
    pickedProduct.productName = productName ? productName : pickedProduct.productName
    pickedProduct.image = image ? image : pickedProduct.image
    pickedProduct.description = description ? description : pickedProduct.description
    pickedProduct.price = price ? price : pickedProduct.price
    data[productsId] = pickedProduct

    const updtaedData = JSON.stringify(data)

    return new NextResponse(
        updtaedData, 
        {status: 200, headers:{"content-type":"application/json"}}
    )
  }