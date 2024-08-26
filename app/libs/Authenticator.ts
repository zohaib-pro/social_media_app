import { NextResponse } from "next/server";

import serverAuth from "./serverAuth";

export const NotAuthenticated = async () => {
  return NextResponse.json(
    { message: "User not Authenticated!" },
    { status: 401 }
  );
};
