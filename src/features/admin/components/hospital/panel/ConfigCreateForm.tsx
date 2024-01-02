import { useMemo, useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../../providers/admin/AdminProvider';
import { useNotifySnackbar } from '../../../../../providers/NotificationProvider';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../../components/Form/MyFormGroupUnstyled';
import { ConfigFormFields } from './ConfigFormFields';
import { ConfigDTOCreate } from '../../../../../types/dto/config';
import { useCreateConfigMutation } from '../../../api/apiConfig';
import { useSelector } from 'react-redux';
import { TABLE_HOSPITAL } from '../../../../../stores/table/tableInitialState';
export const ConfigCreateForm = (props: {
  onSuccessCallback?: () => void;
}) => {
  const selectedRow = useSelector(
    (state: any) =>
        state.tableReducer.data[TABLE_HOSPITAL].selection.selectedRow
  );
  const hospitalId = selectedRow?.id;
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createConfig] = useCreateConfigMutation();
  const notifySnackbar = useNotifySnackbar();

  const onSubmit = async (formData: ConfigDTOCreate) => {
    if (
      formData.attributeID.length === 0
    )
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createConfig(formData && hospitalId);
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

  const formOptions: UseFormProps<ConfigDTOCreate> = {
    mode: 'onChange',
    defaultValues: {
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
          'submitCreateFormPanel',
          () => formInstance.submit && formInstance.submit()
        )
      }
      onSubmit={onSubmit}
      submitOnEnter={true}
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <ConfigFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={false}
          datatypes={datatypes}
        />
      )}
    />
  );
};
