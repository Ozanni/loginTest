import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseFormProps } from 'react-hook-form';
import { ConfigFormFields } from './ConfigFormFields';
import { MyFormGroupUnstyled } from '../../../../../components/Form/MyFormGroupUnstyled';
import { ConfigDTO, ConfigDTOUpdate } from '../../../../../types/dto/config';
import { TABLE_HOSPITAL, TABLE_HOSPITAL_CONFIG } from '../../../../../stores/table/tableInitialState';
import { useNotifySnackbar } from '../../../../../providers/NotificationProvider';
import { useRegisterAdminFunctions } from '../../../../../providers/admin/AdminProvider';
import { setSelectedRow } from '../../../../../stores/table/tableSlice';
import { useUpdateConfigMutation } from '../../../api/apiConfig';

export type ConfigEditFormProps = {
  onSuccessCallback?: () => void;
  record: ConfigDTO;
};

export const ConfigEditForm = (
  props: ConfigEditFormProps
) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editConfig] = useUpdateConfigMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();
  const selectedRow = useSelector(
    (state: any) =>
        state.tableReducer.data[TABLE_HOSPITAL].selection.selectedRow
  );
  const hospitalId = selectedRow?.id;

  const formOptions: UseFormProps<ConfigDTOUpdate> = {
    mode: 'onChange',
    defaultValues: {
        attributeValue: '',
        attributeID: '',
        preferred: true,
    },
  };

  const onSubmit = async (formData: ConfigDTOUpdate) => {
    if (formData.attributeValue.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editConfig(formData && hospitalId);
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
            tableId: TABLE_HOSPITAL_CONFIG,
            selectedRow: null,
          })
        );
        onSuccessCallback && onSuccessCallback();
      }
    }
  };

  const datatypes = useMemo<Array<string>>(
    () => ['STRING', 'BOOLEAN', 'INTEGER', 'FLOAT'],
    []
  );

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'submitEditFormPanel',
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
          disableIdField={true}
          datatypes={datatypes}
        />
      )}
    />
  );
};
