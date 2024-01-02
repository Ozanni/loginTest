import { Control } from 'react-hook-form';
import { ConfigAttributeDTOCreate } from '../../../../types/dto/configAttribute';
import { MenuItem, Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../components';
import { MyFormSelectField } from '../../../../components/Elements/Inputs/MyFormSelectField';

export type ConfigAttributeFormFieldsProps = {
  control: Control<ConfigAttributeDTOCreate>;
  errorMessage: string | undefined;
  disableIdField: boolean;
  datatypes: Array<string>;
};

export const ConfigAttributeFormFields = (
  props: ConfigAttributeFormFieldsProps
) => {
  const { control, errorMessage, disableIdField, datatypes = [] } = props;
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
          label: 'Tên thuộc tính cấu hình',
          placeholder: 'Tên thuộc tính cấu hình',
          fullWidth: true,
          required: true,
          size: 'small',
          autoComplete: 'off',
        }}
      />
      <MyFormSelectField
        name="datatype"
        control={control}
        MySelectProps={{
          label: 'Kiểu dữ liệu',
          size: 'small',
          fullWidth: true,
        }}
        required={true}
      >
        {datatypes.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </MyFormSelectField>
      <MyFormTextField
        name="datatypeConfig"
        control={control}
        MyTextFieldProps={{
          label: 'Cấu hình kiểu dữ liệu',
          placeholder: 'Cấu hình kiểu dữ liệu',
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
