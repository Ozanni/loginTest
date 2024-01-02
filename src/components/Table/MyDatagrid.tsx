import { Row, Table, flexRender } from '@tanstack/react-table';
import { styled, LinearProgress, Box } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

const StyledDatagridContainer = styled('div')`
  overflow: auto;
  height: 100%;
  width: 100%;
  background-color: #f0f1f4;
  & > table {
    min-width: 100%;
    border-collapse: collapse;
    position: relative;
    width: 100%;
    & thead {
      background-color: #c8e3de;
    }
    & th {
      border: 1px solid darkgrey;
      font-size: 14px;
      font-weight: 500;
      padding: 4px;
      position: relative;
    }
  }
`;

const StyledTHead = styled('thead')`
  height: 35px;
  top: 0;
  position: sticky;
  z-index: 1;
`;

const StyledTBody = styled('tbody')`
  & > tr {
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: #f0f1f4;
    }
    & td {
      border: 1px solid darkgrey;
      padding: 4px;
      font-size: 13px;
      font-weight: 400;
    }
    &.selected {
      background-color: #c8e3de;
    }
  }
`;

export type MyDatagridProps<T> = {
  tableId: string;
  table: Table<T>;
  onRowClick?: (
    e: MouseEvent<HTMLTableRowElement>,
    row: Row<T>,
    table: Table<T>
  ) => void;
  onRowDoubleClick?: (
    e: MouseEvent<HTMLTableRowElement>,
    row: Row<T>,
    table: Table<T>
  ) => void;
  isLoading?: boolean;
};

export function MyDatagrid<T>(props: MyDatagridProps<T>) {
  const { tableId, table, onRowClick, onRowDoubleClick, isLoading } = props;
  const [selectedRowId, SetSelectedRowId] = useState<string>('');
  const selectedRow = useSelector(
    (state: any) => state.tableReducer.data[tableId].selection.selectedRow
  );

  const rowLeftClickHandler = useCallback(
    (e: MouseEvent<HTMLTableRowElement>, row: Row<T>) => {
      SetSelectedRowId(row.id);
      switch (e.detail) {
        case 1: {
          if (!row.getIsSelected() && !e.shiftKey) row.toggleSelected();
          onRowClick && onRowClick(e, row, table);
          break;
        }
        case 2: {
          onRowDoubleClick && onRowDoubleClick(e, row, table);
          break;
        }
      }
    },
    [onRowClick, onRowDoubleClick, table]
  );

  return (
    <StyledDatagridContainer id={tableId}>
      <table>
        <StyledTHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    minWidth: header.getSize(),
                    maxWidth: header.getSize(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
          {isLoading && (
            <tr>
              <td style={{ padding: 0 }}>
                <Box sx={{ width: '100%', position: 'absolute' }}>
                  <LinearProgress />
                </Box>
              </td>
            </tr>
          )}
        </StyledTHead>
        <StyledTBody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={
                row.id == selectedRowId && selectedRow != null ? 'selected' : ''
              }
              onClick={(e) => rowLeftClickHandler(e, row)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </StyledTBody>
      </table>
    </StyledDatagridContainer>
  );
}
