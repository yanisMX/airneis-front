import { CategoryFilters } from "@/app/interfaces/interfaces";
import { useEffect, useRef } from "react";

export default function CategoriesSearch({ filters, setFilters, areFiltersActive }: { filters: CategoryFilters, setFilters: (filters: CategoryFilters) => void, areFiltersActive: boolean }) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchInput = searchInputRef.current;
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        if (searchInput.value.length < 3 && searchInput.value.length !== 0) return;
        setFilters({ ...filters, page: 1, search: searchInput.value.length === 0 ? undefined : searchInput.value });
      });
    }
  }, [searchInputRef]);

  return <form className="flex items-center space-x-2" onSubmit={(e) => { e.preventDefault() }}>
    <label className="input input-bordered input-sm flex items-center gap-2 flex-1 md:flex-none">
      <i className="fa-solid fa-search"></i>
      <input type="text" className="grow" placeholder="Rechercher" ref={searchInputRef} />
    </label>

    <button className={"btn btn-sm p-2 " + (areFiltersActive ? "btn-primary" : "btn-outline opacity-40")} title="Filtrer" onClick={() => {
      const element = document.getElementById("categories-filters");
      (element as HTMLDialogElement).showModal();
    }}>
      <i className="fa-solid fa-filter"></i>
    </button>
  </form>;
}
