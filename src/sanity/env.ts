export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-11'

/**
 * Sanity is optional for the public portfolio. Placeholder values keep the
 * Studio bundle buildable in preview environments, while public data fetching
 * is guarded by `isSanityConfigured`.
 */
export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_DATASET
)

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
