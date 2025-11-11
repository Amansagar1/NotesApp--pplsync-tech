"use client";
import React from "react";

import Field from "@/components/forms/Field";
import FormActions from "@/components/forms/FormActions";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-2 text-xs text-slate-400">
        Home <span className="px-1">/</span> Sign up
      </div>

      <main className="mx-auto grid max-w-6xl place-items-center px-4 py-10">
        <div className="w-full max-w-md">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h1 className="mb-6 text-center text-xl font-semibold tracking-tight">
              Create your account
            </h1>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <Field
                label="Username"
                name="username"
                placeholder="example_user"
              />
              <Field
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
              />
              <Field
                label="Password"
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <Field
                label="Confirm password"
                type="password"
                name="confirm"
                placeholder="Re-enter password"
              />

              <FormActions
                primaryLabel="Sign up"
                secondaryHref="/auth/login"
                secondaryLabel="Login"
              />
            </form>

            <div className="mt-6 text-center text-sm text-slate-300">
              Already registered?{" "}
              <a
                href="/auth/login"
                className="font-medium text-emerald-400 underline-offset-2 hover:underline"
              >
                Log in
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
