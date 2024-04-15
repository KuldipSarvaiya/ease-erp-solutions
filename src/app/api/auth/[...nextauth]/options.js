import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";
import Customer from "@/lib/models/customer.model";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        await connectDB();

        let customer = await Customer.findOne({ email: profile.email });
        console.log("\n**** old Custommer = ", customer);

        if (!customer) {
          customer = await Customer.insertMany([
            {
              name: profile?.name,
              image: profile?.picture,
              email: profile?.email,
              address: "",
              address_coordinates: {
                latitude: 0,
                longitude: 0,
              },
            },
          ]);
          customer = customer[0]._doc;
          console.log("\n**** new Custommer = ", customer);
        }

        return {
          id: profile.sub,
          ...profile,
          ...customer,
          role: "customer",
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          type: "text",
          required: true,
          label: "Username ",
          name: "username",
          // placeholder: "Enter Username",
          style: {
            outline: "none",
            margin: "10px auto 30px",
            height: "50px",
            border: "2px solid #cbd5e1",
            borderBottom: "8px double #cbd5e1",
            paddig: "3px",
            color: "#cbd5e1",
            fontSize: "20px",
            backgroundColor: "#0c0a09",
          },
        },
        password: {
          label: "Password ",
          type: "password",
          name: "password",
          required: true,
          // placeholder: "Enter Password",
          style: {
            outline: "none",
            margin: "10px auto 30px",
            height: "50px",
            border: "2px solid #cbd5e1",
            borderBottom: "8px double #cbd5e1",
            paddig: "3px",
            color: "#cbd5e1",
            fontSize: "20px",
            backgroundColor: "#0c0a09",
          },
        },
      },
      async authorize(profile) {
        // let role = "manager";
        // if (profile.username === "kd") role = "admin";
        try {
          await connectDB();

          const emp = await Employee.findOne({
            username: profile.username,
            password: profile.password,
            is_ex_employee: false,
          })
            .select(
              "first_name _id middle_name last_name designation image email department_id"
            )
            .populate([
              {
                path: "department_id",
                select: "dept_name _id",
              },
            ]);
          console.log("\n*********from credential next auth = \t", {
            ...profile,
            ...emp._doc,
          });

          return {
            ...profile,
            ...emp?._doc,
          };
        } catch (error) {
          console.log(error);
          throw error.message;
          // return new Error(error)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userData = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userData) {
        session.user = token.userData;
      }
      return session;
    },
  },
};

// callbacks: {
//   async jwt({ token, user }) {
//     if (user) token.designation = user.designation;
//     return token;
//   },
//   async session({ session, token }) {
//     if (session?.user) session.user.designation = token.designation;
//     return session;
//   },
// },
