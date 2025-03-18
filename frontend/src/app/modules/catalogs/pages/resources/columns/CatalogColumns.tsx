
export const CatalogColumns = [
    {
        Header: 'ID',
        accessor: '_id',
        disableFilters: false,
    },
    {
        Header: 'Nombre',
        accessor: 'nombre',
    },
    {
        Header: 'Descripcion',
        accessor: 'descripcion',
        Cell: ({ value }: any) => (value ? value : '-'),
    },
    {
        Header: 'Items',
        accessor: 'item',
        Cell: ({ value }: any) => (value ? value : '-'),
    },
]