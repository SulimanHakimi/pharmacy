import dbConnect from "@/lib/db";
import Reminder from "@/models/Reminder";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const reminders = await Reminder.find({ userId: session.user.id, active: true }).sort({ createdAt: -1 });

    return NextResponse.json({ reminders });
  } catch (error) {
    console.error("Reminders fetch error:", error);
    return NextResponse.json(
      { error: "د یادونو د ترلاسه کولو پر مهال تېروتنه رامنځته شوه" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    
    const reminder = await Reminder.create({
      ...data,
      userId: session.user.id,
    });

    return NextResponse.json(
      { message: "یادونه په بریالیتوب سره جوړه شوه", reminder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Reminder creation error:", error);
    return NextResponse.json(
      { error: "د یادونې د جوړولو پر مهال تېروتنه رامنځته شوه" },
      { status: 500 }
    );
  }
}
