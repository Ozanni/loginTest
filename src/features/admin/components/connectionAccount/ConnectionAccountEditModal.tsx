import { forwardRef, useCallback } from 'react';
import { ConnectionAccountDTO } from '../../../../types/dto/connectionAccount';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { ConnectionAccountEditForm } from './ConnectionAccountEditForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_CONNECTION_ACCOUNT } from '../../../../stores/table/tableInitialState';
import { useDeleteConnectionAccountMutation } from '../../api/apiConnectionAccount';
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';

export const ConnectedConnectionAccountEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_CONNECTION_ACCOUNT].selection.selectedRow
  );

  const dispatch = useDispatch();
  const [deleteConnectionAccount] = useDeleteConnectionAccountMutation();
  const notifySnackbar = useNotifySnackbar();
  const notifyModal = useNotifyModal();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteDomain = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa tài khoản ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteConnectionAccount({
              id: `${selectedRow.id}`,
            });
            if ('error' in result) {
              notifySnackbar({
                message: 'Lỗi',
                options: {
                  variant: 'error',
                },
              });
            } else {
              notifySnackbar({
                message: 'Thành công',
                options: {
                  variant: 'success',
                },
              });
              dispatch(
                setSelectedRow({
                  tableId: TABLE_CONNECTION_ACCOUNT,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteConnectionAccount, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteDomain());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <ConnectionAccountEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type ConnectionAccountEditModalProps = {
  closeModal: () => void;
  record: ConnectionAccountDTO;
};

export const ConnectionAccountEditModal = forwardRef<
  HTMLElement,
  ConnectionAccountEditModalProps
>((props, ref) => {
  const { closeModal, record } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <>
      <AppModalContent
        ref={ref}
        confirmLabel="Cập nhật"
        handleConfirm={() => adminFunctions.submitEditForm()}
        handleClose={closeModal}
        bodyComponent={
          <ConnectionAccountEditForm
            onSuccessCallback={closeModal}
            record={record}
          />
        }
        width="30vw"
        title="Sửa tài khoản"
      />
    </>
  );
});
