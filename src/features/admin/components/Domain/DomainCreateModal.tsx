import { Modal } from '@mui/material';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { DomainCreateForm } from './DomainCreateForm';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_DOMAIN } from '../../../../stores/table/tableInitialState';
import { useDeleteDomainMutation } from '../../api/apiDomain';
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { setSelectedRow } from '../../../../stores/table/tableSlice';

export const ConnectedDomainCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  const selectedRow = useSelector(
    (state: any) => state.tableReducer.data[TABLE_DOMAIN].selection.selectedRow
  );
  const dispatch = useDispatch();
  const [deleteDomain] = useDeleteDomainMutation();
  const notifySnackbar = useNotifySnackbar();
  const notifyModal = useNotifyModal();

  const handleDeleteDomain = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa tên miền ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteDomain({ id: `${selectedRow.id}` });
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
                  tableId: TABLE_DOMAIN,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteDomain, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteDomain());

  return (
    <Modal open={isOpen}>
      <>
        <DomainCreateModal closeModal={close} />
      </>
    </Modal>
  );
};

export const DomainCreateModal = (props: { closeModal: () => void }) => {
  const { closeModal } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      handleClose={closeModal}
      bodyComponent={<DomainCreateForm onSuccessCallback={closeModal} />}
      title="Thêm tên miền"
      confirmLabel="Thêm mới"
      handleConfirm={() => adminFunctions.submitCreateForm()}
      width="30vw"
    />
  );
};
