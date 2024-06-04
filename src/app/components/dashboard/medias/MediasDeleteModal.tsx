import { useAuth } from "@/app/context/AuthContext";
import { Image as Media } from "@/app/interfaces/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MediasDeleteModal({ id, media, fetchMedias }: { id: string, media: Media, fetchMedias: () => void }) {
  const { user } = useAuth();
  const [isFetching, setFetching] = useState(false);

  const deleteProduct = async () => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/medias/" + media.id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + user?.accessToken,
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      fetchMedias();
      toast.success(() => <span>Le média <b>{media.name}</b> <span className="opacity-50">#{media.id}</span> a bien été supprimé.</span>);
    } catch (error) {
      console.error(error);

      toast.error(() => <span>Une erreur est survenue lors de la suppression du média <b>{media.name}</b> <span className="opacity-50">#{media.id}</span>.</span>);
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
        <p className="pb-8">Êtes-vous sur de vouloir supprimer <b>{media.name}</b> ?</p>
        <p>Cette action est irréversible.</p>
        <div className="modal-action">
          <form method="dialog" className="flex">
            <button className="btn btn-sm btn-error text-white me-2" onClick={() => deleteProduct()} disabled={isFetching}>
              {isFetching ? <><span className="loading loading-spinner"></span> Suppression...</> : "Supprimer"}
            </button>
            <button className="btn btn-sm" disabled={isFetching}>Annuler</button>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}
