import { ProductQuery, UserQuery } from "@/app/interfaces/interfaces";
import { useState } from "react";

export default function UsersFiltersModal({ id, filters, defaultItemsPerPageLimit, setFilters, fetchUsers }: { id: string, filters: ProductQuery, defaultItemsPerPageLimit: number, setFilters: (filters: UserQuery) => void, fetchUsers: () => void }) {
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(filters.limit || 20);

  const applyFilters = async () => {
    setFilters({
      ...filters,
      page: undefined,
      limit: selectedItemsPerPage
    });

    fetchUsers();
    closeDialog();
  }

  const resetFilters = () => {
    setSelectedItemsPerPage(defaultItemsPerPageLimit);
    setFilters({ limit: defaultItemsPerPageLimit });
  }
  const closeDialog = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog.close();
  }

  return <>
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box font-normal flex flex-col px-0">
        <div className="px-6">
          <h2 className="font-bold text-2xl mb-4">Paramètres de la recherche</h2>
        </div>

        <div className="overflow-auto px-6">
          <div className="form-control gap-2 mb-4">
            <h2 className="font-bold">Éléments par page</h2>

            <input type="range" min="5" max="20" value={selectedItemsPerPage} className="range" step="5" onChange={(e) => setSelectedItemsPerPage(parseInt((e.target as HTMLInputElement).value))} />
            <div className="w-full flex justify-between text-xs px-2">
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
            </div>
          </div>
        </div>

        <div className="modal-action px-6">
          <form method="dialog" className="flex space-x-2">
            <button className="btn btn-sm btn-primary" onClick={() => applyFilters()}>Appliquer</button>
            <button className="btn btn-sm btn-error text-white" onClick={() => resetFilters()}>Réinitialiser</button>
            <button className="btn btn-sm" onClick={() => closeDialog()}>Annuler</button>
          </form>
        </div>
      </div>
    </dialog>
  </>
}
