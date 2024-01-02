import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./tableInitialState";
import { PayloadAction } from '@reduxjs/toolkit';
import { GenericFilter, GetManyResourceQuery } from "../../types/api";
import { DEFAULT_PAGINATION, DEFAULT_QUERY } from "../../lib/dataHelper/apiHelper";

export type ReduxTableState = {
    query: GetManyResourceQuery<GenericFilter>;
    selection: {
        selectedRow: Record<string, unknown> | null;
    }
}

type CommonPayload = {
    tableId: string
}

const defaultTableState: ReduxTableState = {
    query: DEFAULT_QUERY,
    selection: {
        selectedRow: null
    }
}

export const TABLE_REDUCER = 'table';
export const tableSlice = createSlice({
    name: TABLE_REDUCER,
    initialState,
    reducers: {
        setSelectedRow: (
            state,
            { payload }: PayloadAction<CommonPayload & { selectedRow: any }>
        ) => {
            const { tableId, selectedRow } = payload;
            if (!state.data[tableId]) {
                state.data[tableId] = defaultTableState;
            }
            state.data[tableId].selection.selectedRow = selectedRow;
        },
        setTablePage: (
            state,
            { payload }: PayloadAction<CommonPayload & { page: number }>
        ) => {
            const { tableId, page } = payload;
            if (!state.data[tableId]) {
                state.data[tableId] = defaultTableState;
            }
            state.data[tableId].query.pagination = {
                page,
                perPage: state.data[tableId].query.pagination?.perPage || DEFAULT_PAGINATION.perPage
            }
        },
        setTablePerPage: (
            state,
            { payload }: PayloadAction<CommonPayload & { perPage: number }>
        ) => {
            const { tableId, perPage } = payload;
            if (!state.data[tableId]) {
                state.data[tableId] = {
                    query: {
                        ...defaultTableState.query,
                        pagination: {
                            page: 1,
                            perPage
                        }
                    },
                    selection: {
                        ...defaultTableState.selection
                    }
                };
            } else {
                state.data[tableId].query.pagination = {
                    page: 1,
                    perPage
                }
            }
        }
    }
})

export const { setSelectedRow, setTablePage, setTablePerPage } = tableSlice.actions;

export const tableReducer = tableSlice.reducer;