"use client";
import { signIn } from "next-auth/react";
import Button from "./Button";

export const SignInButton = () => {
  return <Button onClick={() => signIn('github')}> Sign In With Github</Button>;
};
