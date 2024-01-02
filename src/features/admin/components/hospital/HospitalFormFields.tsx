import { Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../components';
import { MyFormCheckboxField } from '../../../../components/Elements/Inputs/MyFormCheckboxField';
import { Control } from 'react-hook-form';
import { HospitalDTOCreate } from '../../../../types/dto/hospital';
import ImageUploader from '../../../../components/Buttons/ImageUploader';

export type HospitalFormFieldsProps = {
  control: Control<HospitalDTOCreate>;
  errorMessage: string | undefined;
  disableIdField: boolean;
};

export const HospitalFormFields = (props: HospitalFormFieldsProps) => {
  const { control, errorMessage, disableIdField } = props;
  return (
    <Stack spacing={1} alignItems="center" width="100%">
      {errorMessage && (
        <Typography fontSize="12px" color="red">
          {errorMessage}
        </Typography>
      )}
      <Stack spacing={1} alignItems="center" width="100%">
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
            label: 'Tên bệnh viện',
            placeholder: 'Tên bệnh viện',
            fullWidth: true,
            required: true,
            size: 'small',
            autoComplete: 'off',
          }}
        />

        <MyFormTextField
          name="phone"
          control={control}
          MyTextFieldProps={{
            type: 'tel',
            label: 'Số điện thoại',
            placeholder: 'Số điện thoại',
            fullWidth: true,
            size: 'small',
            autoComplete: 'off',
          }}
        />
        <MyFormTextField
          name="email"
          control={control}
          MyTextFieldProps={{
            label: 'Địa chỉ email',
            placeholder: 'Địa chỉ email',
            fullWidth: true,
            size: 'small',
            autoComplete: 'off',
          }}
        />
        <MyFormTextField
          name="address"
          control={control}
          MyTextFieldProps={{
            label: 'Địa chỉ',
            placeholder: 'Địa chỉ',
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
        <ImageUploader />
        <Stack spacing={1} direction="row" alignItems="center" width="100%">
          <MyFormCheckboxField
            name="enabled"
            control={control}
            MyCheckboxProps={{
              size: 'small',
              color: 'success',
              sx: {
                '&.Mui-checked': {
                  color: '#0e8a72',
                },
              },
            }}
          />
          <Typography>Ưu tiên</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
