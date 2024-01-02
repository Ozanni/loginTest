import { Modal } from '@mui/material';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { ExtensionTypeCreateForm } from './ExtensionTypeCreateForm';

export const ConnectedExampleTypeCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <>
        <ExtensionTypeCreateModal closeModal={close} />
      </>
    </Modal>
  );
};

export const ExtensionTypeCreateModal = (props: { closeModal: () => void }) => {
  const { closeModal } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      handleClose={closeModal}
      bodyComponent={<ExtensionTypeCreateForm onSuccessCallback={closeModal} />}
      width="30vw"
      title="Thêm chức năng mở rộng"
      confirmLabel="Thêm mới"
      handleConfirm={() => adminFunctions.submitCreateForm()}
    />
  );
};
