"use client";
import { signOut } from "next-auth/react";

export const SignOutButton = ({ className = "", style = {}, children = "Sign Out" }) => {
  return (
    <button
      className={className}
      style={style}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      {children}
    </button>
  );
};