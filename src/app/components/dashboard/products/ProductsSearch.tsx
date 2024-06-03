import { ProductQuery } from "@/app/interfaces/interfaces";
import { useEffect, useRef } from "react";

export default function ProductsSearch({ filters, setFilters, areFiltersActive }: { filters: ProductQuery, setFilters: (filters: ProductQuery) => void, areFiltersActive: boolean }) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  let searchTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const searchInput = searchInputRef.current;
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        // also, add a typing delay to avoid sending too many requests

        if (searchTimeout) clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
          if (searchInput.value.length < 3 && searchInput.value.length !== 0) return;
          setFilters({ ...filters, page: undefined, search: searchInput.value.length === 0 ? undefined : searchInput.value });
        }, 500);
      });
    }
  }, [searchInputRef]);

  return <form className="flex items-center space-x-2" onSubmit={(e) => { e.preventDefault() }}>
    <label className="input input-bordered input-sm flex items-center gap-2 flex-1 md:flex-none">
      <i className="fa-solid fa-search"></i>
      <input type="text" className="grow" placeholder="Rechercher" ref={searchInputRef} />
    </label>

    <button className={"btn btn-sm p-2 " + (areFiltersActive ? "btn-primary" : "btn-outline opacity-40")} title="Filtrer" onClick={() => {
      const element = document.getElementById("products-filters");
      (element as HTMLDialogElement).showModal();
    }}>
      <i className="fa-solid fa-filter"></i>
    </button>
  </form>;
}
