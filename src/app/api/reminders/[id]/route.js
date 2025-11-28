import dbConnect from "@/lib/db";
import Reminder from "@/models/Reminder";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;
    
    await Reminder.findOneAndDelete({ _id: id, userId: session.user.id });

    return NextResponse.json({ message: "یادونه حذف شوه" });
  } catch (error) {
    console.error("Reminder deletion error:", error);
    return NextResponse.json(
      { error: "د یادونې د حذف کولو پر مهال تېروتنه رامنځته شوه" },
      { status: 500 }
    );
  }
}
