import { useDispatch, useSelector } from 'react-redux';
import { useGetConsumableTypeListQuery } from '../../api/apiConsumableType';
import { useMemo } from 'react';
import { MyTable, TableField } from '../../../../components/Table/MyTable';
import { ConsumableTypeDTO } from '../../../../types/dto/consumableType';
import { TABLE_CONSUMABLE_TYPE } from '../../../../stores/table/tableInitialState';
import { AdminTableActionButtons } from '../../../../components/Admin/AdminTableActionButtons';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { skipToken } from '@reduxjs/toolkit/query';

export const ConsumableType = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_CONSUMABLE_TYPE].query
  );
  const { data, isFetching, refetch } = useGetConsumableTypeListQuery(
    query || skipToken
  );

  const tableColumns = useMemo<TableField<ConsumableTypeDTO>[]>(
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
        header: 'Tên loại vật tư tiêu hao',
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
      tableId={TABLE_CONSUMABLE_TYPE}
      tableName="Loại vật tư tiêu hao"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons
          tableId={TABLE_CONSUMABLE_TYPE}
          refetch={refetch}
        />
      )}
      myDatagridProps={{
        tableId: TABLE_CONSUMABLE_TYPE,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_CONSUMABLE_TYPE,
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
