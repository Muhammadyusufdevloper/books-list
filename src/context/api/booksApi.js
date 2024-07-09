import { api } from './index'

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: (params) => ({
        url: '/books',
        params
      }),
      providesTags: ["Books"]
    }),
    createBooks: build.mutation({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body
      }),
      invalidatesTags: ["Books"]
    }),
    deleteBooks: build.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Books"]
    }),
    updateBooks: build.mutation({
      query: ({ id, body }) => ({
        url: `/books/${id}`,
        method: "PUT", // or "PATCH"
        body
      }),
      invalidatesTags: ["Books"]
    })
  }),
})

export const {
  useGetBooksQuery,
  useCreateBooksMutation,
  useDeleteBooksMutation,
  useUpdateBooksMutation
} = productApi