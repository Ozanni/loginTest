import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { StatisticsTypeDTO } from '../../../../types/dto/statisticsType';
import { useUpdateStatisticsTypeMutation } from '../../api/apiStatisticsType';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { useDispatch } from 'react-redux';
import { UseFormProps } from 'react-hook-form';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_STATISTICS_TYPE } from '../../../../stores/table/tableInitialState';
import { MyFormGroupUnstyled } from '../../../../components';
import { StatisticsTypeFormFields } from './StatisticsTypeFormFields';

export type StatisticsTypeEditFormProps = {
  onSuccessCallback?: () => void;
  record: StatisticsTypeDTO;
};

export const StatisticsTypeEditForm = (props: StatisticsTypeEditFormProps) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editStatisticsType] = useUpdateStatisticsTypeMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<StatisticsTypeDTO> = {
    mode: 'onChange',
    defaultValues: {
      id: record.id,
      name: record.name,
      config: record.config,
      description: record.description,
      filterParams: record.filterParams,
      outputSchema: record.outputSchema,
    },
  };

  const onSubmit = async (formData: StatisticsTypeDTO) => {
    const submitForm: StatisticsTypeDTO = {
      id: formData.id ?? '',
      name: formData.name ?? '',
      config: formData.config ?? '',
      description: formData.description ?? '',
      filterParams: formData.filterParams ?? [],
      outputSchema: formData.outputSchema ?? '',
    };
    if (submitForm.name.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editStatisticsType(submitForm);
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
            tableId: TABLE_STATISTICS_TYPE,
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
        <StatisticsTypeFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={true}
        />
      )}
    />
  );
};
