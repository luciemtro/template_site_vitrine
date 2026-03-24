// app/api/update-rating/route.ts
import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(req: Request) {
  const auth = req.headers.get("Authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const PLACE_ID = process.env.GOOGLE_PLACE_ID
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${API_KEY}`
  )
  const data = await res.json()

  const rating = {
    rating: data.result.rating,
    total: data.result.user_ratings_total,
    updatedAt: new Date().toISOString(),
  }

  // Sauvegarde dans un fichier JSON statique
  await writeFile(
    path.join(process.cwd(), "data/google-rating.json"),
    JSON.stringify(rating, null, 2)
  )

  return NextResponse.json({ success: true, rating })
}
