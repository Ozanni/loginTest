import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import {
  ModalityTypeNameDTO,
  ModalityTypeNameDTOUpdate,
} from '../../../../types/dto/modalityTypeName';
import { useUpdateModalityTypeNameMutation } from '../../api/apiModalityTypeName';
import { UseFormProps } from 'react-hook-form';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { MyFormGroupUnstyled } from '../../../../components';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_MODALITY_TYPE_NAME } from '../../../../stores/table/tableInitialState';
import { ModalityTypeNameFormFields } from './ModalityTypeNameFormFields';

export type ModalityTypeNameEditFormProps = {
  onSuccessCallback?: () => void;
  record: ModalityTypeNameDTO;
};

export const ModalityTypeNameEditForm = (
  props: ModalityTypeNameEditFormProps
) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editModalityTypeName] = useUpdateModalityTypeNameMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<ModalityTypeNameDTOUpdate> = {
    mode: 'onChange',
    defaultValues: {
      id: record.id,
      name: record.name,
      description: '',
    },
  };

  const onSubmit = async (formData: ModalityTypeNameDTOUpdate) => {
    const submitForm: ModalityTypeNameDTOUpdate = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      description: formData.description ?? '',
    };
    if (submitForm.name.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editModalityTypeName(submitForm);
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
            tableId: TABLE_MODALITY_TYPE_NAME,
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
        <ModalityTypeNameFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={true}
        />
      )}
    />
  );
};
