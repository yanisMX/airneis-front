import { MaterialFilters } from "@/app/interfaces/interfaces";
import { useState } from "react";

export default function MaterialsFiltersModal({ id, filters, defaultItemsPerPageLimit, setFilters, fetchMaterials }: { id: string, filters: MaterialFilters, defaultItemsPerPageLimit: number, setFilters: (filters: MaterialFilters) => void, fetchMaterials: () => void }) {
  const [selectedSortOption, setSelectedSortOption] = useState<string | undefined>(filters.sort);
  const [selectedOrder, setSelectedOrder] = useState<"asc" | "desc" | undefined>(filters.order);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(filters.limit || defaultItemsPerPageLimit);

  const sortOptionsNames = {
    id: "Id",
    name: "Nom",
    createdAt: "Date de création"
  };

  const applyFilters = async () => {
    setFilters({
      ...filters,
      page: 1,
      sort: selectedSortOption as any,
      order: selectedOrder,
      limit: selectedItemsPerPage
    });

    fetchMaterials();
    closeDialog();
  }

  const resetFilters = () => {
    setSelectedSortOption(undefined);
    setSelectedOrder(undefined);
    setSelectedItemsPerPage(defaultItemsPerPageLimit);
    setFilters({ limit: defaultItemsPerPageLimit, page: 1, search: undefined, sort: undefined, order: undefined });
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
          <h3 className="font-bold text-xl mb-4">Options</h3>

          <div className="form-control gap-2 mb-4">
            <h3 className="font-bold" tabIndex={0}>Tri</h3>

            <div className="dropdown me-1">
              <div tabIndex={0} role="button" className="btn btn-xs">{(sortOptionsNames as any)[selectedSortOption as any] || "Par défaut"}<i className="fa-solid fa-chevron-down"></i></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu menu-sm lg:menu-xs p-1 mt-2 border shadow bg-base-100 rounded-lg w-48 lg:w-32">
                <li className="menu-item">
                  <button className={`${selectedSortOption === undefined ? "font-bold bg-primary-content text-primary" : ""}`} onClick={() => setSelectedSortOption(undefined)}>Par défaut</button>
                </li>

                {
                  Object.entries(sortOptionsNames).map(([key, name]) => (
                    <li className="menu-item" key={key}>
                      <button className={`${selectedSortOption === key ? "font-bold bg-primary-content text-primary" : ""}`} onClick={() => setSelectedSortOption(key)}>{name}</button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>

          <div className="form-control gap-2 mb-4">
            <h2 className="font-bold">Ordre</h2>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2 py-0">
                <input type="radio" name="radio-sort" className="radio radio-sm radio-primary" defaultChecked={filters.order === "asc" || filters.order === undefined} onChange={() => setSelectedOrder("asc")} />
                <span className="label-text">Croissant</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2 py-0">
                <input type="radio" name="radio-sort" className="radio radio-sm radio-primary" defaultChecked={filters.order === "desc"} onChange={() => setSelectedOrder("desc")} />
                <span className="label-text">Décroissant</span>
              </label>
            </div>
          </div>

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
