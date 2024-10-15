import { useForm } from 'react-hook-form';
import { Alert, Platform } from 'react-native';

import { LoginRqTO } from '../api/models/login';
import { useLogin } from '../api/queries/useLogin';

import { AppInput, AppButton } from '~/common/components';
import { useSession } from '~/context/auth';

export function LoginForm() {
  const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRqTO>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const login = useLogin();
  const onSubmit = (data: LoginRqTO) =>
    login.mutate(data, {
      onSuccess: (res) => {
        signIn(res);
      },
      onError: (err) => {
        if (Platform.OS === 'web') {
          alert(`Ops something went wrong: ${err.message}`);
        } else {
          Alert.alert('Ops something went wrong', err.message);
        }
      },
    });

  return (
    <>
      <AppInput name="email" errors={errors} control={control} />
      <AppInput name="password" errors={errors} control={control} secure />
      <AppButton title="Sign in" onPress={handleSubmit(onSubmit)} disabled={login.isPending} />
    </>
  );
}
