import { Modal } from '@mui/material';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { StatisticsTypeCreateForm } from './StatisticsTypeCreateForm';

export const ConnectedStatisticsTypeCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <>
        <StatisticsTypeCreateModal closeModal={close} />
      </>
    </Modal>
  );
};

export const StatisticsTypeCreateModal = (props: {
  closeModal: () => void;
}) => {
  const { closeModal } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      handleClose={closeModal}
      bodyComponent={
        <StatisticsTypeCreateForm onSuccessCallback={closeModal} />
      }
      width="30vw"
      title="Thêm loại báo cáo thống kê"
      confirmLabel="Thêm mới"
      handleConfirm={() => adminFunctions.submitCreateForm()}
    />
  );
};
