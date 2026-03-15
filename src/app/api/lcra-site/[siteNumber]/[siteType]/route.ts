import { NextResponse } from "next/server";
import { LCRASiteType } from "@/lib/types";

const VALID_TYPES: LCRASiteType[] = ["flow", "rain", "lakelevel", "temp", "humidity"];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ siteNumber: string; siteType: string }> }
) {
  const { siteNumber, siteType } = await params;

  if (!VALID_TYPES.includes(siteType as LCRASiteType)) {
    return NextResponse.json(
      { error: "Invalid siteType" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://hydromet.lcra.org/api/GetDataBySite/${siteNumber}/${siteType}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch site data" },
        { status: 502 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("LCRA site API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
