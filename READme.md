# These are instructions for part 3 of the challenge.

## If you want to run this proyect make sure you have installed propperly android studio and xcode, then install dependencies.

```
yarn
```

## Run simulators

```
yarn ios | yarn android
```

## or if you want also you can run it in web

```
yarn web
```

# About exercise 2 (State).

Given the requirements I asume that you want to save the data in the browser meaning that you should user local or session storage in web.

In the side of mobile you can use AsyncStorage or Expo-Secure-Store for sensitive data, also you could use SQLite or Realm or other third party databases.

My preference of choice is to handle the less state posible in the app, focusing on trying to detach between local state, global state and server state.

I love react query, I use this library since v3: its an async server state manager that allows you to handle data smoothly.

I recall that this have a feature that allows you to persist the fetched data in a very simple way.

For example, if you only wanted to persist queries that had a specific key, you could do something like this:

```js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const Root = () => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister: asyncStoragePersister,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => {
          if (query.queryKey[0] === 'posts') {
            return true;
          }

          return false;
        },
      },
    }}>
    <App />
  </PersistQueryClientProvider>
);

export default Root;
```

- In the case of synchronus data, i prefer to use jotai with MMKV (a x10 times faster than async storage).
  Jotai uses the atom pattern that its pretty much like use useState but globally.
