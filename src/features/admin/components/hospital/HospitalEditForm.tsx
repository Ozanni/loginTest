import { useState } from 'react';
import { HospitalDTO, HospitalDTOUpdate } from '../../../../types/dto/hospital';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useUpdateHospitalMutation } from '../../api/apiHospital';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { HospitalFormFields } from './HospitalFormFields';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_HOSPITAL } from '../../../../stores/table/tableInitialState';

export type HospitalEditFormProps = {
  onSuccessCallback?: () => void;
  record: HospitalDTO;
};

export const HospitalEditForm = (props: HospitalEditFormProps) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editHospital] = useUpdateHospitalMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<HospitalDTOUpdate> = {
    mode: 'onChange',
    defaultValues: {
      id: record.id,
      name: record.name,
      description: '',
      phone: '',
      email: '',
      address: record.address,
      enabled: record.enabled,
      logo: '',
      logoFull: '',
    },
  };

  const onSubmit = async (formData: HospitalDTOUpdate) => {
    const submitForm: HospitalDTOUpdate = {
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
    if (submitForm.name.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editHospital(submitForm);
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
            tableId: TABLE_HOSPITAL,
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
        <HospitalFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={true}
        />
      )}
    />
  );
};
