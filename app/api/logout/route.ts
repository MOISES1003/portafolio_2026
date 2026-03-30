import { logoutUseCae } from "@/features/auth";
import { NextResponse } from "next/server";

export async function POST() {

  await logoutUseCae();

  return NextResponse.json({ success: true });
}
