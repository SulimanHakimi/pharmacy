import dbConnect from "@/lib/db";
import Consultation from "@/models/Consultation";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const consultations = await Consultation.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({ consultations });
  } catch (error) {
    console.error("History fetch error:", error);
    return NextResponse.json(
      { error: "د تاریخ د ترلاسه کولو پر مهال تېروتنه رامنځته شوه" },
      { status: 500 }
    );
  }
}
