"use client";

import CategoryForm from "@/app/components/dashboard/CategoryForm";
import { useAuth } from "@/app/context/AuthContext";
import { Category } from "@/app/interfaces/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const { user } = useAuth();

  const [isFetching, setFetching] = useState<boolean>(true);
  const [category, setCategory] = useState<Category | undefined>();

  const router = useRouter();
  const { id } = useParams();

  const fetchCategory = async (id: number) => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/categories/" + id, {
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setCategory(data.category);
      setFetching(false);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Catégorie <span className="opacity-50">#{id}</span> inexistante.</span>);
      router.push("/dashboard/categories");
    }
  }

  useEffect(() => {
    fetchCategory(+id);
  }, [id]);

  return (
    <>
      {
        isFetching ? (
          <div className="flex w-full h-full justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <CategoryForm category={category} />
        )
      }
    </>
  )
}