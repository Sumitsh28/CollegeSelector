// app/api/users/add-favorite/route.js

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userId, college } = reqBody;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the college is already in the favorites
    const existingFavorite = user.favorites.find(
      (fav) => fav.name === college.name
    );
    if (existingFavorite) {
      return NextResponse.json(
        { message: "College is already in favorites" },
        { status: 400 }
      );
    }

    user.favorites.push(college);
    await user.save();

    return NextResponse.json(
      { message: "College added to favorites" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
