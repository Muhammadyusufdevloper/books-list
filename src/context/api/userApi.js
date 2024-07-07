import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params
      }),
      providesTags: ["User"]
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body
      }),
      invalidatesTags: ["User"]
    }),
  }),
})

export const {
  useSignInQuery,
  useRegisterUserMutation,
} = userApi