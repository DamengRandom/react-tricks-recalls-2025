import { Car } from "../components/QuickTable/types";

export interface TableState {
  cars: Car[];
  sorting: { column: string; order: string };
  loading: boolean;
  error: string | null;
  search: { column: string; value: string };
  debouncedSearchValue: string;
}

export type TableAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CARS'; payload: Car[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SORTING'; payload: { column: string; order: string } }
  | { type: 'SET_SEARCH'; payload: { column: string; value: string } }
  | { type: 'SET_DEBOUNCED_SEARCH'; payload: string };

export const initialState: TableState = {
  cars: [],
  sorting: { column: 'MAKE', order: 'asc' },
  loading: false,
  error: null,
  search: { column: 'MAKE', value: '' },
  debouncedSearchValue: '',
};

export default function tableReducer(state: TableState, action: TableAction): TableState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CARS':
      return { ...state, cars: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SORTING':
      return { ...state, sorting: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_DEBOUNCED_SEARCH':
      return { ...state, debouncedSearchValue: action.payload };
    default:
      return state;
  }
}
