import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { IncomingHttpHeaders } from "http2";
import { config } from "@/lib/config";

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";
type PublicRequest = {
  requireAuth: false;
  headers?: never;
};

type PrivateRequest = {
  requireAuth?: true;
  headers: IncomingHttpHeaders;
};

type ApiWrapperParams = {
  method: ApiMethod;
  body?: any;
  endpoint: string;
} & (PublicRequest | PrivateRequest);

type BaseQueryExtraOptions = {
  skipAuth?: boolean; // for public endpoints
};

let refreshPromise: Promise<boolean> | null = null;

async function apiWrapper({
  endpoint,
  method,
  headers,
  body,
  requireAuth = true,
}: ApiWrapperParams) {
  let token: string | undefined;

  if (requireAuth) {
    const authHeader = headers?.authorization;
    token = authHeader?.split(" ")[1];

    if (!token) {
      return { status: 401, data: { error: "Access token is required" } };
    }
  }

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    // console.log("response_test", response);

    if (!response.ok) {
      return {
        status: response.status,
        data: { error: data?.error || "Odoo authentication failed" },
      };
    }

    // console.log("response stats", response.status);
    // console.lconsole.logog("response data", data);
    return { status: response.status, data: data };
  } catch (err: any) {
    console.error(err);
    return { status: 500, data: { error: err.message || "Server error" } };
  }
}

async function verifyAccess() {
  const accessToken = localStorage.getItem("access_token");
  const accessExpiresAt = localStorage.getItem("access_expires_at");

  const isLoginPage = window.location.pathname === "/auth/login";

  // ❌ No token at all
  if (!accessToken || !accessExpiresAt) {
    if (!isLoginPage) {
      window.location.href = "/auth/login";
    }
    return;
  }

  const now = new Date();
  const expires = new Date(accessExpiresAt + "Z");

  // console.log(
  //   "Access token expires at:",
  //   now >= expires ? "expired" : "valid",
  //   now,
  //   expires
  // );

  if (now >= expires) {
    console.warn("Access token expired");
    const refreshed = await refreshAccessToken();

    if (!refreshed) {
      // ❌ Refresh failed → logout
      logout();
      return;
    }
  }
}

async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      logout();
      return false;
    }

    const res = await fetch(`${config.appApiBaseUrl}/auth/employee/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      logout();
      return false;
    }

    const result = await res.json();

    localStorage.setItem("access_token", result.access_token);
    localStorage.setItem("refresh_token", result.refresh_token);
    localStorage.setItem("access_expires_at", result.access_expires_at);

    return true;
  })();

  const success = await refreshPromise;
  refreshPromise = null;
  return success;
}

async function logout() {
  window.location.href = "/auth/login";
}

const createBaseQueryWithReauth = (baseUrl: string) => {
  // 🔹 Normal base query
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { extra }) => {
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
      }
      return headers;
    },
  });

  // 🔹 Base query with auto re-auth
  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    BaseQueryExtraOptions
  > = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (
      result.error &&
      result.error.status === 401 &&
      !extraOptions?.skipAuth
    ) {
      console.warn("Data Fetch: Access token expired. ");
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  };

  return baseQueryWithReauth;
};

export { apiWrapper, createBaseQueryWithReauth, verifyAccess };
