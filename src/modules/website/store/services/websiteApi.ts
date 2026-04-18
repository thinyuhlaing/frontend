// import { createApi } from "@reduxjs/toolkit/query/react";
// import {
//   Attendance,
//   CheckInOut,
// } from "@/modules/hr_attendance/types/attendance";
// import { config } from "@/lib/config";
// import { createBaseQueryWithReauth } from "@/modules/base/utils/api";

// const baseQueryWithReauth = createBaseQueryWithReauth(
//   `${config.appApiBaseUrl}/attendance`,
// );

// export const attendanceApi = createApi({
//   reducerPath: "attendanceApi",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["Attendance"],
//   endpoints: (builder) => ({
//     getAttendances: builder.query<
//       { result: Attendance[]; upcoming_check_in_state: boolean },
//       number
//     >({
//       query: (employee_id) => `?employee_id=${employee_id}`,

//       providesTags: (result, error, employee_id) => [
//         { type: "Attendance", id: employee_id },
//       ],
//       extraOptions: { skipAuth: true },
//     }),

//     attendanceToggle: builder.mutation<CheckInOut, any>({
//       query: ({ employee_id, ...payload }) => ({
//         url: `/toggle?employee_id=${employee_id}`,
//         method: "POST",
//         body: payload,
//       }),
//       invalidatesTags: (result, error, { employee_id }) => [
//         { type: "Attendance", id: employee_id },
//       ],
//     }),
//   }),
// });

// export const { useGetAttendancesQuery, useAttendanceToggleMutation } =
//   attendanceApi;

// // providesTags (Query → “I own this data”)
// // invalidatesTags (Mutation → “This data changed”)
// // invalidatesTags → refetches the whole query

// // if invalidatesTags === providesTags fetch data

// // Dynamic (id: employee_id)	Only queries for that employee_id	Nothing
// // Static (id: "attendance")	All queries using "attendance"
