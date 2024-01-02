import { Control } from 'react-hook-form';
import { ModalityTypeNameDTOCreate } from '../../../../types/dto/modalityTypeName';
import { Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../components';

export type ModalityTypeNameFormFieldsProps = {
  control: Control<ModalityTypeNameDTOCreate>;
  errorMessage: string | undefined;
  disableIdField: boolean;
};

export const ModalityTypeNameFormFields = (
  props: ModalityTypeNameFormFieldsProps
) => {
  const { control, errorMessage, disableIdField } = props;
  return (
    <Stack spacing={1} alignItems={'center'} width="100%">
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
          label: 'Tên loại ca',
          placeholder: 'Tên loại ca',
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
