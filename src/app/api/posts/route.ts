import { NextResponse } from 'next/server';
import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";

export async function GET() {
  if (!isSanityConfigured) {
    return NextResponse.json({ data: [], configured: false });
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
    return NextResponse.json({ error: "Failed to fetch posts from Sanity." }, { status: 502 });
  }
}
