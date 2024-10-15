import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SessionProvider } from '~/context/auth';
import '../global.css';

const client = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={client}>
      <SessionProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
