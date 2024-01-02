import { useDispatch, useSelector } from 'react-redux';
import { TABLE_BODY_PART } from '../../../../stores/table/tableInitialState';
import { useGetBodyPartListQuery } from '../../api/apiBodyPart';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { MyTable, TableField } from '../../../../components/Table/MyTable';
import { BodyPartDTO } from '../../../../types/dto/bodyPart';
import { AdminTableActionButtons } from '../../../../components/Admin/AdminTableActionButtons';
import { setSelectedRow } from '../../../../stores/table/tableSlice';

export const BodyPart = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_BODY_PART].query
  );
  const { data, isFetching, refetch } = useGetBodyPartListQuery(
    query || skipToken
  );

  const tableColumns = useMemo<TableField<BodyPartDTO>[]>(
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
        header: 'Tên bộ phận chụp',
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
      tableId={TABLE_BODY_PART}
      tableName="BỘ PHẬN CHỤP"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons tableId={TABLE_BODY_PART} refetch={refetch} />
      )}
      myDatagridProps={{
        tableId: TABLE_BODY_PART,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_BODY_PART,
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
