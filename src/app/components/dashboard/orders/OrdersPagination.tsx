import { OrderPagination, OrderQuery } from "@/app/interfaces/interfaces";

export default function OrdersPagination({ pagination, filters, setFilters }: { pagination: OrderPagination, filters: OrderQuery, setFilters: (filters: OrderQuery) => void }) {
  const changePage = (page: number) => setFilters({ ...filters, page });

  const renderPageButtons = () => {
    if (pagination.totalPages <= 3) {
      return Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
        <button key={page} className={`join-item btn btn-xs ${pagination.page === page ? "btn-primary" : ""}`} onClick={() => changePage(page)}>{page}</button>
      ));
    } else if (pagination.page === 1) {
      return (
        <>
          <button className={`join-item btn btn-xs ${pagination.page === 1 ? "btn-primary" : ""}`} onClick={() => changePage(1)}>1</button>
          <button className="join-item btn btn-xs" onClick={() => changePage(2)}>2</button>
          <button className="join-item btn btn-xs" onClick={() => changePage(3)}>3</button>
        </>
      );
    } else if (pagination.page === pagination.totalPages) {
      return (
        <>
          <button className="join-item btn btn-xs" onClick={() => changePage(pagination.totalPages - 2)}>{pagination.totalPages - 2}</button>
          <button className="join-item btn btn-xs" onClick={() => changePage(pagination.totalPages - 1)}>{pagination.totalPages - 1}</button>
          <button className={`join-item btn btn-xs ${pagination.page === pagination.totalPages ? "btn-primary" : ""}`} onClick={() => changePage(pagination.totalPages)}>{pagination.totalPages}</button>
        </>
      );
    } else {
      return (
        <>
          <button className="join-item btn btn-xs" onClick={() => changePage(pagination.page - 1)}>{pagination.page - 1}</button>
          <button className={`join-item btn btn-xs ${pagination.page === pagination.page ? "btn-primary" : ""}`} onClick={() => changePage(pagination.page)}>{pagination.page}</button>
          <button className="join-item btn btn-xs" onClick={() => changePage(pagination.page + 1)}>{pagination.page + 1}</button>
        </>
      );
    }
  };

  const renderLimitOptions = () => (
    [5, 10, 15, 20].map(limit => (
      <li key={limit} onClick={() => setFilters({ ...filters, page: undefined, limit })} className="menu-item">
        <button className={`btn btn-xs ${pagination.limit === limit ? "btn-primary" : "btn-ghost"}`}>{limit} commandes</button>
      </li>
    ))
  );

  return (
    <div className="flex items-center justify-end sm:space-x-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-1">
        <div className="text-sm ms-2">{pagination.orderCount} commandes, {pagination.totalPages} pages</div>
        <div className="hidden md:block">
          <div className="dropdown dropdown-top me-1">
            <div tabIndex={0} role="button" className="btn btn-xs m-1">
              <i className="fa-solid fa-chevron-up"></i>{pagination.limit} commandes
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu menu-xs p-1 mb-2 border shadow bg-base-100 rounded-lg w-52">
              {renderLimitOptions()}
            </ul>
          </div>
          <span className="text-sm">par page</span>
        </div>
      </div>
      <div>
        <div className="join border">
          <button className="join-item btn btn-xs" onClick={() => changePage(1)} disabled={pagination.page === 1}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button className="join-item btn btn-xs" onClick={() => changePage(pagination.page - 1)} disabled={pagination.page === 1}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          {renderPageButtons()}
          <button className="join-item btn btn-xs" onClick={() => changePage(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button className="join-item btn btn-xs" onClick={() => changePage(pagination.totalPages)} disabled={pagination.page >= pagination.totalPages}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}