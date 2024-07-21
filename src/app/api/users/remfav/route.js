// app/api/users/remove-favorite/route.js

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userId, collegeName } = reqBody;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove the college from favorites
    user.favorites = user.favorites.filter(
      (fav) => fav.name.toString() !== collegeName
    );
    await user.save();

    return NextResponse.json(
      { message: "College removed from favorites" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
