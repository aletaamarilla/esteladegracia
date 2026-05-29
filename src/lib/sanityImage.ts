import { createImageUrlBuilder as imageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { sanityClient } from './sanity'
import type { SanityImage, Testimonial } from './sanityTypes'

const builder = imageUrlBuilder(
  sanityClient ?? {
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '',
    dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  },
)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function heroImage(source: SanityImageSource): string {
  return urlFor(source).width(2560).format('webp').quality(88).url()
}

export function thumbnailImage(source: SanityImageSource): string {
  return urlFor(source).width(800).format('webp').quality(85).url()
}

export function ogImage(source: SanityImageSource): string {
  return urlFor(source).width(1200).height(630).fit('crop').url()
}

const VIEWPORT_WIDTHS = { mobile: 640, tablet: 1024, desktop: 1920 } as const

export function sectionBackground(
  source: SanityImageSource,
  viewport: 'mobile' | 'tablet' | 'desktop',
): string {
  return urlFor(source)
    .width(VIEWPORT_WIDTHS[viewport])
    .format('webp')
    .quality(85)
    .url()
}

export function profilePhoto(source: SanityImageSource): string {
  return urlFor(source).width(1600).quality(95).url()
}

export const PORTRAIT_IMAGE_ASPECT_RATIO = 4 / 5
export const PORTRAIT_IMAGE_WIDTHS = [640, 960, 1280, 1600, 2000] as const
export const LANDSCAPE_IMAGE_ASPECT_RATIO = 16 / 9
export const LANDSCAPE_IMAGE_WIDTHS = [640, 960, 1280, 1600, 1920] as const
export const FULL_BLEED_IMAGE_WIDTHS = [640, 960, 1280, 1600, 1920, 2560] as const

export function croppedImage(
  source: SanityImageSource,
  width: number,
  aspectRatio: number,
  quality = 94,
  preserveFormat = true,
): string {
  const height = Math.round(width / aspectRatio)
  const b = urlFor(source).width(width).height(height).fit('crop').quality(quality)
  return preserveFormat ? b.url() : b.format('webp').url()
}

export function croppedSrcSet(
  source: SanityImageSource,
  widths: readonly number[],
  aspectRatio: number,
  quality = 94,
  preserveFormat = true,
): string {
  return widths
    .map((w) => {
      return `${croppedImage(source, w, aspectRatio, quality, preserveFormat)} ${w}w`
    })
    .join(', ')
}

export function portraitImage(source: SanityImageSource, width = 1600, quality = 94): string {
  return croppedImage(source, width, PORTRAIT_IMAGE_ASPECT_RATIO, quality)
}

export function portraitSrcSet(
  source: SanityImageSource,
  quality = 94,
  widths: readonly number[] = PORTRAIT_IMAGE_WIDTHS,
): string {
  return croppedSrcSet(source, widths, PORTRAIT_IMAGE_ASPECT_RATIO, quality)
}

export function fullBleedHero(source: SanityImageSource): string {
  return urlFor(source).width(2560).format('webp').quality(88).url()
}

export function landscapeImage(source: SanityImageSource, width = 1280, quality = 90): string {
  return croppedImage(source, width, LANDSCAPE_IMAGE_ASPECT_RATIO, quality, false)
}

export function landscapeSrcSet(
  source: SanityImageSource,
  quality = 90,
  widths: readonly number[] = LANDSCAPE_IMAGE_WIDTHS,
): string {
  return croppedSrcSet(source, widths, LANDSCAPE_IMAGE_ASPECT_RATIO, quality, false)
}

export function videoPosterImage(source: SanityImageSource, width = 1600, quality = 92): string {
  return landscapeImage(source, width, quality)
}

export function videoPosterSrcSet(source: SanityImageSource, quality = 92): string {
  return landscapeSrcSet(source, quality)
}

export function optimizeTestimonialPosters(testimonials?: Testimonial[]): Testimonial[] {
  return (testimonials ?? []).map((testimonial) => {
    const poster = testimonial.videoPoster
    if (!poster) return testimonial

    return {
      ...testimonial,
      videoPosterUrl: videoPosterImage(poster),
      videoPosterSrcSet: videoPosterSrcSet(poster),
      videoPosterMobileUrl: croppedImage(poster, 960, 4 / 3, 92, false),
      videoPosterMobileSrcSet: croppedSrcSet(poster, [480, 640, 960, 1280], 4 / 3, 92, false),
    }
  })
}

export function srcSet(
  source: SanityImageSource,
  widths: readonly number[] = FULL_BLEED_IMAGE_WIDTHS,
  quality = 88,
  preserveFormat = false,
): string {
  return widths
    .map((w) => {
      const b = urlFor(source).width(w).quality(quality)
      return `${preserveFormat ? b.url() : b.format('webp').url()} ${w}w`
    })
    .join(', ')
}

export function hotspotToObjectPosition(image?: SanityImage): string {
  if (!image?.hotspot) return 'center'
  return `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`
}
