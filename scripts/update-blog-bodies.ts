import fs from 'fs'
import { createClient } from '@sanity/client'
import { markdownToPortableText } from './utils/markdown-to-portable-text.js'

interface ParsedArticle {
  title: string
  body: string
}

function parseArticlesFromMarkdown(filePath: string): ParsedArticle[] {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const articles: ParsedArticle[] = []

  const headingRegex = /^## ARTÍCULO \d+:\s*(.+)$/gm
  const matches: { title: string; index: number; fullMatchLength: number }[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(raw)) !== null) {
    matches.push({
      title: match[1].trim(),
      index: match.index,
      fullMatchLength: match[0].length,
    })
  }

  for (let i = 0; i < matches.length; i++) {
    const contentStart = matches[i].index + matches[i].fullMatchLength
    const contentEnd = i + 1 < matches.length ? matches[i + 1].index : raw.length

    let body = raw.slice(contentStart, contentEnd).trim()

    body = body.replace(/^---[\s\n]*/, '').replace(/[\s\n]*---\s*$/, '').trim()

    articles.push({ title: matches[i].title, body })
  }

  return articles
}

const TITLE_TO_SLUG: Record<string, string> = {
  'La profecía autocumplida: cómo lo que crees de ti moldea tu vida':
    'la-profecia-autocumplida-como-lo-que-crees-de-ti-moldea-tu-vida',
  'Persona Altamente Sensible (PAS)':
    'persona-altamente-sensible-pas',
  '6 meditaciones rápidas y efectivas':
    '6-meditaciones-rapidas-y-efectivas',
  '10 señales claras de que ha llegado el momento':
    '10-senales-claras-de-que-necesitas-ayuda',
  'Agorafobia: qué es y cómo manejarla':
    'agorafobia-que-es-y-como-manejarla',
  'Bases del bienestar psicológico — Mecanismos transdiagnósticos':
    'bases-del-bienestar-psicologico',
  'Despersonalización y Desrealización':
    'despersonalizacion-y-desrealizacion',
  'Explora tu parte oculta: 5 preguntas para empezar':
    'explora-tu-parte-oculta-5-preguntas-para-empezar',
  '💖 Volver a sentir — Guía para despertar el deseo y reconectar con tu cuerpo y tu pareja':
    'guia-despertar-deseo-reconectar-cuerpo-pareja',
  '10 formas de calmar la ansiedad (Kit de 32 estrategias para gestionar la ansiedad)':
    'kit-32-estrategias-gestionar-ansiedad',
}

async function main() {
  const confirm = process.argv.includes('--confirm')
  const articles = parseArticlesFromMarkdown('articulos_blog_esteladegracia (1).md')

  console.log(`\n📄 Parsed ${articles.length} articles.\n`)

  const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
  const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'

  if (confirm && !projectId) {
    console.error('❌ Missing SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID env var')
    process.exit(1)
  }

  const client = confirm
    ? createClient({
        projectId: projectId!,
        dataset,
        apiVersion: '2024-01-01',
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
      })
    : null

  let successCount = 0
  let skipCount = 0

  for (const [i, article] of articles.entries()) {
    const slug = TITLE_TO_SLUG[article.title]

    if (!slug) {
      console.error(`  ❌ ${i + 1}. "${article.title}" — no slug mapping found, skipping.`)
      skipCount++
      continue
    }

    const id = `blogpost-${slug}`
    const portableTextBlocks = markdownToPortableText(article.body)

    console.log(`  ${i + 1}. "${article.title}"`)
    console.log(`     slug: ${slug}`)
    console.log(`     id:   ${id}`)
    console.log(`     Portable Text blocks: ${portableTextBlocks.length}`)

    if (!confirm || !client) {
      console.log(`     [DRY RUN — no changes made]\n`)
      continue
    }

    try {
      await client.patch(id).set({ body: portableTextBlocks }).commit()
      console.log(`     ✅ Patched successfully.\n`)
      successCount++
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`     ❌ Failed to patch: ${message}\n`)
    }
  }

  if (!confirm) {
    console.log('⚠️  Dry run completed. Execute with --confirm to patch Sanity:')
    console.log('   npm run update-blog-bodies -- --confirm\n')
    return
  }

  console.log(`\n🎉 Done! ${successCount} patched, ${skipCount} skipped.`)
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
