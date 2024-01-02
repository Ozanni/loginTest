import { useDispatch, useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';
import { FC, useMemo } from 'react';
import { TABLE_HOSPITAL_CONFIG } from '../../../../../stores/table/tableInitialState';
import { MyTable, TableField } from '../../../../../components/Table/MyTable';
import { setSelectedRow } from '../../../../../stores/table/tableSlice';
import { AdminTableActionButtons } from '../../../../../components/Admin/AdminTableActionButtons';
import { ConfigDTO } from '../../../../../types/dto/config';
import { useGetConfigListQuery } from '../../../api/apiConfig';

type ConfigProps = {
    hospitalID?: string;
}

export const Config:FC<ConfigProps> = (props) => {
  const { hospitalID } = props;
  const dispatch = useDispatch();
  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_HOSPITAL_CONFIG].query
  );
  const { data, isFetching, refetch } = useGetConfigListQuery(
    query && {hospitalID: hospitalID}
  );

  const tableColumns = useMemo<TableField<ConfigDTO>[]>(
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
        name: 'attributeID',
        header: 'Mã loại cấu hình',
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
        name: 'attributeValue',
        header: 'Tên loại cấu hình',
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
        name: 'preferred',
        header: 'Ưu tiên',
        renderHeader: (header) => <div>{header}</div>,
        renderCell: (cell) => (
          <div style={{ textAlign: 'center' }}>{cell.getValue() ? "Có" : "Không"}</div>
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
      tableId={TABLE_HOSPITAL_CONFIG}
      tableName="Thuộc tính cấu hình"
      data={data?.list}
      tableColumnsDescription={tableColumns}
      renderActionsButton={() => (
        <AdminTableActionButtons
          tableId={TABLE_HOSPITAL_CONFIG}
          refetch={refetch}
          isPanel={true}
        />
      )}
      myDatagridProps={{
        tableId: TABLE_HOSPITAL_CONFIG,
        isLoading: isFetching,
        onRowClick: (_e, row, _table) => {
          dispatch(
            setSelectedRow({
              tableId: TABLE_HOSPITAL_CONFIG,
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
