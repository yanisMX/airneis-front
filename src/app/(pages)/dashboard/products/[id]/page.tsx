"use client";

import ProductForm from "@/app/components/dashboard/ProductForm";
import { Product } from "@/app/interfaces/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductPage() {
  const [isFetching, setFetching] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | undefined>();

  const router = useRouter();
  const { id } = useParams();

  const fetchProduct = async (id: number) => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/products/" + id);
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setProduct(data.product);
      setFetching(false);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Produit <span className="opacity-50">#{id}</span> inexistant.</span>);
      router.push("/dashboard/products");
    }
  }

  useEffect(() => {
    fetchProduct(+id);
  }, [id]);

  return (
    <>
      {
        isFetching ? (
          <div className="flex w-full h-full justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <ProductForm product={product} />
        )
      }
    </>
  )
}