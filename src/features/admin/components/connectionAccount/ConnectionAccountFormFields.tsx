import { Control } from 'react-hook-form';
import { ConnectionAccountDTOFormCreate } from '../../../../types/dto/connectionAccount';
import { MenuItem, Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../components';
import { MyFormSelectField } from '../../../../components/Elements/Inputs/MyFormSelectField';
import { HospitalDTO } from '../../../../types/dto/hospital';

export type ConnectionAccountFormFieldsProps = {
  control: Control<ConnectionAccountDTOFormCreate>;
  errorMessage: string | undefined;
  disableIdField: boolean;
  types?: Array<string>;
  authorities?: Array<string>;
  hospitals?: HospitalDTO[];
};

export const ConnectionAccountFormFields = (
  props: ConnectionAccountFormFieldsProps
) => {
  const {
    control,
    errorMessage,
    disableIdField,
    types = [],
    authorities = [],
    hospitals = [],
  } = props;
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
        name="secret"
        control={control}
        MyTextFieldProps={{
          label: 'Secret',
          placeholder: 'Secret',
          fullWidth: true,
          required: true,
          size: 'small',
          autoComplete: 'off',
        }}
      />
      <MyFormSelectField
        name="type"
        control={control}
        MySelectProps={{
          label: 'Tài khoản',
          size: 'small',
          fullWidth: true,
        }}
        required={true}
      >
        {types.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </MyFormSelectField>
      <MyFormSelectField
        name="authorities"
        control={control}
        MySelectProps={{
          label: 'Quyền',
          size: 'small',
          fullWidth: true,
          multiple: true,
        }}
        required={true}
      >
        {authorities.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </MyFormSelectField>
      <MyFormTextField
        name="ipAllowed"
        control={control}
        MyTextFieldProps={{
          label: 'Địa chỉ IP',
          placeholder: 'Địa chỉ IP',
          fullWidth: true,
          size: 'small',
          autoComplete: 'off',
        }}
      />
      <MyFormSelectField
        name="hospitalID"
        control={control}
        MySelectProps={{
          label: 'Hospital ID',
          size: 'small',
          fullWidth: true,
          disabled: hospitals.length === 0,
        }}
      >
        {hospitals.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.id}
          </MenuItem>
        ))}
      </MyFormSelectField>
    </Stack>
  );
};
