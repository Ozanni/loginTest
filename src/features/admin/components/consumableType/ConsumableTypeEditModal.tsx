import { forwardRef, useCallback } from 'react';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { ConsumableTypeDTO } from '../../../../types/dto/consumableType';
import { ConsumableTypeEditForm } from './ConsumableTypeEditForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_CONSUMABLE_TYPE } from '../../../../stores/table/tableInitialState';
import { useDeleteConsumableTypeMutation } from '../../api/apiConsumableType';
// import { skipToken } from "@reduxjs/toolkit/query";
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';

export const ConnectedConsumableTypeEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_CONSUMABLE_TYPE].selection.selectedRow
  );
  // const { data: consumableTypeData } = useGetOneConsumableTypeQuery(selectedRow != null && isOpen ? { id: selectedRow.id } : skipToken);

  const dispatch = useDispatch();
  const [deleteConsumableType] = useDeleteConsumableTypeMutation();
  const notifyModal = useNotifyModal();
  const notifySnackbar = useNotifySnackbar();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteConsumableType = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa loại vật tư tiêu hao ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteConsumableType({
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
                message: 'Thành Công',
                options: {
                  variant: 'success',
                },
              });
              dispatch(
                setSelectedRow({
                  tableId: TABLE_CONSUMABLE_TYPE,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteConsumableType, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteConsumableType());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <ConsumableTypeEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type ConsumableTypeEditModalProps = {
  closeModal: () => void;
  record: ConsumableTypeDTO;
};

export const ConsumableTypeEditModal = forwardRef<
  HTMLElement,
  ConsumableTypeEditModalProps
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
          <ConsumableTypeEditForm
            record={record}
            onSuccessCallback={closeModal}
          />
        }
        width="30vw"
        title="Sửa loại vật tư tiêu hao"
      />
    </>
  );
});
