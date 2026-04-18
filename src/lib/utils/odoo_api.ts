import { config } from "@/lib/config";

interface ApiWrapperParams {
  method: "GET" | "POST" | "PUT" | "DELETE";
  cookie?: string;
  body?: any;
  model: string;
  odoo_method: "search_read" | "create" | "write";
  args?: any[];
  context?: Record<string, any>;
  fields?: string[];
  limit?: number;
  order?: string;
}

export async function OdooApiCall({
  method,
  cookie,
  model,
  odoo_method,
  args = [],
  context = {},
  fields,
  limit,
  order,
}: ApiWrapperParams) {
  try {
    const response = await fetch(`${config.odooBaseUrl}/web/dataset/call_kw`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie || "",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          model,
          method: odoo_method,
          args,
          kwargs: {
            fields,
            limit,
            order,
          },
          context,
        },
        id: new Date().getTime(),
      }),
    });
    const data = await response.json();

    if (data?.error) {
      return {
        status: 500,
        data: { error: data?.error.data.message },
      };
    }

    return { status: data.status, data: data.result };
  } catch (err: any) {
    return { status: 500, data: { error: "Failed to connect to Odoo API" } };
  }
}
