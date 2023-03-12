export class PaginationDto {
  offset?: number;

  limit: number;

  after?: string;
}

export class PageInfo {
  previousPagination: PaginationDto;

  hasPreviousPage: boolean;

  hasNextPage: boolean;
}
