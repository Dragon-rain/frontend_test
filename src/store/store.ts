import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { dateAPI } from "../service/DateService";
import { toDoAPI } from "../service/ToDoService";

const rootReducer = combineReducers({
    [toDoAPI.reducerPath]: toDoAPI.reducer,
    [dateAPI.reducerPath]: dateAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([toDoAPI.middleware, dateAPI.middleware])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']