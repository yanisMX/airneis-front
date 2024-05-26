import { Material } from "@/app/interfaces/interfaces";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ProductMaterialCreationModal({ id, selectedMaterials, setSelectedMaterials, fetchMaterials }: { id: string, selectedMaterials: Material[], setSelectedMaterials: (materials: Material[]) => void, fetchMaterials: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [isFetching, setFetching] = useState<boolean>(false);

  const createCategory = async () => {
    const name = nameRef.current?.value;

    if (!name || name.length === 0) {
      toast.error(() => <span>Le nom du matériau doit être renseigné.</span>);
      return;
    }

    try {
      setFetching(true);

      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      const material = data.material as Material;

      setSelectedMaterials([...selectedMaterials, material]);
      fetchMaterials();

      toast.success(() => <span>Le matériau <b>{material.name}</b> a été créé.</span>);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la création du matériau.</span>);
    } finally {
      dialogRef.current?.close();
    }
  }

  const onClose = () => {
    setFetching(false);
    nameRef.current!.value = "";
  }

  return <>
    <dialog id={id} ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={() => onClose()}>
      <div className="modal-box font-normal">
        <div>
          <h2 className="font-bold text-2xl mb-4">Créer un matériau</h2>
        </div>

        <div className="form-control gap-2 mb-4">
          <label className="form-control w-full">
            <div className="label label-text font-bold">Nom</div>
            <input ref={nameRef} type="text" placeholder="Nom du matériau" className="input input-sm input-bordered w-full" disabled={isFetching} />
          </label>
        </div>

        <div className="modal-action">
          <div className="flex space-x-2">
            <button className="btn btn-sm" onClick={() => dialogRef.current?.close()} disabled={isFetching}>Annuler</button>
            <button className="btn btn-sm btn-primary" onClick={() => createCategory()} disabled={isFetching}>
              {isFetching ? <><span className="loading loading-spinner"></span> Création...</> : "Créer"}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </>;
}
