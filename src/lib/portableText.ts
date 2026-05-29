import { toHTML, type PortableTextComponents, type PortableTextMarkComponentOptions, type PortableTextTypeComponentOptions } from '@portabletext/to-html'
import type { PortableTextBlock } from '@portabletext/types'
import { srcSet, urlFor } from './sanityImage'

const CTA_HEADING_PATTERNS = [
  '¿sientes que esto te está pasando',
  '¿necesitas ayuda',
  'cierre',
  '¡ojo!',
  'nota importante',
  'autoevaluación',
]

function isCTAHeading(text: string): boolean {
  const lower = text.toLowerCase()
  return CTA_HEADING_PATTERNS.some((p) => lower.includes(p))
}

function escapeHtmlAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

const portableTextComponents: PortableTextComponents = {
  marks: {
    highlightRose: ({ children }: { children: string }) =>
      `<span class="text-[#98465d] font-semibold">${children}</span>`,
    highlightPurple: ({ children }: { children: string }) =>
      `<span class="text-[#6d5a8a] font-semibold">${children}</span>`,
    link: ({ children, value }: PortableTextMarkComponentOptions<{ _type: 'link'; href: string; blank?: boolean }>) => {
      if (!value?.href) return children
      const target = value.blank ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${value.href}"${target}>${children}</a>`
    },
  },
  types: {
    image: ({ value }: PortableTextTypeComponentOptions<{ asset: { _ref: string }; alt?: string }>) => {
      const imageSource = value as Parameters<typeof urlFor>[0]
      const src = urlFor(imageSource).width(1280).format('webp').quality(88).url()
      const responsiveSrcSet = srcSet(imageSource, [640, 960, 1280, 1600], 88)
      const alt = escapeHtmlAttribute(value.alt ?? '')
      return `<img src="${escapeHtmlAttribute(src)}" srcset="${escapeHtmlAttribute(responsiveSrcSet)}" sizes="(max-width: 767px) 100vw, 768px" alt="${alt}" class="rounded-xl my-6 w-full" loading="lazy" decoding="async" />`
    },
  },
}

interface PortableTextOptions {
  whatsappUrl?: string
  contactUrl?: string
}

function buildInlineCtaHtml(options: PortableTextOptions): string {
  const { whatsappUrl, contactUrl = '/contacto' } = options
  const whatsappBtn = whatsappUrl
    ? `<a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="blog-inline-cta-whatsapp">` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>` +
      `Escribir por WhatsApp</a>`
    : ''
  return (
    `<div class="blog-inline-cta">` +
    whatsappBtn +
    `<a href="${contactUrl}" class="blog-inline-cta-reservar">Reservar mi primera sesión</a>` +
    `</div>`
  )
}

export function portableTextToHtml(
  blocks: PortableTextBlock | PortableTextBlock[],
  options?: PortableTextOptions,
): string {
  if (!blocks) return ''
  const blockArr = Array.isArray(blocks) ? blocks : [blocks]
  let html = toHTML(blockArr, { components: portableTextComponents })

  html = html.replace(/<h3>([^<]*)<\/h3>/g, (_match, content: string) => {
    if (isCTAHeading(content)) {
      return `<div class="blog-cta-divider"></div><h3 class="blog-cta-heading">${content}</h3>`
    }
    return `<h3>${content}</h3>`
  })

  if (options?.whatsappUrl || options?.contactUrl) {
    const ctaMarker = 'class="blog-cta-heading"'
    const lastCtaIdx = html.lastIndexOf(ctaMarker)
    if (lastCtaIdx !== -1) {
      const afterHeading = html.indexOf('</h3>', lastCtaIdx)
      if (afterHeading !== -1) {
        const searchStart = afterHeading + 5
        const nextParagraphEnd = html.indexOf('</p>', searchStart)
        const insertPos = nextParagraphEnd !== -1 ? nextParagraphEnd + 4 : searchStart
        const ctaHtml = buildInlineCtaHtml(options)
        html = html.slice(0, insertPos) + ctaHtml + html.slice(insertPos)
      }
    }
  }

  return html
}
