import { Modal } from '@mui/material';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { ModalityTypeNameCreateForm } from './ModalityTypeNameCreateForm';

export const ConnectedModalityTypeNameCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <>
        <ModalityTypeNameCreateModal closeModal={close} />
      </>
    </Modal>
  );
};

export const ModalityTypeNameCreateModal = (props: {
  closeModal: () => void;
}) => {
  const { closeModal } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      handleClose={closeModal}
      bodyComponent={
        <ModalityTypeNameCreateForm onSuccessCallback={closeModal} />
      }
      width="30vw"
      title="Thêm loại ca chụp"
      confirmLabel="Thêm Mới"
      handleConfirm={() => adminFunctions.submitCreateForm()}
    />
  );
};
