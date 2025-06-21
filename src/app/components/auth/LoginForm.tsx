"use client";

import { signInCredentials } from "@/action/signInCredentials";
import React, { useActionState } from "react";

const LoginForm = () => {
  const [state, formActions] = useActionState(signInCredentials, null);
  return (
    
    <form className="space-y-4" action={formActions}>
      {state?.messages ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span>{state?.messages}</span>
        </div>
      ) : null}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Email
        </label>
        <input
          name="email"
          type="text"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#08B786] text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#08B786] text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>
      <a href="/register">tidak punya akun?</a>
      <button
        type="submit"
        className="cursor-pointer w-full bg-[#08B786] text-white py-2 rounded-lg hover:bg-[#08B786] transition-colors"
      >
        Login
      </button>
    </form>
    
    
  );
};

export default LoginForm;
