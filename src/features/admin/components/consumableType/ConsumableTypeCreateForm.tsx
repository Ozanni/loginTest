import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useCreateConsumableTypeMutation } from '../../api/apiConsumableType';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { ConsumableTypeDTOCreate } from '../../../../types/dto/consumableType';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { ConsumableTypeFormFields } from './ConsumableTypeFormFields';

export const ConsumableTypeCreateForm = (props: {
  onSuccessCallback?: () => void;
}) => {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createConsumableType] = useCreateConsumableTypeMutation();
  const notifySnackbar = useNotifySnackbar();

  const onSubmit = async (formData: ConsumableTypeDTOCreate) => {
    const submitForm: ConsumableTypeDTOCreate = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      description: formData.description ?? '',
    };
    if (submitForm.id.length === 0 || submitForm.name.length === 0)
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createConsumableType(submitForm);
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

  const formOptions: UseFormProps<ConsumableTypeDTOCreate> = {
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
        <ConsumableTypeFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={false}
        />
      )}
    />
  );
};
