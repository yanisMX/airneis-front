import { useAuth } from "@/app/context/AuthContext";
import { User } from "@/app/interfaces/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UsersBulkDeleteModal({ id, users, fetchUsers }: { id: string, users: User[], fetchUsers: () => void }) {
  const { user: authUser } = useAuth();
  const [isFetching, setFetching] = useState(false);

  const deleteUsers = async () => {
    setFetching(true);

    let deletedUsers = 0;
    for (const user of users) {
      if (await deleteUserById(user))
        deletedUsers++;
    }

    closeDialog();
    setFetching(false);

    if (deletedUsers > 0) {
      toast.success(() => <span>{deletedUsers} utilisateur{deletedUsers > 1 ? "s" : ""} a{deletedUsers > 1 ? "ont" : ""} bien été supprimé{deletedUsers > 1 ? "s" : ""}.</span>);
    } else {
      toast.error(() => <span>Aucun utilisateur n'a été supprimé.</span>);
    }

    fetchUsers();
  }

  const deleteUserById = async (user: User): Promise<boolean> => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/users/" + user.id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + authUser?.accessToken,
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      return true;
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la suppression de l'utilisateur <b>{user.name}</b> <span className="opacity-50">#{user.id}</span>.</span>);
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
        <p className="pb-8">Êtes-vous sur de vouloir supprimer <b>{users.length} utilisateur{users.length > 1 ? "s" : ""}</b> ?</p>
        <p>Cette action est irréversible.</p>
        <div className="modal-action">
          <form method="dialog" className="flex">
            <button className="btn btn-sm btn-error text-white me-2" onClick={() => deleteUsers()} disabled={isFetching}>
              {isFetching ? <><span className="loading loading-spinner"></span> Suppression...</> : "Supprimer"}
            </button>
            <button className="btn btn-sm" disabled={isFetching}>Annuler</button>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}
