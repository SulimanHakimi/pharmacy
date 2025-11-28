import dbConnect from "@/lib/db";
import Drug from "@/models/Drug";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      // Return some popular drugs if no query
      const drugs = await Drug.find({ inStock: true }).limit(12);
      return NextResponse.json({ drugs });
    }

    // Search in both English and Pashto names
    const drugs = await Drug.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { namePashto: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ]
    }).limit(20);

    return NextResponse.json({ drugs });
  } catch (error) {
    console.error("Drug search error:", error);
    return NextResponse.json(
      { error: "د لټون پر مهال تېروتنه رامنځته شوه" },
      { status: 500 }
    );
  }
}

// POST endpoint to add new drug (admin only in production)
export async function POST(req) {
  try {
    await dbConnect();
    
    const drugData = await req.json();
    const drug = await Drug.create(drugData);

    return NextResponse.json(
      { message: "درمل په بریالیتوب سره اضافه شو", drug },
      { status: 201 }
    );
  } catch (error) {
    console.error("Drug creation error:", error);
    return NextResponse.json(
      { error: "د درملو د اضافه کولو پر مهال تېروتنه رامنځته شوه" },
      { status: 500 }
    );
  }
}
