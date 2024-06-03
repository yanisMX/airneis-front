"use client";

import MaterialForm from "@/app/components/dashboard/MaterialForm";
import { useAuth } from "@/app/context/AuthContext";
import { Material } from "@/app/interfaces/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MaterialPage() {
  const { user } = useAuth();

  const [isFetching, setFetching] = useState<boolean>(true);
  const [material, setMaterial] = useState<Material | undefined>();

  const router = useRouter();
  const { id } = useParams();

  const fetchMaterial = async (id: number) => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/materials/" + id, {
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setMaterial(data.material);
      setFetching(false);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Matériau <span className="opacity-50">#{id}</span> inexistant.</span>);
      router.push("/dashboard/materials");
    }
  }

  useEffect(() => {
    fetchMaterial(+id);
  }, [id]);

  return (
    <>
      {
        isFetching ? (
          <div className="flex w-full h-full justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <MaterialForm material={material} />
        )
      }
    </>
  )
}