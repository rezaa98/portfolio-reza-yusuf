import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Post not found</h1>
      <p className="text-text-secondary mb-8">The requested article is unavailable.</p>
      <Link href="/" className="text-accent-cyan hover:underline">Back to portfolio</Link>
    </main>
  );
}
