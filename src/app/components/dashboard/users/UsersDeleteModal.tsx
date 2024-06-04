import { useAuth } from "@/app/context/AuthContext";
import { User } from "@/app/interfaces/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UsersDeleteModal({ id, user, fetchUsers }: { id: string, user: User, fetchUsers: () => void }) {
  const { user: authUser } = useAuth();
  const [isFetching, setFetching] = useState(false);

  const deleteUser = async () => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/users/" + user.id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + authUser?.accessToken,
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      fetchUsers();
      toast.success(() => <span>L&apos;utilisateur <b>{user.name}</b> <span className="opacity-50">#{user.id}</span> a bien été supprimé.</span>);
    } catch (error) {
      console.error(error);

      toast.error(() => <span>Une erreur est survenue lors de la suppression de l&apos;utilisateur <b>{user.name}</b> <span className="opacity-50">#{user.id}</span>.</span>);
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
        <p className="pb-8">Êtes-vous sur de vouloir supprimer <b>{user.name}</b> ?</p>
        <p>Cette action est irréversible.</p>
        <div className="modal-action">
          <form method="dialog" className="flex">
            <button className="btn btn-sm btn-error text-white me-2" onClick={() => deleteUser()} disabled={isFetching}>
              {isFetching ? <><span className="loading loading-spinner"></span> Suppression...</> : "Supprimer"}
            </button>
            <button className="btn btn-sm" disabled={isFetching}>Annuler</button>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}