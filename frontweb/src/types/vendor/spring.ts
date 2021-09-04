export type SpringPage<T> = {
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  empty: boolean;
  numberOfElements?: number;
  content: T[];
};
