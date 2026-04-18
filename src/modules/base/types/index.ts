export interface UserInfo {
  uid: number;
  name: string;
  email: string;
  is_system: boolean;
  is_admin: boolean;
  is_public: boolean;
  is_internal_user: boolean;
}

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";
