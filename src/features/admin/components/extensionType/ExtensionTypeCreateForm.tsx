import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useCreateExtensionTypeMutation } from '../../api/apiExtensionType';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { ExtensionTypeDTOCreate } from '../../../../types/dto/extensionType';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { ExtensionTypeFormFields } from './ExtensionTypeFormFields';

export const ExtensionTypeCreateForm = (props: {
  onSuccessCallback?: () => void;
}) => {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createExtensionType] = useCreateExtensionTypeMutation();
  const notifySnackbar = useNotifySnackbar();

  const onSubmit = async (formData: ExtensionTypeDTOCreate) => {
    const submitForm: ExtensionTypeDTOCreate = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      description: '',
    };
    if (submitForm.id.length === 0 || submitForm.name.length === 0)
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createExtensionType(submitForm);
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
        onSuccessCallback && onSuccessCallback();
      }
    }
  };

  const formOptions: UseFormProps<ExtensionTypeDTOCreate> = {
    mode: 'onChange',
    defaultValues: {
      id: '',
      name: '',
      description: '',
    },
  };

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'submitCreateForm',
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
          disableIdField={false}
        />
      )}
    />
  );
};
