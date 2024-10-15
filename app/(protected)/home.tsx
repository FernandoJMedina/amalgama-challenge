import { Text, View } from 'react-native';

import { useSession } from '~/context/auth';

export default function Home() {
  const { signOut } = useSession();
  return (
    <View className="flex-1 items-center justify-center">
      <Text onPress={signOut}>Sign Out</Text>
    </View>
  );
}
