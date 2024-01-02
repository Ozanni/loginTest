import { useDispatch, useSelector } from 'react-redux';
import { TABLE_STATISTICS_TYPE } from '../../../../stores/table/tableInitialState';
import { useGetStatisticsTypeListQuery } from '../../api/apiStatisticsType';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { StatisticsTypeDTO } from '../../../../types/dto/statisticsType';
import { MyTable, TableField } from '../../../../components/Table/MyTable';
import { AdminTableActionButtons } from '../../../../components/Admin/AdminTableActionButtons';
import { setSelectedRow } from '../../../../stores/table/tableSlice';

export const StatisticsType = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_STATISTICS_TYPE].query
  );
  const { data, isFetching, refetch } = useGetStatisticsTypeListQuery(
    query || skipToken
  );

  const tableColumns = useMemo<TableField<StatisticsTypeDTO>[]>(
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
        header: 'Tên loại báo cáo thống kê',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => (
          <div style={{ textAlign: 'center' }}>{cell.getValue()}</div>
        ),
        columnDefOptions: {
          size: 200,
        },
      },
      {
        type: 'record',
        name: 'config',
        header: 'Cấu hình',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => <div>{cell.getValue()}</div>,
        columnDefOptions: {
          size: 200,
        },
      },
      {
        type: 'record',
        name: 'description',
        header: 'Mô tả',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => <div>{cell.getValue()}</div>,
        columnDefOptions: {
          size: 200,
        },
      },
    ],
    []
  );

  return (
    <MyTable
      tableId={TABLE_STATISTICS_TYPE}
      tableName="Loại báo cáo thống kê"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons
          tableId={TABLE_STATISTICS_TYPE}
          refetch={refetch}
        />
      )}
      myDatagridProps={{
        tableId: TABLE_STATISTICS_TYPE,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_STATISTICS_TYPE,
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
