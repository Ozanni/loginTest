import { Control } from 'react-hook-form';
import { Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../../components/Elements/Inputs/MyFormTextField';
import { ConfigDTOCreate } from '../../../../../types/dto/config';

export type ConfigFormFieldsProps = {
  control: Control<ConfigDTOCreate>;
  errorMessage: string | undefined;
  disableIdField: boolean;
  datatypes: Array<string>;
};

export const ConfigFormFields = (
  props: ConfigFormFieldsProps
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
        name="attributeID"
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
        name="attributeValue"
        control={control}
        MyTextFieldProps={{
          label: 'Tên loại thuộc tính',
          placeholder: 'Tên loại thuộc tính',
          fullWidth: true,
          required: true,
          size: 'small',
          autoComplete: 'off',
        }}
      />
    </Stack>
  );
};
