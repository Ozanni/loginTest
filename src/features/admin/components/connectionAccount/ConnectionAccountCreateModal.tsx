import { Modal } from '@mui/material';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { ConnectionAccountCreateForm } from './ConnectionAccountCreateForm';

export const ConnectedConnectionAccountCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <>
        <ConnectionAccountCreateModal closeModal={close} />
      </>
    </Modal>
  );
};

export const ConnectionAccountCreateModal = (props: {
  closeModal: () => void;
}) => {
  const { closeModal } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      handleClose={closeModal}
      bodyComponent={
        <ConnectionAccountCreateForm onSuccessCallback={closeModal} />
      }
      width="30vw"
      title="Thêm tài khoản"
      confirmLabel="Thêm mới"
      handleConfirm={() => adminFunctions.submitCreateForm()}
    />
  );
};
