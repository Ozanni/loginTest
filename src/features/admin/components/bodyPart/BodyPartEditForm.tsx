import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { BodyPartDTO, BodyPartDTOUpdate } from '../../../../types/dto/bodyPart';
import { useUpdateBodyPartMutation } from '../../api/apiBodyPart';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { BodyPartFormFields } from './BodyPartFormFields';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_BODY_PART } from '../../../../stores/table/tableInitialState';

export type BodyPartEditFormProps = {
  onSuccessCallback?: () => void;
  record: BodyPartDTO;
};

export function BodyPartEditForm(props: BodyPartEditFormProps) {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editBodyPart] = useUpdateBodyPartMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<BodyPartDTOUpdate> = {
    mode: 'onChange',
    defaultValues: {
      id: record.id,
      name: record.name,
      description: '',
    },
  };

  const onSubmit = async (formData: BodyPartDTOUpdate) => {
    const submitForm: BodyPartDTOUpdate = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      description: formData.description ?? '',
    };
    if (submitForm.name.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editBodyPart(submitForm);
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
            tableId: TABLE_BODY_PART,
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
      submitOnEnter
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <BodyPartFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={true}
        />
      )}
    />
  );
}
