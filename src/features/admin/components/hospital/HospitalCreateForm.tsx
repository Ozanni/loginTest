import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useCreateHospitalMutation } from '../../api/apiHospital';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { HospitalDTOCreate } from '../../../../types/dto/hospital';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { HospitalFormFields } from './HospitalFormFields';

export const HospitalCreateForm = (props: {
  onSuccessCallback?: () => void;
}) => {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createHospital] = useCreateHospitalMutation();
  const notifySnackbar = useNotifySnackbar();

  const onSubmit = async (formData: HospitalDTOCreate) => {
    const submitForm: HospitalDTOCreate = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      description: formData.description ?? '',
      phone: formData.phone ?? '',
      email: formData.email ?? '',
      address: formData.address ?? '',
      enabled: formData.enabled ?? false,
      logo: formData.logo ?? '',
      logoFull: formData.logoFull ?? '',
    };
    if (submitForm.id.length === 0 || submitForm.name.length === 0)
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createHospital(submitForm);
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

  const formOptions: UseFormProps<HospitalDTOCreate> = {
    mode: 'onChange',
    defaultValues: {
      id: '',
      name: '',
      description: '',
      phone: '',
      email: '',
      address: '',
      enabled: false,
      logo: '',
      logoFull: '',
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
        <HospitalFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={false}
        />
      )}
    />
  );
};
