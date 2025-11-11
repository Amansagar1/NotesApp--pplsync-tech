"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SessionGuard() {
  const router = useRouter();
  const path = usePathname();

  const check = () => {
    const raw = document.cookie || "";
    const items = raw.split(";").map(v => v.trim());
    const ok = items.some(v => v.startsWith("session_token="));
    const auth = path.startsWith("/auth");

    if (!ok && !auth) router.push("/auth/login");
    if (ok && auth) router.push("/");
  };

  useEffect(() => {
    check();
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, [path]);

  return null;
}
