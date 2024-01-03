import { Stack, Typography, styled } from '@mui/material';
import { 
  createColumnHelper, 
  useReactTable, 
  getCoreRowModel, 
  ColumnDef,
  ColumnHelper,
  CellContext,
  Table,
  TableState,
  RowSelectionState,
  getSortedRowModel,
  TableOptions,
  Updater
} from '@tanstack/react-table';
import { 
  useMemo, 
  ReactNode,
  useState,
  useCallback
} from 'react';
import { MyDatagrid } from './MyDatagrid';
import { MyDatagridProps } from './MyDatagrid';
import { TableFooterComponent } from './TableFooterComponent';
import { MyTablePaginationWrapper } from './MyTablePaginationWrapper';
import { TablePaginationControls, TablePaginationInfo, useTablePagination } from '../../hooks/useTablePagination';
import { MyTableOnRowPerPage } from './MyTableOnRowPerPage';

const StyledTableContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
  //padding: 8px;
  font-family: Kanit;
`;

// const StyledLabel = styled('div')`
//   width: fit-content;
//   font-family: Kanit;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 175%;
//   letter-spacing: 0.15px;
//   text-transform: uppercase;
//   border-bottom: 1px solid #0E8A72;
//   margin-left: 8px;
// `;

const DEFAULT_TABLE_ID = 'noname-table';

type TableRecordField<T> = {
  name: keyof T;
  header: string;
  renderHeader?: (header: string) => ReactNode;
  renderCell?: (cell: CellContext<T, any>) => ReactNode;
  columnDefOptions?: Omit<ColumnDef<T>, 'header' | 'footer' | 'cell'>;
}

type TableArbitraryField<T> = {
  getColumnDef: (columnHelper: ColumnHelper<T>) => ColumnDef<T>;
}

export type TableField<T> = 
  | ({type: 'record'} & TableRecordField<T>) | ({type: 'custom'} & TableArbitraryField<T>);

type MyTableProps<T> = {
  tableId?: string,
  tableName: string;
  data?: T[];
  tableColumnsDescription: TableField<T>[];
  renderActionsButton?: () => ReactNode;
  myDatagridProps?: Omit<MyDatagridProps<T>, 'table'>;
  showPagination?: boolean;
  renderPagination?: (paginationProps: TablePaginationInfo) => ReactNode;
  paginationControls?: TablePaginationControls;
  manualPagination?: boolean;
  selectedIds?: number[];
  /**
   * If enabled, the table will automatically select the first row
   */
  initialFirstRowSelected?: boolean;
  manualSorting?: boolean;
  TanstackTableOptions?: Omit<TableOptions<T>, 'columns' | 'data' | 'getCoreRowModel'>;
}

export function MyTable<T>(props: MyTableProps<T>) {
  const {
    tableId = DEFAULT_TABLE_ID,
    // tableName,
    data = [],
    tableColumnsDescription,
    renderActionsButton,
    myDatagridProps,
    showPagination = true,
    renderPagination,
    paginationControls = {},
    manualPagination = true,
    selectedIds = [],
    initialFirstRowSelected = false,
    manualSorting = true,
    TanstackTableOptions
  } = props;
  const columnHelper = useMemo(() => createColumnHelper<T>(), []);
  const columns = useMemo<ColumnDef<T>[]>(() => {
    const columns: ColumnDef<T>[] = [];
    tableColumnsDescription.forEach((item) => {
      const { type } = item;
      switch (type) {
        case 'custom':
          columns.push({...item.getColumnDef(columnHelper)});
          break;
        case 'record':
          columns.push({
            ...(columnHelper.accessor((row: T) => row[item.name], {
              id: item.name as string,
              header: () => item.renderHeader ? item.renderHeader(item.header) : item.header,
              cell: (props) => item.renderCell ? item.renderCell(props) : props.getValue()
            }) as ColumnDef<T>),
            ...item.columnDefOptions
          });
          break;
      }
    })
    return columns;
  }, [columnHelper, tableColumnsDescription]);
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      rowSelection: getInitialRowSelectedState({
        data,
        initialFirstRowSelected,
        selectedIds
      })
    },
    manualPagination,
    manualSorting,
    getRowId: getRowId,
    columnResizeMode: 'onChange',
    ...TanstackTableOptions
  });
  const { paginationProps } = useTableState({
    tableId,
    table,
    paginationControls,
    manualPagination,
    selectedIds
  })

  return (
    <Stack 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        marginTop: 0,
      }}
    >
      {/* <StyledLabel>{tableName}</StyledLabel> */}
      <StyledTableContainer>
        <TableFooterComponent
          footerLeftComponent={renderActionsButton && renderActionsButton()}
          footerCenterComponent={
            <MyTablePaginationWrapper
              showPageChanger={showPagination}
              renderPagination={renderPagination}
              paginationProps={paginationProps}
            />
          }
          footerRightComponent={
            <>
              <Typography style={{color: '#707070', fontFamily: 'Kanit', fontSize: '13px'}}>
                Số hàng:
              </Typography>
              <MyTableOnRowPerPage
                rowsPerPage={paginationProps.rowsPerPage}
                onRowsPerPageChange={paginationProps.onRowsPerPageChange}
                rowsPerPageOptions={paginationProps.rowsPerPageOptions}
              />
            </>
          }
        />
        <div style={{overflow: 'hidden', flex: 1, border: '1px solid #bdbdbd'}}>
          <MyDatagrid 
            tableId={tableId}
            table={table}
            {...myDatagridProps}
          />
        </div>
      </StyledTableContainer>
    </Stack>
  )
}

const getRowId = <T,>(original: T, index: number) => {
  const org = original as Record<string, unknown>;
  if (org && org.id) {
    return `${org.id}`;
  }
  return `${index}`;
}

const getInitialRowSelectedState = <T,>(options: {
  data: T[],
  initialFirstRowSelected: boolean,
  selectedIds: number[]
}): RowSelectionState => {
  const { data, initialFirstRowSelected } = options;
  if (data && data.length) {
    if (initialFirstRowSelected) {
      return { [getRowId(data[0], 0)]: true };
    }
  }
  return {};
}

const useTableState = <T,>(props: {
  tableId: string;
  table: Table<T>;
  paginationControls: TablePaginationControls;
  manualPagination?: boolean;
  selectedIds: number[]
}) => {
  const {
    tableId = DEFAULT_TABLE_ID,
    table,
    paginationControls,
    manualPagination
  } = props;
  const [state, setState] = useState<TableState>(table.initialState);
  const paginationProps = useTablePagination(tableId, paginationControls);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({
    ...table.initialState.rowSelection
  })

  const onRowSelectionChange = useCallback((updater: Updater<RowSelectionState>) => {
    setRowSelection((prevRowState) => {
      let newRowState: RowSelectionState;
      // Update new row state
      if (updater instanceof Function) {
        newRowState = updater(prevRowState);
      } else {
        newRowState = updater;
      }
      return newRowState;
    })
  }, []);

  table.setOptions((prev) => ({
    ...prev,
    state: {
      ...state,
      pagination: manualPagination ? {
        pageIndex: paginationProps.page,
        pageSize: paginationControls.pageSize || 0
      } : undefined,
      rowSelection
    },
    pageCount: paginationProps.pageCount,
    onStateChange: setState,
    onRowSelectionChange
  }))

  return {
    paginationProps
  }
}