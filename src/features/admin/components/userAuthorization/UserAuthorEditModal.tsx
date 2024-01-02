import { forwardRef, useCallback } from 'react';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '../../../../providers/admin/AdminProvider';
import { AppModalContent } from '../../../../components/Elements/Modal/AppModalContent';
import { UserAuthorEditForm } from './UserAuthorEditForm';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_USER_AUTHOR } from '../../../../stores/table/tableInitialState';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import {
  useNotifyModal,
  useNotifySnackbar,
} from '../../../../providers/NotificationProvider';
import { UserAuthorDTO } from '../../../../types/dto/userAuthor';
import { useDeleteUserAuthorMutation } from '../../api/apiUserAuthor';
// import { skipToken } from "@reduxjs/toolkit/query";

export const ConnectedUserAuthorEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_USER_AUTHOR].selection.selectedRow
  );
  // const { data: userAuthorData } = useGetOneUserAuthorQuery(selectedRow != null && isOpen ? { id: selectedRow.id } : skipToken);

  const dispatch = useDispatch();
  const [deleteUserAuthor] = useDeleteUserAuthorMutation();
  const notifyModal = useNotifyModal();
  const notifySnackbar = useNotifySnackbar();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const handleDeleteUserAuthor = useCallback(() => {
    if (selectedRow) {
      notifyModal({
        message: `Bạn có chắc chắn muốn xóa phân quyền ${selectedRow.id} hay không ?`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const result = await deleteUserAuthor({ id: `${selectedRow.id}` });
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
                  tableId: TABLE_USER_AUTHOR,
                  selectedRow: null,
                })
              );
            }
          },
        },
      });
    }
  }, [notifyModal, deleteUserAuthor, setSelectedRow, selectedRow]);
  register('submitDelete', () => handleDeleteUserAuthor());

  return selectedRow ? (
    <Modal open={isOpen}>
      <>
        <UserAuthorEditModal closeModal={close} record={selectedRow} />
      </>
    </Modal>
  ) : (
    <></>
  );
};

type UserAuthorEditModalProps = {
  closeModal: () => void;
  record: UserAuthorDTO;
};

export const UserAuthorEditModal = forwardRef<
  HTMLElement,
  UserAuthorEditModalProps
>((props, ref) => {
  const { closeModal, record } = props;
  const adminFunctions = useAdminFunctions();

  return (
    <>
      <AppModalContent
        ref={ref}
        confirmLabel="Cập Nhật"
        handleConfirm={() => adminFunctions.submitEditForm()}
        handleClose={closeModal}
        bodyComponent={
          <UserAuthorEditForm record={record} onSuccessCallback={closeModal} />
        }
        width="30vw"
        title="Sửa Phân Quyền"
      />
    </>
  );
});
