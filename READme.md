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

Given the requirements I asume that you want to save the data in the browser meaning that you should use local or session storage in web.

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
          if (query.queryKey[0] === 'users' || query.queryKey[0] === 'books') {
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

For example:

```js
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

function getItem<T>(key: string): T | null {
 const value = storage.getString(key);
 return value ? JSON.parse(value) : null;
}

function setItem<T>(key: string, value: T): void {
 storage.set(key, JSON.stringify(value));
}

function removeItem(key: string): void {
 storage.delete(key);
}

function clearAll(): void {
 storage.clearAll();
}

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
 atomWithStorage<T>(
   key,
   initialValue,
   createJSONStorage<T>(() => ({
     getItem,
     setItem,
     removeItem,
     clearAll,
   })),
 );
```

And then create your custom hook

```js
import { useAtom } from 'jotai';
import { atomWithMMKV } from 'atoms/utils/atomWithMMKV';

type BooksResponse = {
 // ... shape of response
}

const booksResponse = atomWithMMKV<BooksResponse | null>(
  'books-response',
  null,
);

export function useBooks() {
  return useAtom(booksResponse);
}

function Component() {
  const [books, setBooks] = useBooks()
  // ...
}
```

This is a very staight forward way to persist data globally.

# About exercise 1 (Components)

- First of all find out what is the shape of the data you want to handle and compare with the second screen (profile)
- In web I would separate the navigation in a global layout to share the navbar between the screens by creating a component which handle this.
- Create a generic component that shares the same data and layout and pass it through props the data you want to share, abstract this one and use it for the iteration.
- If the data its too expensive, analyze the posibility to memoize the data a with useMemo, and memoize the component with memo()

I couldn't keep up with the given time, hope this knowledge it's enough for you guys, hope you are well whoever is reading this.

Regards!
