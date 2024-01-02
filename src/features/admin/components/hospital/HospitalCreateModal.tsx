import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { HospitalCreateForm } from './HospitalCreateForm';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { Modal } from '@mui/material';

export const ConnectedHospitalCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <>
        <HospitalCreateModal closeModal={close} />
      </>
    </Modal>
  );
};

export const HospitalCreateModal = (props: { closeModal: () => void }) => {
  const { closeModal } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      handleClose={closeModal}
      bodyComponent={<HospitalCreateForm onSuccessCallback={closeModal} />}
      title="Thêm bệnh viện"
      confirmLabel="Thêm mới"
      width="30vw"
      handleConfirm={() => adminFunctions.submitCreateForm()}
    />
  );
};
