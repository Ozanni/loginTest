import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { useState } from 'react';
import {
  UserAuthorDTO,
  UserAuthorDTOUpdate,
} from '../../../../types/dto/userAuthor';
import { useUpdateUserAuthorMutation } from '../../api/apiUserAuthor';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_USER_AUTHOR } from '../../../../stores/table/tableInitialState';
import { UserAuthorFormFields } from './UserAuthorFormFields';

export type UserAuthorEditFormProps = {
  onSuccessCallback?: () => void;
  record: UserAuthorDTO;
};

export const UserAuthorEditForm = (props: UserAuthorEditFormProps) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editUserAuthor] = useUpdateUserAuthorMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<UserAuthorDTOUpdate> = {
    mode: 'onChange',
    defaultValues: {
      id: record.id,
      name: record.name,
      description: '',
    },
  };

  const onSubmit = async (formData: UserAuthorDTOUpdate) => {
    const submitForm: UserAuthorDTOUpdate = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      description: formData.description ?? '',
    };
    if (submitForm.name.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editUserAuthor(submitForm);
      if ('error' in result) {
        notifySnackbar({
          message: 'Lỗi',
          options: {
            variant: 'error',
          },
        });
      } else {
        notifySnackbar({
          message: 'Thành Công',
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
        onSuccessCallback && onSuccessCallback();
      }
    }
  };

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'submitEditForm',
          () => formInstance.submit && formInstance.submit()
        )
      }
      onSubmit={onSubmit}
      submitOnEnter={true}
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <UserAuthorFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={true}
        />
      )}
    />
  );
};
