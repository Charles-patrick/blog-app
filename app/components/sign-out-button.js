"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter()
  return <button onClick={() =>  (signOut,  router.push('/'))}>   Sign Out </button>;
};
