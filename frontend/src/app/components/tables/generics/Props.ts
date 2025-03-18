import { Column } from "react-table";

export interface ConfigTableProps<T extends object> {
    columns: Column<T>[];
    data: T[];
    useDelete: (row: T) => void | any;
    setSelectedRow?: (row: T) => void | null;
    setShowModal?: (show: boolean) => void  | null;
    actions?: any;
  }

  export interface TableProps {
    columns: Column<object>[] | any | unknown;
    data: object[] | any;
    useUpdate: any,
    useDelete: any,
    FormComponent: any
  }