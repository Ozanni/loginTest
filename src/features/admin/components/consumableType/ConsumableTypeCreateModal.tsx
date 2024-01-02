import { Modal } from '@mui/material';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { ConsumableTypeCreateForm } from './ConsumableTypeCreateForm';

export const ConnectedConsumableTypeCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <>
        <ConsumableTypeCreateModal closeModal={close} />
      </>
    </Modal>
  );
};

export const ConsumableTypeCreateModal = (props: {
  closeModal: () => void;
}) => {
  const { closeModal } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      handleClose={closeModal}
      bodyComponent={
        <ConsumableTypeCreateForm onSuccessCallback={closeModal} />
      }
      width="30vw"
      title="Thêm loại vật tư tiêu hao"
      confirmLabel="Thêm Mới"
      handleConfirm={() => adminFunctions.submitCreateForm()}
    />
  );
};
