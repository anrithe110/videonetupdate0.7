import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/libs/auth";
import { NextResponse } from "next/server";
import { sendMail, randomCode } from "./verificatione";
import Orders from "@/models/Orders";
const generatedCode = await randomCode();
export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, password, code } = await req.json();
    if (!email.includes("@")) {
      throw new Error("Invalid email address.");
    }
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists.");
    }
    if (email && !code && !password) {
      const mailSent = await sendMail(email, generatedCode);
      if (!mailSent) {
        throw new Error("Error sending verification code.");
      }
      return NextResponse.json({ message: "Code sent" }, { status: 200 });
    }

    if (!email || !password || password.length <= 7) {
      throw new Error(
        "Invalid input: Email and password are required, and password must be at least 8 characters long."
      );
    }

    if (code !== generatedCode) {
      console.log("Verification code mismatch");
      throw new Error("Incorrect verification code.");
    } else {
      const hashedPassword = await hashPassword(password);
      const createdUser = await User.create({
        email,
        password: hashedPassword,
        role: "user",
      });
      if (createdUser) {
        await Orders.create({
          user_id: createdUser._id,
          orders: [],
        });
      }
      
      return NextResponse.json({ message: "User created" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
