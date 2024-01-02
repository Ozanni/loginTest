import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useCreateDomainMutation } from '../../api/apiDomain';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { DomainDTOCreate } from '../../../../types/dto/domain';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { DomainFormFields } from './DomainFormFields';
import { useGetHospitalListQuery } from '../../api/apiHospital';
import { useSelector } from 'react-redux';
import { TABLE_HOSPITAL } from '../../../../stores/table/tableInitialState';
import { skipToken } from '@reduxjs/toolkit/query';

export const DomainCreateForm = (props: { onSuccessCallback?: () => void }) => {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createDomain] = useCreateDomainMutation();
  const notifySnackbar = useNotifySnackbar();

  const query = useSelector(
    (state: any) => state.tableReducer.data[TABLE_HOSPITAL].query
  );
  const { data } = useGetHospitalListQuery(query || skipToken);

  const onSubmit = async (formData: DomainDTOCreate) => {
    const submitForm: DomainDTOCreate = {
      id: formData.id ?? '',
      hospitalID: formData.hospitalID ?? '',
      publicAddress: formData.publicAddress ?? true,
    };
    if (submitForm.id.length === 0 || submitForm.hospitalID.length === 0)
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createDomain(submitForm);
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

  const formOptions: UseFormProps<DomainDTOCreate> = {
    mode: 'onChange',
    defaultValues: {
      id: '',
      hospitalID: '',
      publicAddress: true,
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
        <DomainFormFields
          control={control}
          errorMessage={errorMessage}
          hospitals={data?.list}
        />
      )}
    />
  );
};
