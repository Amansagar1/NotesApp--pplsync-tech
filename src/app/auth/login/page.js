"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Field from "../../../components/forms/Field";
import FormActions from "../../../components/forms/FormActions";
import { loginApi } from "../../../Web/ApiControllers";

export default function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const router = useRouter();

  const update = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const out = await loginApi(data);
      document.cookie = `session_token=${out.token}; path=/; samesite=lax`;
      router.push("/");
    } catch (err) {
      alert(err?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <main className="mx-auto grid max-w-6xl place-items-center px-4 py-10">
        <div className="w-full max-w-md">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow">
            <h1 className="mb-6 text-center text-xl font-semibold tracking-tight">
              Log in to your account
            </h1>

            <form onSubmit={submit} className="space-y-4">
              <Field
                label="Email address"
                type="email"
                name="email"
                placeholder="admin@gmail.com"
                onChange={update}
              />
              <Field
                label="Password"
                type="password"
                name="password"
                placeholder="admin"
                onChange={update}
              />

              <FormActions
                primaryLabel="Login"
                secondaryHref="/auth/signup"
                secondaryLabel="Create account"
              />
            </form>

            <p className="mt-6 text-center text-sm text-slate-300">
              Need an account?{" "}
              <a
                href="/auth/signup"
                className="font-medium text-emerald-400 underline-offset-2 hover:underline"
              >
                Sign up
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
