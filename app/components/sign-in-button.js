"use client";
import { signIn } from "next-auth/react";
import Button from "./Button";

export const SignInButton = () => {
  return <Button onClick={() => signIn('github')} className="inline-flex items-center">
    Sign In With Github
    </Button>;
};
