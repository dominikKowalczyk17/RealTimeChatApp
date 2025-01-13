export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  sort: Sort;
  number: number;
  size: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const createPaginationOption = (req: Pagination): URLSearchParams => {
  const params = new URLSearchParams();
  params.append("page", req.page.toString());
  params.append("size", req.size.toString());

  req.sort.forEach((value) => {
    params.append("sort", value);
  });

  return params;
};
