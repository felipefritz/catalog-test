export interface CustomPaginatorProps {
    pageIndex: number;
    pageOptions: number[];
    previousPage: () => void;
    canPreviousPage: boolean;
    nextPage: () => void;
    canNextPage: boolean;
    pageSize: number;
    setPageSize: (size: number) => void;
  }