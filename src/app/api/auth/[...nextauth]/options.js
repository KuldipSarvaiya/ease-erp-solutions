import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        let role = "customer";
        if (
          profile.email_verified &&
          profile.email === "kuldipsarvaiya100@gmail.com"
        )
          role = "admin";

        return {
          ...profile,
          role,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          type: "text",
          required: true,
          label: "Username ",
          placeholder: "@",
        },
        password: {
          label: "Password:",
          type: "password",
          required: true,
          placeholder: "Enter Password",
        },
      },
      authorize(profile) {
        let role = "manager";
        if (profile.username === "kd") role = "admin";

        return {
          name: "Kuldip Sarvaiya",
          role,
          email: "admin@gmail.com",
          image: "",
          ...profile,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
