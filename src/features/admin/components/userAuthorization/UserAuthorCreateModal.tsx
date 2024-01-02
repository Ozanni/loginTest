import { Modal } from '@mui/material';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { UserAuthorCreateForm } from './UserAuthorCreateForm';

export const ConnectedAuthorCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <>
        <UserAuthorCreateModal closeModal={close} />
      </>
    </Modal>
  );
};

export const UserAuthorCreateModal = (props: { closeModal: () => void }) => {
  const { closeModal } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      handleClose={closeModal}
      bodyComponent={<UserAuthorCreateForm onSuccessCallback={closeModal} />}
      width="30vw"
      title="Thêm phân quyền"
      confirmLabel="Thêm Mới"
      handleConfirm={() => adminFunctions.submitCreateForm()}
    />
  );
};
