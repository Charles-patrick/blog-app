import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from 'next-auth/providers/credentials'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
   GitHub ,
   Credentials({
      Credentials: {
         email: {} , 
         password: {},
      },
      authorize : async (credentials) => {
         const email = "chukwuebuka.o@kadickintegrated.com" 
         const password = "1234"
         const username = "chukwuebuka"
         if ( 
            credentials.email === email && 
            credentials.password == password) { 
            return { email , password , username }
         } else {
            throw new error("Invalid Credentails")
         }
      }
   })
  ]
});
