import { useDispatch, useSelector } from 'react-redux';
import { TABLE_CONNECTION_ACCOUNT } from '../../../../stores/table/tableInitialState';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetConnectionAccountListQuery } from '../../api/apiConnectionAccount';
import { useMemo } from 'react';
import { MyTable, TableField } from '../../../../components/Table/MyTable';
import { ConnectionAccountDTO } from '../../../../types/dto/connectionAccount';
import { AdminTableActionButtons } from '../../../../components/Admin/AdminTableActionButtons';
import { setSelectedRow } from '../../../../stores/table/tableSlice';

export const ConnectionAccount = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_CONNECTION_ACCOUNT].query
  );
  const { data, isFetching, refetch } = useGetConnectionAccountListQuery(
    query || skipToken
  );

  const tableColumns = useMemo<TableField<ConnectionAccountDTO>[]>(
    () => [
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'stt',
            header: 'STT',
            cell: (props) => (
              <div style={{ textAlign: 'center' }}>{props.row.index + 1}</div>
            ),
            size: 50,
          }),
      },
      {
        type: 'record',
        name: 'id',
        header: 'ID',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => (
          <div style={{ textAlign: 'center' }}>{cell.getValue()}</div>
        ),
        columnDefOptions: {
          size: 50,
        },
      },
      {
        type: 'record',
        name: 'type',
        header: 'Tài khoản',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => (
          <div style={{ textAlign: 'center' }}>{cell.getValue()}</div>
        ),
        columnDefOptions: {
          size: 100,
        },
      },
      {
        type: 'record',
        name: 'authorities',
        header: 'Quyền',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => <div>{cell.getValue().join(', ')}</div>,
        columnDefOptions: {
          size: 200,
        },
      },
      {
        type: 'record',
        name: 'ipAllowed',
        header: 'Địa chỉ IP',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => <div>{cell.getValue().join(', ')}</div>,
        columnDefOptions: {
          size: 100,
        },
      },
      {
        type: 'record',
        name: 'hospitalID',
        header: 'Hospital ID',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => (
          <div style={{ textAlign: 'center' }}>{cell.getValue()}</div>
        ),
        columnDefOptions: {
          size: 100,
        },
      },
    ],
    []
  );

  return (
    <MyTable
      tableId={TABLE_CONNECTION_ACCOUNT}
      tableName="Tài khoản kết nối PACS"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons
          tableId={TABLE_CONNECTION_ACCOUNT}
          refetch={refetch}
        />
      )}
      myDatagridProps={{
        tableId: TABLE_CONNECTION_ACCOUNT,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_CONNECTION_ACCOUNT,
              selectedRow: row.original,
            })
          );
        },
      }}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
    />
  );
};
