import { SortDirection } from "@tanstack/react-table";

export type GetManyResourceQueryResult<T> = {
    list: T[];
    meta: {
        totalRecords: number
    };
};

export type GenericFilter = Record<string, unknown>;

/**
 * Human-readable object that will be converted to PaginationParams to send
 */
export type PaginationQuery = {
    page: number;
    perPage: number;
};

/**
 * HTTP params that will be sent to the server
 * Computed from PaginationQuery
 */
export type PaginationParams = {
    limit: string;
    offset: string;
}

/**
 * Human-readable sort information
 * Object structure: [fieldName]: 'asc' | 'desc' (ascending (tang dan) or descending (giam dan))
 * @example
 * Sort by fields: id - ascending
 * const sort: SortQuery = { id: 'asc' }
 */
export type SortQuery = Record<string, SortDirection>;

export type GetManyResourceQuery<T extends GenericFilter> = {
    filter: T;
    pagination?: PaginationQuery;
    sort?: SortQuery;
}

export type GetManyResourceWithHospitalID = {
    hospitalID?: string;
}

/**
 * Header response from server
 */
export type HeaderResponse = {
    code: number;
    datetime: string;
    limit: number;
    message: string;
    offset: number;
    totalRecords: number;
}

export type GenericResponse<T> = {
    body: T;
    header: HeaderResponse;
}