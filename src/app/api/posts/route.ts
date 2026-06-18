import { NextResponse } from 'next/server';
import { client } from "@/sanity/lib/client";

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return NextResponse.json({ error: "Sanity project ID is missing." }, { status: 500 });
  }

  try {
    const query = `*[_type == "post"] | order(coalesce(isPinned, false) desc, publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      isPinned,
      "categories": categories[]->title,
      "mainImage": mainImage.asset->url,
      "firstBodyImage": body[_type == "image"][0].asset->url
    }`;
    
    const posts = await client.fetch(query);
    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error("Failed to fetch sanity posts:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Failed to fetch posts from Sanity.", details: errorMessage }, { status: 500 });
  }
}
