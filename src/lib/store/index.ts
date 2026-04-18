import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { allModules } from "@/registry";

const reducers: ReducersMapObject = {};
const apis: any[] = [];

for (const m of allModules) {
  if (m.store?.reducers) {
    Object.assign(reducers, m.store.reducers);
  }
  if (m.store?.apis) {
    apis.push(...m.store.apis);
  }
}

for (const api of apis) {
  if (api && api.reducerPath && api.reducer) {
    reducers[api.reducerPath] = api.reducer;
  }
}

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    apis.length
      ? getDefaultMiddleware().concat(...apis.map((a) => a.middleware))
      : getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
