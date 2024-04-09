// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from "redux-persist/lib/storage";
// import { thunk } from "redux-thunk";
// import LoginSlice from "./redux-slice/LoginSlice";

// const persistConfig = {
//     key: 'root',
//     storage:storage ,
// };

// const reducer = combineReducers({
//     LoginSlice
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

//  const store = configureStore({
//     reducer: persistedReducer,
//     devTools: process.env.NODE_ENV !== 'production',
//     middleware: () => [thunk]
// });


// const persistor = persistStore(store);
// export { store, persistor };


import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./redux-slice/LoginSlice";


const store = configureStore({
reducer:{
    login:LoginSlice
}
})
export default store