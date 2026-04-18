// import { config } from "@/lib/config";
// import { apiWrapper } from "@/modules/base/utils/api";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const employee_id = searchParams.get("employee_id");

//   if (!employee_id) {
//     return NextResponse.json(
//       { error: "Employee ID is required" },
//       { status: 400 },
//     );
//   }

//   const attendanceData = await apiWrapper({
//     endpoint: `${config.odooApiBaseUrl}/attendance/${employee_id}`,
//     method: "GET",
//     // headers: Object.fromEntries(req.headers), // important
//     requireAuth: false,
//   });

//   return NextResponse.json(attendanceData.data, {
//     // headers: Object.fromEntries(req.headers),
//     status: attendanceData.status,
//   });
// }
