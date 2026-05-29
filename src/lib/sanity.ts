import { createClient, type SanityClient } from '@sanity/client'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'

function buildClient(): SanityClient | null {
  if (!projectId) {
    console.warn('[sanity] PUBLIC_SANITY_PROJECT_ID is not set – Sanity queries will return empty data.')
    return null
  }
  return createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: import.meta.env.PROD })
}

export const sanityClient = buildClient()

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  if (!sanityClient) return null as T
  return sanityClient.fetch<T>(query, params ?? {})
}
