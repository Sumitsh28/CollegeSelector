import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists" },
        { status: 500 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Password is invalid" },
        { status: 500 }
      );
    }

    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Logged In successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
