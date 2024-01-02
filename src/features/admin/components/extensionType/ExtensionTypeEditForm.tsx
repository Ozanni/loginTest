import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import {
  ExtensionTypeDTO,
  ExtensionTypeDTOUpdate,
} from '../../../../types/dto/extensionType';
import { useUpdateExtensionTypeMutation } from '../../api/apiExtensionType';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { ExtensionTypeFormFields } from './ExtensionTypeFormFields';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_EXTENSION_TYPE } from '../../../../stores/table/tableInitialState';

export type ExtensionTypeEditFormProps = {
  onSuccessCallback?: () => void;
  record: ExtensionTypeDTO;
};

export const ExtensionTypeEditForm = (props: ExtensionTypeEditFormProps) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editExtensionType] = useUpdateExtensionTypeMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<ExtensionTypeDTOUpdate> = {
    mode: 'onChange',
    defaultValues: {
      id: record.id,
      name: record.name,
      description: '',
    },
  };

  const onSubmit = async (formData: ExtensionTypeDTOUpdate) => {
    const submitForm: ExtensionTypeDTOUpdate = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      description: formData.description ?? '',
    };
    if (submitForm.name.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editExtensionType(submitForm);
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
            tableId: TABLE_EXTENSION_TYPE,
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
        <ExtensionTypeFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={true}
        />
      )}
    />
  );
};
