import { Control } from 'react-hook-form';
import { ConsumableTypeDTOCreate } from '../../../../types/dto/consumableType';
import { Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../components';

export type ConsumableTypeFormFieldsProps = {
  control: Control<ConsumableTypeDTOCreate>;
  errorMessage: string | undefined;
  disableIdField: boolean;
};

export const ConsumableTypeFormFields = (
  props: ConsumableTypeFormFieldsProps
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
          label: 'Tên loại vật tư tiêu hao',
          placeholder: 'Tên loại vật tư tiêu hao',
          fullWidth: true,
          required: true,
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
