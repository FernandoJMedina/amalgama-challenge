import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TextInput, Text } from 'react-native';

import { LoginRqTO } from '~/modules/login/api/models/login';

type AppInputProps = {
  control: Control<LoginRqTO>;
  name: keyof LoginRqTO;
  errors: FieldErrors<LoginRqTO>;
  secure?: boolean;
};

export function AppInput({ control, name, errors, secure }: AppInputProps) {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={name}
            className="w-full max-w-[300px] bg-white p-4"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={secure}
            value={value}
          />
        )}
        name={name}
      />
      {errors.email && <Text>This is required.</Text>}
    </>
  );
}
