import { forwardRef, useCallback } from 'react';
import { ExtensionTypeDTO } from '../../../../types/dto/extensionType';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { ExtensionTypeEditForm } from './ExtensionTypeEditForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_EXTENSION_TYPE } from '../../../../stores/table/tableInitialState';
import { useDeleteExtensionTypeMutation } from '../../api/apiExtensionType';
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';
// import { skipToken } from "@reduxjs/toolkit/query"

export const ConnectedExtensionTypeEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_EXTENSION_TYPE].selection.selectedRow
  );
  // const { data: extensionTypeData } = useGetOneExtensionTypeQuery(selectedRow != null && isOpen ? { id: selectedRow.id } : skipToken);

  const dispatch = useDispatch();
  const [deleteExtensionType] = useDeleteExtensionTypeMutation();
  const notifyModal = useNotifyModal();
  const notifySnackbar = useNotifySnackbar();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteExtensionType = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa chức năng mở rộng ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteExtensionType({
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
                  tableId: TABLE_EXTENSION_TYPE,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteExtensionType, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteExtensionType());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <ExtensionTypeEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type ExtensionTypeEditModalProps = {
  closeModal: () => void;
  record: ExtensionTypeDTO;
};

export const ExtensionTypeEditModal = forwardRef<
  HTMLElement,
  ExtensionTypeEditModalProps
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
          <ExtensionTypeEditForm
            onSuccessCallback={closeModal}
            record={record}
          />
        }
        width="30vw"
        title="Sửa chức năng mở rộng"
      />
    </>
  );
});
