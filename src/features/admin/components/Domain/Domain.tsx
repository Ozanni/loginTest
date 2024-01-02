import { useDispatch, useSelector } from 'react-redux';
import { TABLE_DOMAIN } from '../../../../stores/table/tableInitialState';
import { useGetDomainListQuery } from '../../api/apiDomain';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { MyTable, TableField } from '../../../../components/Table/MyTable';
import { DomainDTO } from '../../../../types/dto/domain';
import { AdminTableActionButtons } from '../../../../components/Admin/AdminTableActionButtons';
import { setSelectedRow } from '../../../../stores/table/tableSlice';

export const Domain = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_DOMAIN].query
  );
  const { data, isFetching, refetch } = useGetDomainListQuery(
    query || skipToken
  );

  const tableColumns = useMemo<TableField<DomainDTO>[]>(
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
      tableId={TABLE_DOMAIN}
      tableName="Tên miền PACS"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons tableId={TABLE_DOMAIN} refetch={refetch} />
      )}
      myDatagridProps={{
        tableId: TABLE_DOMAIN,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_DOMAIN,
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
