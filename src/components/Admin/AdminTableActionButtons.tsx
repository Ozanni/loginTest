import { TableActionButtonsShell } from '../Table/TableActionButtonsShell';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyIconButtonWithTooltip } from '../Buttons/MyIconButtonWithTooltip';
import { useAdminFunctions } from '../../providers/admin/AdminProvider';
import { useSelector } from 'react-redux';
import { TABLE_DOMAIN } from '../../stores/table/tableInitialState';

type AdminTableActionButtonsProps = {
  tableId: string;
  refetch?: () => void;
  isPanel?: boolean;
};

export function AdminTableActionButtons(props: AdminTableActionButtonsProps) {
  const { tableId, refetch, isPanel } = props;
  const adminFunctions = useAdminFunctions();
  const selectedRow = useSelector(
    (state: any) => state.tableReducer.data[tableId].selection.selectedRow
  );

  return (
    <TableActionButtonsShell
      actionsButton={
        <>
          {refetch && (
            <MyIconButtonWithTooltip title="Mới" onClick={refetch}>
              <RefreshIcon />
            </MyIconButtonWithTooltip>
          )}
          <MyIconButtonWithTooltip
            title="Thêm"
            onClick={() => {
              isPanel? adminFunctions.openCreateModalPanel() : adminFunctions.openCreateModal();
            }}
          >
            <AddIcon />
          </MyIconButtonWithTooltip>
          {tableId !== TABLE_DOMAIN ? (
            <MyIconButtonWithTooltip
              title="Sửa"
              disabled={!selectedRow}
              onClick={() => isPanel ? adminFunctions.openEditModalPanel() : adminFunctions.openEditModal()}
            >
              <EditIcon />
            </MyIconButtonWithTooltip>
          ) : (
            <></>
          )}
          <MyIconButtonWithTooltip
            title="Xóa"
            disabled={!selectedRow}
            onClick={() => isPanel ? adminFunctions.submitDeletePanel() : adminFunctions.submitDelete()}
          >
            <DeleteIcon />
          </MyIconButtonWithTooltip>
        </>
      }
    />
  );
}
