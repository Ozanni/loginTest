import { useMemo, useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import {
  ConfigAttributeDTO,
  ConfigAttributeDTOUpdate,
} from '../../../../types/dto/configAttribute';
import { useUpdateConfigAttributeMutation } from '../../api/apiConfigAttribute';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { useDispatch } from 'react-redux';
import { UseFormProps } from 'react-hook-form';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_CONFIG_ATTRIBUTE } from '../../../../stores/table/tableInitialState';
import { ConfigAttributeFormFields } from './ConfigAttributeFormFields';
import { MyFormGroupUnstyled } from '../../../../components';

export type ConfigAttributeEditFormProps = {
  onSuccessCallback?: () => void;
  record: ConfigAttributeDTO;
};

export const ConfigAttributeEditForm = (
  props: ConfigAttributeEditFormProps
) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editConfigAttribute] = useUpdateConfigAttributeMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<ConfigAttributeDTOUpdate> = {
    mode: 'onChange',
    defaultValues: {
      id: record.id,
      name: record.name,
      datatype: record.datatype,
      datatypeConfig: '',
      description: '',
      minOccurs: 0,
      maxOccurs: 0,
    },
  };

  const onSubmit = async (formData: ConfigAttributeDTOUpdate) => {
    const submitForm: ConfigAttributeDTOUpdate = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      datatype: formData.datatype ?? '',
      datatypeConfig: formData.datatypeConfig ?? '',
      description: formData.description ?? '',
      minOccurs: formData.minOccurs ?? 0,
      maxOccurs: formData.maxOccurs ?? 0,
    };
    if (submitForm.name.length === 0 || submitForm.datatype.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editConfigAttribute(submitForm);
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
            tableId: TABLE_CONFIG_ATTRIBUTE,
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
          'submitEditForm',
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
          disableIdField={true}
          datatypes={datatypes}
        />
      )}
    />
  );
};
