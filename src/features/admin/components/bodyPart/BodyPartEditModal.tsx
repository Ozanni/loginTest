import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { TABLE_BODY_PART } from '../../../../stores/table/tableInitialState';
import { useDeleteBodyPartMutation } from '../../api/apiBodyPart';
// import { skipToken } from "@reduxjs/toolkit/query";
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { forwardRef, useCallback } from 'react';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';
import { BodyPartDTO } from '../../../../types/dto/bodyPart';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { BodyPartEditForm } from './BodyPartEditForm';

export function ConnectedBodyPartEditModal() {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_BODY_PART].selection.selectedRow
  );
  // const { data: bodyPartData } = useGetBodyPartQuery(selectedRow != null && isOpen ? { id: selectedRow.id } : skipToken);

  const dispatch = useDispatch();
  const [deleteBodyPart] = useDeleteBodyPartMutation();
  const notifyModal = useNotifyModal();
  const notifySnackbar = useNotifySnackbar();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteBodyPart = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa bộ phận chụp ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteBodyPart({ id: `${selectedRow.id}` });
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
                  tableId: TABLE_BODY_PART,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteBodyPart, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteBodyPart());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <BodyPartEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
}

type BodyPartProps = {
  closeModal: () => void;
  record: BodyPartDTO;
};

export const BodyPartEditModal = forwardRef<HTMLElement, BodyPartProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel="Cập nhật"
        handleConfirm={() => adminFunctions.submitEditForm()}
        handleClose={closeModal}
        bodyComponent={
          <BodyPartEditForm record={record} onSuccessCallback={closeModal} />
        }
        width="30vw"
        title="Sửa bộ phận chụp"
      />
    );
  }
);
