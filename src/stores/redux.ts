import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tableReducer } from "./table/tableSlice";
import { api, loginApi } from "../lib/api";
import { authReducer } from "./auth/authSlide";
import { PERSIST, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from "./persist";
import { layoutReducer } from "./layoutSlice";

const rootReducers = combineReducers({
    ["auth"]: authReducer,
    tableReducer: tableReducer,
    [api.reducerPath]: api.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    ['layoutConstants']: layoutReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    REHYDRATE,
                    PERSIST,
                    'admin/executeQuery/fulfilled',
                  ],
            }
        })
        .concat(api.middleware, loginApi.middleware)
})

export let persistor = persistStore(store);
export const initializePersistor = () => {
    persistor = persistStore(store);
    return persistor;
};

export type RootState = ReturnType<typeof rootReducers>;
// export type AppDispatch = typeof store.dispatch;
// export let persistor = persistS