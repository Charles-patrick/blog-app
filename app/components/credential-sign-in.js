"use client";
import { signIn } from "next-auth/react"; // Changed import source
import { useState } from "react";
import { useRouter } from "next/navigation"; // Added for redirect
import Button from "./Button";
import Input from "./Input";


export function CredentialsSignIn() {
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize router

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); // Reset previous errors
    
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("formdata is ", password )
    if (!email || !password) {
        setError("Both fields are required");
        return;
    }
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Must set to false to handle manually
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/"); // Redirect on success
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ borderTop: "1px solid var(--border-line)" }}>
        <div className="w-full max-w-sm pt-3">
            <div>
              <label className='w-full' htmlFor="email">Email</label>
              <Input className='w-full'name="email" placeholder="email" type="email" required /> 
            </div>
            <div>
              <label className='w-full' htmlFor="password">Password</label>
              <Input  className='w-full' name="password" placeholder="password" type="password" required /> 
            </div>
            <Button type="submit">Sign In</Button>
         </div>
        {error && <p style={{ color: "red" }}>{error}</p>} 
      </form>
      
      
    </>
    
  );
}