import React,{FC} from "react";
import { IFilterProps } from "../interfaces";
import "./FilterBar.css";

const FilterBar:FC<IFilterProps> = ({ filters, handleFilter, selected }):JSX.Element => {
  return (
    <div className="filters__container">
      {filters.map((filter) => (
        <button onClick={() => handleFilter(filter)} key={filter} className={filter === selected ? 'filter__cta filter__cta--selected': 'filter__cta'}>
          {filter}
        </button>
      ))}
        <button onClick={() => handleFilter('')} className={`${ selected ? "filters-reset" : "filters-reset disabled" }`}>
          Reset
        </button>
    </div>
  );
};
export default FilterBar;
