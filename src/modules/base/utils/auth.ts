import { config } from "@/lib/config";

export async function login(payload: any) {
  const res = await fetch("/api/base/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  if (data?.error) {
    throw new Error(data?.error?.data?.message || "Login failed");
  }
  if (data) {
    const userInfo = {
      uid: data.result.uid,
      name: data.result.name,
      email: data.result.username,
      is_system: data.result.is_system,
      is_admin: data.result.is_admin,
      is_public: data.result.is_public,
      is_internal_user: data.result.is_internal_user,
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    if (data.result.is_internal_user) {
      window.location.href = "/admin";
    } else if (!data.result.is_internal_user) {
      window.location.href = "/my";
    }
  }

  return data;
}

export async function logout() {
  const res = await fetch("/api/base/auth/logout", { method: "POST" });
  const data = await res.json();

  if (data.success) {
    window.location.href = "/auth/login";
  }
  localStorage.removeItem("userInfo");
}
