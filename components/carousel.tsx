"use client";


import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
    products: Stripe.Product[]
}

export const Carousel = ({ products }: Props) => {


     const [current, setCurrent] = useState<number>(0);
     
     useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, 3000);

        return () => clearInterval(interval);
     }, [products.length]);

     const currentProduct = products[current];

     const price = currentProduct.default_price as Stripe.Price;

     
    return (
      <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
        {currentProduct.images && currentProduct.images[0] && (
          <div style={{ position: "relative", width: "100%", height: "300px" }}>
            <Image
              alt={currentProduct.name}
              src={currentProduct.images[0]}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <CardTitle>{currentProduct.name}</CardTitle>
          {price && price.unit_amount && <p>${(price.unit_amount / 100).toFixed(2)}</p>}
        </CardContent>
      </Card>
    );
    
    // <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
    //     {currentProduct.images && currentProduct.images[0] && (
    //     <div style={{ position: "relative", width: "100%", height: "300px" }}>
    //         <Image alt={currentProduct.name} 
    //         src={currentProduct.images[0]} 
    //         layout="fill" objectFit="cover" />
    //     </div>
    //   )}
    //   <CardContent className="absolute inset-0 flex flex-col  items-center justify-center bg-black bg">
    //     <CardTitle>{currentProduct.name}</CardTitle>
    //     {price && price.unit_amount && ( <p> ${(price.unit_amount / 100).toFixed(2)}</p>)}
    //   </CardContent>
    // </Card>
};