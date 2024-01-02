import { forwardRef, useCallback } from 'react';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { ModalityTypeNameDTO } from '../../../../types/dto/modalityTypeName';
import { ModalityTypeNameEditForm } from './ModalityTypeNameEditForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_MODALITY_TYPE_NAME } from '../../../../stores/table/tableInitialState';
import { useDeleteModalityTypeNameMutation } from '../../api/apiModalityTypeName';
// import { skipToken } from "@reduxjs/toolkit/query";
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';

export const ConnectedModalityTypeNameEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_MODALITY_TYPE_NAME].selection.selectedRow
  );
  // const { data: modalityTypeNameData } = useGetOneModalityTypeNameQuery(selectedRow != null && isOpen ? { id: selectedRow.id } : skipToken);

  const dispatch = useDispatch();
  const [deleteModalityTypeName] = useDeleteModalityTypeNameMutation();
  const notifyModal = useNotifyModal();
  const notifySnackbar = useNotifySnackbar();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteModalityTypeName = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa loại ca chụp ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteModalityTypeName({ id: selectedRow.id });
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
                  tableId: TABLE_MODALITY_TYPE_NAME,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteModalityTypeName, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteModalityTypeName());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <ModalityTypeNameEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type ModalityTypeNameEditModalProps = {
  closeModal: () => void;
  record: ModalityTypeNameDTO;
};

export const ModalityTypeNameEditModal = forwardRef<
  HTMLElement,
  ModalityTypeNameEditModalProps
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
          <ModalityTypeNameEditForm
            record={record}
            onSuccessCallback={closeModal}
          />
        }
        width="30vw"
        title="Sửa Phân Quyền"
      />
    </>
  );
});
