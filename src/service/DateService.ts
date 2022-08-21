import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { IDateApiResponse } from "../models/IDateAPIResponse";


export const dateAPI = createApi({
    reducerPath: 'dateAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://worldtimeapi.org/api/timezone'}),
    tagTypes: ['date'],
    endpoints: (build) => ({
        fetchSeoulDate: build.query<IDateApiResponse, void>({
            query: () => ({
                url: `/Asia/Seoul`
            }),
            providesTags: result => ['date']
        })
    })
})