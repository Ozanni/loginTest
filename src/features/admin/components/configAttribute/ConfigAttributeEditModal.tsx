import { forwardRef, useCallback } from 'react';
import { ConfigAttributeDTO } from '../../../../types/dto/configAttribute';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { ConfigAttributeEditForm } from './ConfigAttributeEditForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_CONFIG_ATTRIBUTE } from '../../../../stores/table/tableInitialState';
import { useDeleteConfigAttributeMutation } from '../../api/apiConfigAttribute';
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';

export const ConnectedConfigAttributeEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_CONFIG_ATTRIBUTE].selection.selectedRow
  );

  const dispatch = useDispatch();
  const [deleteConfigAttribute] = useDeleteConfigAttributeMutation();
  const notifyModal = useNotifyModal();
  const notifySnackbar = useNotifySnackbar();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteConfigAttributte = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa thuộc tính ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteConfigAttribute({
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
                  tableId: TABLE_CONFIG_ATTRIBUTE,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteConfigAttribute, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteConfigAttributte());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <ConfigAttributeEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type ConfigAttributeEditModalProps = {
  closeModal: () => void;
  record: ConfigAttributeDTO;
};

export const ConfigAttributeEditModal = forwardRef<
  HTMLElement,
  ConfigAttributeEditModalProps
>((props, ref) => {
  const { closeModal, record } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <>
      <AppModalContent
        ref={ref}
        confirmLabel="Cập Nhật"
        handleConfirm={() => adminFunctions.submitEditForm()}
        handleClose={closeModal}
        bodyComponent={
          <ConfigAttributeEditForm
            record={record}
            onSuccessCallback={closeModal}
          />
        }
        width="30vw"
        title="Sửa thông tin cấu hình"
      />
    </>
  );
});
