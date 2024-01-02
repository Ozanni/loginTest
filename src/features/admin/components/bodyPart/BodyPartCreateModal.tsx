import { Modal } from '@mui/material';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { BodyPartCreateForm } from './BodyPartCreateForm';

export function ConnectedBodyPartCreateModal() {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <>
        <BodyPartCreateModal closeModal={close} />
      </>
    </Modal>
  );
}

export function BodyPartCreateModal(props: { closeModal: () => void }) {
  const { closeModal } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      handleClose={closeModal}
      bodyComponent={<BodyPartCreateForm onSuccessCallback={closeModal} />}
      title="Thêm bộ phận chụp"
      confirmLabel="Thêm mới"
      handleConfirm={() => adminFunctions.submitCreateForm()}
      width="30vw"
    />
  );
}
