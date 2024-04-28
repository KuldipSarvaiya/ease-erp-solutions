import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import Employee from "@/lib/models/employee.model";

export async function POST(request) {
  const data = await request.json();

  try {
    const empsEmail = await Employee.aggregate([
      {
        $project: {
          email: 1,
          _id: 0,
        },
      },
    ]);
    const emails = empsEmail.map((emp) => emp.email);
    const event_formalities = data.formalities
      .map((item, i) => `<p>${item}</p>`)
      .join(" ");
    console.log(event_formalities);

    // generating access token cause it has expiry
    const OAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const ACCESS_TOKEN = await OAuth2Client.getAccessToken();

    console.log("\n*******One time email api Access Token = ", ACCESS_TOKEN);

    const Transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
    });

    const mailResult = await Transporter.sendMail({
      from: `Ease ERP Solutions <${process.env.MAIL_USER}>`,
      to: emails,
      subject: data.subject,
      text: data.title,
      html: `<body>
      <h1 style="color: #6f42c1; font-family: sans-serif;">You're Invited!</h1>
      <h2 style="color: #6f42c1; font-family: sans-serif;">${data.title}</h2>
      <p>We're thrilled to invite you to This Organizational Event.</p>      
      <h3>Event Timing :</h3>
      <ul>
        <li> On ${new Date(data.date).toDateString()} <br> From ${
        data.start_time
      } To ${data.end_time} </li>
      </ul>      
      <div style="background-color: #f5f2fd; padding: 10px; border: 1px solid #e0dddd; border-radius: 5px; margin: 10px 0;">
        <h3>Event Details:</h3>
        <p>${data.details}</p>
      </div>
      <div style="background-color: #eeeef2; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin: 10px 0;">
        <h3>Event Formalities :</h3>
        ${event_formalities}
      </div>
      <p>We look forward to celebrating with you!</p>
      <p>Sincerely,</p>
      <p>HR, Ease ERP Solutions</p>
      </body>`,
    });

    console.log(mailResult);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Send Email", error: error },
      { status: 500 }
    );
  }
}
