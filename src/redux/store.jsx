import { configureStore } from '@reduxjs/toolkit'
import loginUserReducer from '../features/loginUserSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'userlogin',
    storage,
  }
  
const userLoginReducer = persistReducer(persistConfig, loginUserReducer)

export const store = configureStore({
    reducer: {
        loginUser: userLoginReducer
    }
});

export const persistor = persistStore(store)

export default store;