import { forwardRef, useCallback } from 'react';
import { useDisclosure } from '../../../../../hooks/useDisclosure';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_HOSPITAL, TABLE_HOSPITAL_CONFIG } from '../../../../../stores/table/tableInitialState';
import { useNotifyModal, useNotifySnackbar } from '../../../../../providers/NotificationProvider';
import { useAdminFunctions, useRegisterAdminFunctions } from '../../../../../providers/admin/AdminProvider';
import { setSelectedRow } from '../../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';
import { AppModalContent } from '../../../../../components/Elements/Modal/AppModalContent';
import { useDeleteConfigMutation } from '../../../api/apiConfig';
import { ConfigDTO } from '../../../../../types/dto/config';
import { ConfigEditForm } from './ConfigEditForm';


export const ConnectedConfigEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_HOSPITAL_CONFIG].selection.selectedRow
  );
  const selectedHospitalRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_HOSPITAL].selection.selectedRow
  );
  const hospitalID = selectedHospitalRow?.id;
  const dispatch = useDispatch();
  const [deleteConfig] = useDeleteConfigMutation();
  const notifyModal = useNotifyModal();
  const notifySnackbar = useNotifySnackbar();
  const register = useRegisterAdminFunctions();
  register('openEditModalPanel', open);

  const handleDeleteConfig = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa thuộc tính ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteConfig({
              id: `${selectedRow?.id}`,
              attributeValue: '',
              preferred: false,
              hospitalID: hospitalID
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
                  tableId: TABLE_HOSPITAL_CONFIG,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteConfig, setSelectedRow, selectedRow]);
  register('submitDeletePanel', () => handleDeleteConfig());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <ConfigEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type ConfigEditModalProps = {
  closeModal: () => void;
  record: ConfigDTO;
};

export const ConfigEditModal = forwardRef<
  HTMLElement,
  ConfigEditModalProps
>((props, ref) => {
  const { closeModal, record } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <>
      <AppModalContent
        ref={ref}
        confirmLabel="Cập Nhật"
        handleConfirm={() => adminFunctions.submitEditFormPanel()}
        handleClose={closeModal}
        bodyComponent={
          <ConfigEditForm
            record={record}
            onSuccessCallback={closeModal}
          />
        }
        width="30vw"
        title="Cập nhật thuộc tính"
      />
    </>
  );
});
