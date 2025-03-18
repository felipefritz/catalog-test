import React, { FC, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { useTable, useSortBy, usePagination, useGlobalFilter, useExpanded } from "react-table";
import {
  KTCard,
  KTCardBody,
  KTIcon,
} from "../../../../_metronic/helpers";
import CustomModal from "../../modal/CustomModal";
import CustomPaginator from "./paginator/CustomPaginator";
import { TableProps } from "./Props";
import { handleDelete } from "../../../handlers/TableHandlers";

// Importar el CSS de bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css';

const TITLE = "Tipo de entrada de datos";

export const TableCommon: FC<TableProps> = ({
  columns,
  data,
  useUpdate,
  useDelete,
  FormComponent,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [updateObject, { isLoading, isError }] = useUpdate();
  const [deleteObject] = useDelete();

  const handleEdit = async (values: any) => {
    if (!selectedRow || !selectedRow.id) {
      console.error("No se ha seleccionado un item válido.");
      return;
    }
    try {
      if (values instanceof FormData) {
        await updateObject({ id: selectedRow.id, formData: values }).unwrap();
      } else {
        await updateObject({ id: selectedRow.id, ...values }).unwrap();
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  };

  // Función de filtrado global genérica
  const globalFilterFunction = (rows, columnsIds, filterValue) => {
    const search = filterValue.toLowerCase();

    return rows.filter((row: any) => {
      const rowString = JSON.stringify(row.original).toLowerCase();
      return rowString.includes(search);
    });
  };

  const memoizedColumns = useMemo(() => {
    return [
      {
        id: 'expander',
        Header: '',
        Cell: ({ row }) => (
          row.canExpand ? (
            <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? (
                <KTIcon iconName="minus" className="fs-3" />
              ) : (
                <KTIcon iconName="plus" className="fs-3" />
              )}
            </span>
          ) : null
        ),
        width: 50,
      },
      ...columns,
      {
        Header: "Acciones",
        Cell: ({ row }) => (
          <div className="d-flex">
            <button
              className="btn btn-icon btn-light-warning btn-sm me-1"
              onClick={() => {
                setSelectedRow(row.original);
                setShowModal(true);
              }}
            >
              <KTIcon iconName="pencil" className="fs-3" />
            </button>
            <button
              className="btn btn-icon btn-light-danger btn-sm"
              onClick={() => handleDelete(TITLE, row.original, deleteObject)}
            >
              <KTIcon iconName="trash" className="fs-3" />
            </button>
          </div>
        ),
      },
    ];
  }, [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns: memoizedColumns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      globalFilter: globalFilterFunction,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <KTCard>
      <KTCardBody>
        {/* Filtro Global */}
        <div className="d-flex justify-content-end mb-5">
          <div className="w-25">
            <Form.Control
              type="text"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Buscar..."
            />
          </div>
        </div>

        {/* Tabla */}
        <div className="table-responsive">
          <table
            {...getTableProps()}
            className="table table-hover table-row-dashed table-striped table-rounded border table-row-gray-300 gs-7 gy-7 gx-7"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200"
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                      style={{ width: column.width, cursor: "pointer" }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <KTIcon iconName="arrow-down" className="fs-3 ms-1" />
                            : <KTIcon iconName="arrow-up" className="fs-3 ms-1" />
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <React.Fragment key={row.getRowProps().key}>
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          key={cell.column.id}
                          style={{ width: cell.column.width }}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                    {row.isExpanded ? (
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          {/* Contenido expandido */}
                          <div>
                            {/* Mostrar detalles adicionales */}
                            <strong>Detalles:</strong>
                            <pre>{JSON.stringify(row.original, null, 2)}</pre>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <CustomPaginator
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          previousPage={previousPage}
          canPreviousPage={canPreviousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />

        {/* Modal para editar */}
        <CustomModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          title={`Editar ${TITLE}`}
        >
          {selectedRow && (
            <FormComponent
              initialValues={selectedRow}
              onSubmit={handleEdit}
              loading={isLoading}
              id={selectedRow?.id}
              error={isError ? "Error al actualizar" : ""}
            />
          )}
        </CustomModal>
      </KTCardBody>
    </KTCard>
  );
};
