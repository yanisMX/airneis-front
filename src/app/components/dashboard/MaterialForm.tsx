import { Material, MaterialCreation } from "@/app/interfaces/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function MaterialForm({ material }: { material?: Material }) {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);

  const [isFetching, setFetching] = useState<boolean>(false);

  const processMaterialSave = () => {
    const name = nameRef.current?.value;

    let errors: string[] = [];

    if (!name || name.length === 0) {
      errors.push("Le nom de la catégorie est requise.");
      nameRef.current?.classList.add("input-error");
    }

    if (errors.length > 0) {
      toast.error(() => <span>
        <p className="font-bold mb-2">Un ou plusieurs champs sont incorrects :</p>
        <ul className="list-disc list-inside">
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      </span>);
      return;
    }

    setFetching(true);

    const rebuiltMaterial: MaterialCreation = {
      name: name as string,
    };

    if (material) {
      updateMaterial(rebuiltMaterial);
    } else {
      createMaterial(rebuiltMaterial);
    }
  }

  const createMaterial = async (material: MaterialCreation) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(material)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success(() => <span>Le matériau <b>{data.material.name}</b> a été créé</span>);
      router.push("/dashboard/materials/" + data.material.id);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la création du matériau.</span>);
      setFetching(false);
    }
  }

  const updateMaterial = async (editedMaterial: MaterialCreation) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/materials/" + material!.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedMaterial)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success(() => <span>Le matériau <b>{data.material.name}</b> a été mis à jour.</span>);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la mise à jour du matériau.</span>);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    const inputs = [nameRef, createButtonRef];

    for (const input of inputs) {
      if (isFetching) {
        input.current?.setAttribute("disabled", "true");
      } else {
        input.current?.removeAttribute("disabled");
      }
    }
  }, [isFetching]);

  return (
    <>
      <div className="mb-8 px-5 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href={"/dashboard/materials"} className="btn btn-neutral btn-circle btn-outline btn-sm">
              <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <h1 className="text-3xl font-semibold">
              {
                material ? (<>
                  <span className="sm:hidden">Édit.</span>
                  <span className="hidden sm:inline-block">Édition du</span>
                </>) : (<>
                  <span className="sm:hidden">Nouv.</span>
                  <span className="hidden sm:inline-block">Nouveau</span>
                </>)
              }
              <span> matériau</span>
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button className="btn btn-primary btn-sm" ref={createButtonRef} onClick={processMaterialSave}>
              {
                isFetching ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    <span>{material ? "Enregistrement" : "Création"}...</span>
                  </>
                ) : (
                  material ? "Enregistrer" : "Créer"
                )
              }
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow lg:rounded-xl border overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="overflow-x-auto p-4 h-full" tabIndex={0}>
            <div className="flex flex-col gap-y-2">

              <label className="form-control w-full">
                <div className="label label-text">
                  Nom
                  <span className="text-error">*</span>
                </div>
                <input
                  ref={nameRef}
                  maxLength={100}
                  onChange={() => nameRef.current?.classList.remove("input-error")}
                  type="text"
                  placeholder="Nom de la catégorie"
                  defaultValue={material?.name}
                  className="input input-sm input-bordered w-full"
                />
              </label>

            </div>
          </div>
        </div>
      </div>
    </>
  )
};
