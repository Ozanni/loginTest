import { ChangeEvent, useCallback } from "react";
import { DEFAULT_PAGINATION } from "../lib/dataHelper/apiHelper";
import { PaginationQuery } from "../types/api";
import { useDispatch, useSelector } from "react-redux";
import { setTablePage, setTablePerPage } from "../stores/table/tableSlice";

export type TablePaginationControls = {
    totalRecords?: number;
    pageSize?: number;
    rowsPerPageOptions?: number[];
}
export type TablePaginationInfo = {
    page: number;
    rowsPerPage: number;
    totalRecords: number;
    pageSize: number;
    start: number;
    end: number;
    pageCount: number;
    rowsPerPageOptions: number[];
    onPageChange: (event: ChangeEvent<unknown>, page: number) => void;
    onRowsPerPageChange: (value: number) => void;
}

type PageChangeHandler = (event: ChangeEvent<unknown>, page: number) => void;
type RowsPerPageChangeHandler = (value: number) => void;

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];
const PAGINATION_STATE_DEFAULT: PaginationQuery = {
    page: 1,
    perPage: DEFAULT_PAGINATION.perPage
}

export const useTablePagination = (
    tableId: string,
    options: TablePaginationControls = {}
): TablePaginationInfo => {
    const { totalRecords, pageSize, rowsPerPageOptions } = options;

    // const pagination = useSelector(getCurrentTablePagination(tableId));
    const pagination = useSelector((state: any) => state.tableReducer.data[tableId].query.pagination);
    // console.log(pagination);
    const dispatch = useDispatch();

    const page = pagination.page || PAGINATION_STATE_DEFAULT.page;
    const rowsPerPage = pagination.perPage || PAGINATION_STATE_DEFAULT.perPage;
    const pageCount = Math.ceil((totalRecords || 0) / rowsPerPage) || 1;

    const handlePageChange: PageChangeHandler = useCallback((_e, page) => {
        dispatch(setTablePage({
            tableId,
            page
        }))
    }, [dispatch, tableId]);
    const handleRowsPerPageChange: RowsPerPageChangeHandler = useCallback((perPage) => {
        dispatch(setTablePerPage({
            tableId,
            perPage
        }))
    }, [dispatch, tableId]);

    const start = (page - 1) * rowsPerPage + 1;
    const end = start + ((pageSize || 0) - 1);

    return {
        page,
        rowsPerPage,
        totalRecords: totalRecords || 0,
        pageSize: pageSize || 0,
        start,
        end,
        pageCount,
        rowsPerPageOptions: rowsPerPageOptions || ROWS_PER_PAGE_OPTIONS,
        onPageChange: handlePageChange,
        onRowsPerPageChange: handleRowsPerPageChange
    }
}
