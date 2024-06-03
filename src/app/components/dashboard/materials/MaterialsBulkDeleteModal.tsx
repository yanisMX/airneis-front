import { useAuth } from "@/app/context/AuthContext";
import { Material } from "@/app/interfaces/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MaterialsBulkDeleteModal({ id, materials, fetchMaterials }: { id: string, materials: Material[], fetchMaterials: () => void }) {
  const { user } = useAuth();
  const [isFetching, setFetching] = useState(false);

  const deleteMaterials = async () => {
    setFetching(true);

    let deletedMaterials = 0;
    for (const material of materials) {
      if (await deleteMaterialById(material))
        deletedMaterials++;
    }

    closeDialog();
    setFetching(false);

    if (deletedMaterials > 0) {
      toast.success(() => <span>{deletedMaterials} matériau{deletedMaterials > 1 ? "x" : ""} a{deletedMaterials > 1 ? "ont" : ""} bien été supprimé{deletedMaterials > 1 ? "s" : ""}.</span>);
    } else {
      toast.error(() => <span>Aucun matériau n&apos;a été supprimé.</span>);
    }

    fetchMaterials();
  }

  const deleteMaterialById = async (material: Material): Promise<boolean> => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/materials/" + material.id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + user?.accessToken,
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      return true;
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la suppression du matériau <b>{material.name}</b> <span className="opacity-50">#{material.id}</span>.</span>);
    }

    return false;
  }

  const closeDialog = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog.close();
  }

  return <>
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box font-normal">
        <h3 className="font-bold text-xl pb-4">Confirmer la suppression</h3>
        <p className="pb-8">Êtes-vous sur de vouloir supprimer <b>{materials.length} matériau{materials.length > 1 ? "x" : ""}</b> ?</p>
        <p>Cette action est irréversible.</p>
        <div className="modal-action">
          <form method="dialog" className="flex">
            <button className="btn btn-sm btn-error text-white me-2" onClick={() => deleteMaterials()} disabled={isFetching}>
              {isFetching ? <><span className="loading loading-spinner"></span> Suppression...</> : "Supprimer"}
            </button>
            <button className="btn btn-sm" disabled={isFetching}>Annuler</button>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}