import { useMemo } from 'react';
import { TableField, MyTable } from '../../../../components/Table/MyTable';
import { AdminTableActionButtons } from '../../../../components/Admin/AdminTableActionButtons';
import { TABLE_USER_AUTHOR } from '../../../../stores/table/tableInitialState';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { useGetUserAuthorListQuery } from '../../api/apiUserAuthor';
import { UserAuthorDTO } from '../../../../types/dto/userAuthor';
import { skipToken } from '@reduxjs/toolkit/query';

export const UserAuthorization = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_USER_AUTHOR].query
  );
  const { data, isFetching, refetch } = useGetUserAuthorListQuery(
    query || skipToken
  );

  const tableColumns = useMemo<TableField<UserAuthorDTO>[]>(
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
        name: 'name',
        header: 'Tên phân quyền',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => (
          <div style={{ textAlign: 'center' }}>{cell.getValue()}</div>
        ),
        columnDefOptions: {
          size: 200,
        },
      },
    ],
    []
  );

  return (
    <MyTable
      tableId={TABLE_USER_AUTHOR}
      tableName="Phân quyền người dùng"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons
          tableId={TABLE_USER_AUTHOR}
          refetch={refetch}
        />
      )}
      myDatagridProps={{
        tableId: TABLE_USER_AUTHOR,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_USER_AUTHOR,
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
