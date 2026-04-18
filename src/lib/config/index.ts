interface Config {
  appApiBaseUrl: string;
  // odooApiBaseUrl: string;
  odooBaseUrl: string;
  odooDB: string;
}

export const config: Config = {
  appApiBaseUrl: process.env.NEXT_PUBLIC_APP_API_BASE_URL || "",
  // odooApiBaseUrl: process.env.ODOO_API_BASE_URL || "",
  odooBaseUrl: process.env.ODOO_BASE_URL || "",
  odooDB: process.env.ODOO_DB || "",
};
