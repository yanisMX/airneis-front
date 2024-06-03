import { Category } from "@/app/interfaces/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesDeleteModal({ id, category, fetchCategories }: { id: string, category: Category, fetchCategories: () => void }) {
  const [isFetching, setFetching] = useState(false);

  const deleteCategory = async () => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/categories/" + category.id, { method: "DELETE" });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      fetchCategories();
      toast.success(() => <span>La catégorie <b>{category.name}</b> <span className="opacity-50">#{category.id}</span> a bien été supprimé.</span>);
    } catch (error) {
      console.error(error);

      toast.error(() => <span>Une erreur est survenue lors de la suppression de la catégorie <b>{category.name}</b> <span className="opacity-50">#{category.id}</span>.</span>);
    } finally {
      closeDialog();
      setFetching(false);
    }
  }

  const closeDialog = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog.close();
  }

  return <>
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box font-normal">
        <h3 className="font-bold text-xl pb-4">Confirmer la suppression</h3>
        <p className="pb-8">Êtes-vous sur de vouloir supprimer <b>{category.name}</b> ?</p>
        <p>Cette action est irréversible.</p>
        <div className="modal-action">
          <form method="dialog" className="flex">
            <button className="btn btn-sm btn-error text-white me-2" onClick={() => deleteCategory()} disabled={isFetching}>
              {isFetching ? <><span className="loading loading-spinner"></span> Suppression...</> : "Supprimer"}
            </button>
            <button className="btn btn-sm" disabled={isFetching}>Annuler</button>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}