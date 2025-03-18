import { FC } from "react";

interface TableFiltersProps {
  filters: {
    name: string;
    value: string;
    onChange: (value: string) => void;
  }[];
}

const TableFilters: FC<TableFiltersProps> = ({ filters }) => {
  return (
    <div className="filters-container" style={{ marginBottom: '1rem' }}>
      {filters.map((filter) => (
        <div key={filter.name} className="filter-item">
          <label>{filter.name}:</label>
          <input
            type="text"
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            placeholder={`Buscar ${filter.name}...`}
          />
        </div>
      ))}
    </div>
  );
};

export default TableFilters;
