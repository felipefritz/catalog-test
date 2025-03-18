import { CustomPaginatorProps } from "./Props";



const CustomPaginator: React.FC<CustomPaginatorProps> = ({
  pageIndex,
  pageOptions,
  previousPage,
  pageCount,
  canPreviousPage,
  nextPage,
  canNextPage,
  pageSize,
  setPageSize,
}: CustomPaginatorProps) => {
  return (
    <div className="d-flex justify-content-between align-items-center m-5">
      <span>
        {pageCount ?         (<>Página <strong>{pageIndex + 1} de {pageCount}</strong></>):
  (        <>Página <strong>{pageIndex + 1} de {pageOptions?.length}</strong></>
  )
}
      </span>
      <div className="d-flex">
        <button
          className="btn btn-icon btn-bg-light btn-active-color-info btn-sm me-1"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Anterior
        </button>
        <button
          className="btn btn-sm btn-light-info ms-2"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Siguiente
        </button>
      </div>
      <div>
        <select
          className="form-select form-select-sm"
          value={pageSize}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Mostrar {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomPaginator;