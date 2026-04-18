import { useEffect, useState } from "react";
import { SessionStatus, UserInfo } from "@/modules/base/types";

export function useAuth() {
  const [userInfo, setUserInfoData] = useState<UserInfo | null>(null);
  const [status, setStatus] = useState<SessionStatus>("loading");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("userInfo");

    if (stored) {
      setUserInfoData(JSON.parse(stored));
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const update = (newData: UserInfo | null) => {
    if (typeof window === "undefined") return;

    if (newData) {
      localStorage.setItem("userInfo", JSON.stringify(newData));
      setUserInfoData(newData);
      setStatus("authenticated");
    } else {
      localStorage.removeItem("userInfo");
      setUserInfoData(null);
      setStatus("unauthenticated");
    }
  };

  return { userInfo, status, update };
}
