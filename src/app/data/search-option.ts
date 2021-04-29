export interface SearchOption {
  key: string;
  displayName: string;
  operator: string;
  searchValue: any;
  displayValue?: any;
  multiValue: boolean;
}
