import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://hydromet.lcra.org/api/GetLakeLevelsForAllSites",
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch lake levels" },
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
    console.error("LCRA lake levels API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
