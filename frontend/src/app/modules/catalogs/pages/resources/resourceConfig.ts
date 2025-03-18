import { 
  useCreateCatalogMutation, 
  useGetCatalogByIdQuery, 
  useDeleteCatalogMutation, 
  useGetCatalogListQuery,
  useUpdateCatalogMutation,
  } from "../../../../services/catalogService";
import CatalogForm from "../../forms/CatalogForm";

import { 

  CatalogColumns
} from "./columns";

 const resourceConfig = {
    catalog: {
      TITLE: 'Catalogo',
      PLURAL_TITLE: 'Catalogos',
      PATH: '/catalogs',
      FormComponent: CatalogForm,
      useCreate: useCreateCatalogMutation,
      useUpdate: useUpdateCatalogMutation,
      useList: useGetCatalogListQuery,
      useDelete: useDeleteCatalogMutation,
      columns: CatalogColumns,
    },
  };


  export default resourceConfig
  