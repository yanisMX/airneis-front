import { useAuth } from "@/app/context/AuthContext";
import { Image as Media } from "@/app/interfaces/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MediasBulkDeleteModal({ id, medias, fetchMedias }: { id: string, medias: Media[], fetchMedias: () => void }) {
  const { user } = useAuth();
  const [isFetching, setFetching] = useState(false);

  const deleteMedia = async () => {
    setFetching(true);

    let deletedMedias = 0;
    for (const media of medias) {
      if (await deleteMediaById(media))
        deletedMedias++;
    }

    closeDialog();
    setFetching(false);

    if (deletedMedias > 0) {
      toast.success(() => <span>{deletedMedias} média{deletedMedias > 1 ? "s" : ""} a{deletedMedias > 1 ? "ont" : ""} bien été supprimé{deletedMedias > 1 ? "s" : ""}.</span>);
    } else {
      toast.error(() => <span>Aucun média n'a été supprimé.</span>);
    }

    fetchMedias();
  }

  const deleteMediaById = async (media: Media): Promise<boolean> => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/medias/" + media.id, {
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
      toast.error(() => <span>Une erreur est survenue lors de la suppression du média <b>{media.name}</b> <span className="opacity-50">#{media.id}</span>.</span>);
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
        <p className="pb-8">Êtes-vous sur de vouloir supprimer <b>{medias.length} média{medias.length > 1 ? "s" : ""}</b> ?</p>
        <p>Cette action est irréversible.</p>
        <div className="modal-action">
          <form method="dialog" className="flex">
            <button className="btn btn-sm btn-error text-white me-2" onClick={() => deleteMedia()} disabled={isFetching}>
              {isFetching ? <><span className="loading loading-spinner"></span> Suppression...</> : "Supprimer"}
            </button>
            <button className="btn btn-sm" disabled={isFetching}>Annuler</button>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}