import { forwardRef, useCallback } from 'react';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { StatisticsTypeDTO } from '../../../../types/dto/statisticsType';
import { StatisticsTypeEditForm } from './StatisticsTypeEditForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { TABLE_STATISTICS_TYPE } from '../../../../stores/table/tableInitialState';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteStatisticsTypeMutation } from '../../api/apiStatisticsType';
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { Modal } from '@mui/material';

export const ConnectedStatisticsTypeEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_STATISTICS_TYPE].selection.selectedRow
  );

  const dispatch = useDispatch();
  const [deleteStatisticsType] = useDeleteStatisticsTypeMutation();
  const notifyModal = useNotifyModal();
  const notifySnackbar = useNotifySnackbar();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteStatisticsType = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa loại báo cáo thống kê ${selectedRow.name} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteStatisticsType({
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
                  tableId: TABLE_STATISTICS_TYPE,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteStatisticsType, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteStatisticsType());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <StatisticsTypeEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type StatisticsTypeEditModalProps = {
  closeModal: () => void;
  record: StatisticsTypeDTO;
};

export const StatisticsTypeEditModal = forwardRef<
  HTMLElement,
  StatisticsTypeEditModalProps
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
          <StatisticsTypeEditForm
            onSuccessCallback={closeModal}
            record={record}
          />
        }
        width="30vw"
        title="Sửa loại báo cáo thống kê"
      />
    </>
  );
});
