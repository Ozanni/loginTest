import { useMemo, useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useCreateConfigHospitalMutation } from '../../api/apiConfigAttribute';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { ConfigAttributeDTOCreate } from '../../../../types/dto/configAttribute';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { ConfigAttributeFormFields } from './ConfigAttributeFormFields';

export const ConfigAttributeCreateForm = (props: {
  onSuccessCallback?: () => void;
}) => {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createConfigAttribute] = useCreateConfigHospitalMutation();
  const notifySnackbar = useNotifySnackbar();

  const onSubmit = async (formData: ConfigAttributeDTOCreate) => {
    const submitForm: ConfigAttributeDTOCreate = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      datatype: formData.datatype ?? '',
      datatypeConfig: formData.datatypeConfig ?? '',
      description: formData.description ?? '',
      minOccurs: formData.minOccurs ?? 0,
      maxOccurs: formData.maxOccurs ?? 0,
    };
    if (
      submitForm.id.length === 0 ||
      submitForm.name.length === 0 ||
      submitForm.datatype.length === 0
    )
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createConfigAttribute(submitForm);
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

  const formOptions: UseFormProps<ConfigAttributeDTOCreate> = {
    mode: 'onChange',
    defaultValues: {
      id: '',
      name: '',
      datatype: '',
      datatypeConfig: '',
      description: '',
      minOccurs: 0,
      maxOccurs: 0,
    },
  };

  const datatypes = useMemo<Array<string>>(
    () => ['STRING', 'BOOLEAN', 'INTEGER', 'FLOAT'],
    []
  );

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
        <ConfigAttributeFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={false}
          datatypes={datatypes}
        />
      )}
    />
  );
};
