/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { Navbar } from '@/shared/ui/Navbar'
import { Footer } from '@/shared/ui/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/image'
import { isSanityConfigured } from '@/sanity/env'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { cache } from 'react'

const getPost = cache(async (slug: string) => {
  if (!isSanityConfigured) return null;
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "imageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    body,
    publishedAt,
    excerpt,
    "authorName": author->name,
    "categories": categories[]->title
  }`
  return client.fetch(query, { slug })
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug);
  if (!post) return { title: locale === 'id' ? 'Artikel tidak ditemukan' : 'Post not found' };

  const description = post.excerpt || `${post.title} — RezaCode.id`;
  return {
    title: `${post.title} | RezaCode.id`,
    description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: { en: `/en/blog/${slug}`, id: `/id/blog/${slug}` },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      publishedTime: post.publishedAt,
      images: post.imageUrl ? [{ url: post.imageUrl, alt: post.mainImageAlt || post.title }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const myPortableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          <div className="relative w-full aspect-[16/9] my-8 rounded-xl overflow-hidden shadow-xl border border-white/10">
            <Image
              src={urlForImage(value)?.url() as string}
              alt={value.alt || 'Blog Post Image'}
              fill
              className="object-cover"
            />
          </div>
        )
      }
    }
  }

  const premiumPortableTextComponents = {
    ...myPortableTextComponents,
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-2xl md:text-3xl font-bold font-space-grotesk mt-16 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-accent-cyan/50 block rounded-full"></span>
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl md:text-2xl font-bold font-space-grotesk mt-10 mb-4 text-white">
          {children}
        </h3>
      ),
      normal: ({ children }: any) => (
        <p className="text-text-secondary leading-[1.8] mb-6 text-lg tracking-wide">
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-accent-purple bg-accent-purple/10 p-6 md:p-8 rounded-r-2xl my-10 text-white/90 text-xl font-medium shadow-[inset_0_0_30px_rgba(157,78,221,0.05)] relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent-purple/20 to-transparent pointer-events-none" />
          <span className="relative z-10 italic leading-relaxed">&quot;{children}&quot;</span>
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold text-white">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic text-white/80">{children}</em>
      ),
      link: ({ children, value }: any) => {
        const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value?.href} rel={rel} target="_blank" className="text-accent-cyan hover:text-white underline decoration-accent-cyan/30 hover:decoration-white transition-all underline-offset-4 font-medium group relative inline-block">
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-cyan transition-all duration-300 group-hover:w-full"></span>
          </a>
        );
      },
    },
  }

  const description = post.excerpt || `${post.title} — RezaCode.id`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    image: post.imageUrl,
    author: { '@type': 'Person', name: post.authorName || 'Reza Yusuf Maulana' },
    mainEntityOfPage: `https://rezacode.id/${locale}/blog/${slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24 w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Link href={`/${locale}#blog`} className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-accent-cyan font-mono mb-6">
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
            {post.categories && post.categories.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-accent-cyan/50"></span>
                <span>{post.categories.join(', ')}</span>
              </>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          {post.authorName && (
            <div className="text-text-secondary">
              By <span className="text-white font-medium">{post.authorName}</span>
            </div>
          )}
        </header>

        {post.imageUrl && (
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
            <Image src={post.imageUrl} alt={post.mainImageAlt || post.title} fill className="object-cover" />
          </div>
        )}

        <article className="max-w-none pb-12">
          <PortableText value={post.body} components={premiumPortableTextComponents} />
        </article>
      </main>
      <Footer />
    </div>
  )
}
