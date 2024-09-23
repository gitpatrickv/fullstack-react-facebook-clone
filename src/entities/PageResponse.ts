export default interface PageResponse {
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PaginateProps {
  pageNo: number;
  pageSize: number;
}
