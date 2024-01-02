import { Control } from 'react-hook-form';
import { StatisticsTypeDTO } from '../../../../types/dto/statisticsType';
import { Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../components';

export type StatisticsTypeFormFieldsProps = {
  control: Control<StatisticsTypeDTO>;
  errorMessage: string | undefined;
  disableIdField: boolean;
};

export const StatisticsTypeFormFields = (
  props: StatisticsTypeFormFieldsProps
) => {
  const { control, errorMessage, disableIdField } = props;
  return (
    <Stack spacing={1} alignItems="center" width="100%">
      {errorMessage && (
        <Typography fontSize="12px" color="red">
          {errorMessage}
        </Typography>
      )}
      <MyFormTextField
        name="id"
        control={control}
        MyTextFieldProps={{
          label: 'ID',
          placeholder: 'ID',
          fullWidth: true,
          required: true,
          size: 'small',
          autoComplete: 'off',
          disabled: disableIdField,
        }}
      />
      <MyFormTextField
        name="name"
        control={control}
        MyTextFieldProps={{
          label: 'Tên loại báo cáo thống kê',
          placeholder: 'Tên loại báo cáo thống kê',
          fullWidth: true,
          required: true,
          size: 'small',
          autoComplete: 'off',
        }}
      />
      <MyFormTextField
        name="config"
        control={control}
        MyTextFieldProps={{
          label: 'Cấu hình',
          placeholder: 'Cấu hình',
          fullWidth: true,
          size: 'small',
          autoComplete: 'off',
        }}
      />
      <MyFormTextField
        name="description"
        control={control}
        MyTextFieldProps={{
          label: 'Mô tả',
          placeholder: 'Mô tả',
          fullWidth: true,
          size: 'small',
          autoComplete: 'off',
          multiline: true,
          rows: 2,
        }}
      />
    </Stack>
  );
};
