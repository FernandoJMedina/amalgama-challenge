import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native';

import { useSession } from '~/context/auth';
import { LoginForm } from '~/modules/login/components/login-form';

export default function Login() {
  const { session } = useSession();

  if (session) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="m-4 flex-1 items-center justify-center gap-4">
      <LoginForm />
    </SafeAreaView>
  );
}
