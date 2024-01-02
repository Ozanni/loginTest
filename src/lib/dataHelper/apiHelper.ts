import { 
    GenericFilter, 
    GetManyResourceQuery, 
    GetManyResourceQueryResult, 
    PaginationParams, 
    PaginationQuery, 
    SortQuery, 
    GenericResponse, 
    HeaderResponse
} from "../../types/api";
import { RESOURCES } from "../../types/resources";
import { ItechBaseRequest } from "../ITechBaseQuery";

export const DEFAULT_PAGINATION: PaginationQuery = {
    page: 1,
    perPage: 100
}

export const DEFAULT_SORT: SortQuery = {
    id: 'asc'
}

export const DEFAULT_QUERY: GetManyResourceQuery<GenericFilter> = {
    filter: {},
    pagination: DEFAULT_PAGINATION,
    sort: DEFAULT_SORT
}

/**
 * Converts human-readable pagination object to actual HTTP pagination params
 */
export const createPaginationParams: (pagination?: PaginationQuery) => PaginationParams = (pagination = {page: 1, perPage: 0}) => ({
    offset: `${(pagination.page - 1) * pagination.perPage}`,
    limit: `${pagination.perPage}`
})

/**
 * Converts human-readable sort object to actual HTTP orderBy string
 * @example
 * const sort = { id: 'asc', name: 'desc' };
 * console.log(createSortParams(sort)); // '+id, -name'
 */
export const createSortParams: (sort?: SortQuery) => string | undefined = (sort) => {
    if (!sort) {
        return undefined;
    }
    const params = Object.entries(sort).map(([key, value]) => {
        switch (value) {
            case 'asc':
                return `+${key}`;
            case 'desc':
                return `-${key}`;
        }
    });
    const orderByStr = params.join(',');
    return orderByStr ? orderByStr : undefined;
}

type GetManyResourceRequestParams = <T extends GenericFilter>(
    query: GetManyResourceQuery<T>,
    resource: `${RESOURCES}`,
    options?: {
        useGetAllWhenFilterIsEmpty?: boolean;
    }
) => ItechBaseRequest;
/**
 * Helper function to return an ItechBaseRequest
 * Use to handle querying a list of any resource
 * Similar to DataProvider.getList
 */
export const getManyResourcesRequestParams: GetManyResourceRequestParams = (
    query,
    resource,
    options = {}
) => {
    const { filter, pagination, sort } = query;
    const { useGetAllWhenFilterIsEmpty = true } = options;
    const orderBy = createSortParams(sort);
    const params = {
        ...createPaginationParams(pagination),
        orderBy
    };
    if (Object.keys(filter).length === 0 && useGetAllWhenFilterIsEmpty) {
        return {
            url: resource,
            method: 'GET',
            params,
            useAsync: true,
            useHospitalID: false
        };
    }
    return {
        url: `search/${resource}`,
        method: 'POST',
        params,
        data: filter,
        useAsync: true,
        useHospitalID: false
    }
}

/**
 * Return body property from response
 */
export function transformResponseGeneric<T>(response: GenericResponse<T>) {
    const { body } = response;
    return body;
}

/**
 * Return data list with total records and other types
 */
export function transformListResponseGeneric<T>(response: {
    header: HeaderResponse;
    body: T[] | null;
}): GetManyResourceQueryResult<T> {
    const { header, body } = response;
    return {
        list: body || [],
        meta: {
            totalRecords: header?.totalRecords
        }
    }
}