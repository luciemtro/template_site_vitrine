// lib/google-rating.ts

export async function getGoogleRating(): Promise<{
  rating: number
  total: number
} | null> {
  const placeId = process.env.GOOGLE_PLACE_ID
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!placeId || !apiKey) return null

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    const rating = data.result?.rating
    const total = data.result?.user_ratings_total

    if (!rating) return null
    return { rating, total }
  } catch {
    return null
  }
}
