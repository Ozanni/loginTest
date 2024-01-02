import { useDispatch, useSelector } from 'react-redux';
import { TABLE_CONFIG_ATTRIBUTE } from '../../../../stores/table/tableInitialState';
import { useGetConfigAttributeListQuery } from '../../api/apiConfigAttribute';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { MyTable, TableField } from '../../../../components/Table/MyTable';
import { ConfigAttributeDTO } from '../../../../types/dto/configAttribute';
import { AdminTableActionButtons } from '../../../../components/Admin/AdminTableActionButtons';
import { setSelectedRow } from '../../../../stores/table/tableSlice';

export const ConfigAttribute = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_CONFIG_ATTRIBUTE].query
  );
  const { data, isFetching, refetch } = useGetConfigAttributeListQuery(
    query || skipToken
  );

  const tableColumns = useMemo<TableField<ConfigAttributeDTO>[]>(
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
        header: 'Tên thuộc tính cấu hình',
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
        name: 'datatype',
        header: 'Kiểu dữ liệu',
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
      tableId={TABLE_CONFIG_ATTRIBUTE}
      tableName="Thuộc tính cấu hình"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons
          tableId={TABLE_CONFIG_ATTRIBUTE}
          refetch={refetch}
        />
      )}
      myDatagridProps={{
        tableId: TABLE_CONFIG_ATTRIBUTE,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_CONFIG_ATTRIBUTE,
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
