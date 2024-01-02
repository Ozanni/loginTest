import { forwardRef, useCallback } from 'react';
import { HospitalDTO } from '../../../../types/dto/hospital';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { HospitalEditForm } from './HospitalEditForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_HOSPITAL } from '../../../../stores/table/tableInitialState';
import { useDeleteHospitalMutation } from '../../api/apiHospital';
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';

export const ConnectedHospitalEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_HOSPITAL].selection.selectedRow
  );

  const dispatch = useDispatch();
  const [deleteHospital] = useDeleteHospitalMutation();
  const notifyModal = useNotifyModal();
  const notifySnackbar = useNotifySnackbar();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteHospital = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa bệnh viện ${selectedRow.name} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteHospital({ id: `${selectedRow.id}` });
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
                  tableId: TABLE_HOSPITAL,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteHospital, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteHospital());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <HospitalEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type HospitalEditModalProps = {
  closeModal: () => void;
  record: HospitalDTO;
};

export const HospitalEditModal = forwardRef<
  HTMLElement,
  HospitalEditModalProps
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
          <HospitalEditForm onSuccessCallback={closeModal} record={record} />
        }
        width="30vw"
        title="Sửa thông tin bệnh viện"
      />
    </>
  );
});
