export interface IProps {
    id: string,
    modelName: string, 
    bodyType: string,
    modelType: string,
    imageUrl: string,
    filter: string |null,
    direction: string
  }
export interface IDataProps {
  data: Array<IProps>
}

export interface IFilterProps {
  filters: string[];
  selected:string,
  handleFilter: (filter: string) => void;
}