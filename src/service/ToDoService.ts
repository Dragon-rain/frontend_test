import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IToDo} from "../models/Itodo";


export const toDoAPI = createApi({
    reducerPath: 'toDoAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['ToDo'],
    endpoints: (build) => ({
        fetchAllToDos: build.query<IToDo[], number>({
            query: (limit: number = 5) => ({
                url: `/todos`,
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['ToDo']
        }),
        createToDo: build.mutation<IToDo, IToDo>({
            query: (todo) => ({
                url: `/todos`,
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['ToDo']
        }),
        updateToDo: build.mutation<IToDo, IToDo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['ToDo']
        }),
        deleteToDo: build.mutation<IToDo, IToDo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ToDo']
        })
    })
})