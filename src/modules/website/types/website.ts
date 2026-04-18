import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type Attendance = {
  id: number;
  employee_id: number;
  check_in: string;
  check_out: string | null;
  worked_hours: number;
};

export type CheckInOut = {
  employee_id: number;
  mode: "kiosk";
  browser: string;
  country_name: string;
  latitude: string;
  longitude: string;
  ip_address: string;
};

export interface NestedMenu {
  label: string;
  href: string;
}

export interface subMenu {
  label: string;
  href: string;
  icon?: IconDefinition;
  nestedMenu?: NestedMenu[];
}

export interface MainMenu {
  label: string;
  href: string;
  icon?: IconDefinition;
  subMenu: subMenu[];
}
