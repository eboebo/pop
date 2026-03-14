import { NextResponse } from "next/server";
import { parseAllGauges } from "@/lib/lcra-api";

export async function GET() {
  try {
    const res = await fetch(
      "https://hydromet.lcra.org/api/GetDataForAllSites",
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch LCRA data" },
        { status: 502 }
      );
    }

    const rawData = await res.json();
    const gauges = parseAllGauges(rawData);

    return NextResponse.json(gauges, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("LCRA API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
