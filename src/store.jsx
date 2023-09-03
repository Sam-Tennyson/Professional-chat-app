import RootReducer from './redux/Reducer/RootReducer'
import { compose, createStore } from 'redux'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["auth"],
};

const composeEnhancers = (process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const persistedReducer = persistReducer(rootPersistConfig, RootReducer);
const store = createStore(persistedReducer, composeEnhancers())
const persistor = persistStore(store)

export const PERSIST_STORE = {store, persistor}