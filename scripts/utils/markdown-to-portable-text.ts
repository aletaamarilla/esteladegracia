import type { PortableTextBlock } from '@portabletext/types'

function generateKey(): string {
  return Math.random().toString(36).substring(2, 12)
}

interface MarkDef {
  _key: string
  _type: string
  href?: string
  blank?: boolean
}

interface Span {
  _key: string
  _type: 'span'
  text: string
  marks: string[]
}

function parseInlineMarks(text: string): { spans: Span[]; markDefs: MarkDef[] } {
  const spans: Span[] = []
  const markDefs: MarkDef[] = []

  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      spans.push({
        _key: generateKey(),
        _type: 'span',
        text: text.slice(lastIndex, match.index),
        marks: [],
      })
    }

    if (match[1]) {
      spans.push({
        _key: generateKey(),
        _type: 'span',
        text: match[1],
        marks: ['strong'],
      })
    } else if (match[2]) {
      spans.push({
        _key: generateKey(),
        _type: 'span',
        text: match[2],
        marks: ['em'],
      })
    } else if (match[3] && match[4]) {
      const linkKey = generateKey()
      markDefs.push({
        _key: linkKey,
        _type: 'link',
        href: match[4],
        blank: match[4].startsWith('http'),
      })
      spans.push({
        _key: generateKey(),
        _type: 'span',
        text: match[3],
        marks: [linkKey],
      })
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    spans.push({
      _key: generateKey(),
      _type: 'span',
      text: text.slice(lastIndex),
      marks: [],
    })
  }

  if (spans.length === 0) {
    spans.push({
      _key: generateKey(),
      _type: 'span',
      text,
      marks: [],
    })
  }

  return { spans, markDefs }
}

export function markdownToPortableText(markdown: string): PortableTextBlock[] {
  const lines = markdown.split('\n')
  const blocks: PortableTextBlock[] = []
  let currentListItems: string[] = []
  let currentListType: 'bullet' | 'number' | null = null

  function flushList() {
    if (currentListItems.length === 0) return
    for (const item of currentListItems) {
      const { spans, markDefs } = parseInlineMarks(item)
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: currentListType!,
        level: 1,
        markDefs,
        children: spans,
      } as unknown as PortableTextBlock)
    }
    currentListItems = []
    currentListType = null
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushList()
      continue
    }

    const bulletMatch = trimmed.match(/^[-*]\s+(.+)/)
    if (bulletMatch) {
      if (currentListType !== 'bullet') flushList()
      currentListType = 'bullet'
      currentListItems.push(bulletMatch[1])
      continue
    }

    const numberMatch = trimmed.match(/^\d+\.\s+(.+)/)
    if (numberMatch) {
      if (currentListType !== 'number') flushList()
      currentListType = 'number'
      currentListItems.push(numberMatch[1])
      continue
    }

    flushList()

    let style: string = 'normal'
    let text = trimmed

    if (trimmed.startsWith('#### ')) {
      style = 'h4'
      text = trimmed.slice(5)
    } else if (trimmed.startsWith('### ')) {
      style = 'h3'
      text = trimmed.slice(4)
    } else if (trimmed.startsWith('## ')) {
      style = 'h2'
      text = trimmed.slice(3)
    } else if (trimmed.startsWith('> ')) {
      style = 'blockquote'
      text = trimmed.slice(2)
    }

    const { spans, markDefs } = parseInlineMarks(text)

    blocks.push({
      _key: generateKey(),
      _type: 'block',
      style,
      markDefs,
      children: spans,
    } as unknown as PortableTextBlock)
  }

  flushList()

  return blocks
}

export function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!fmMatch) return { frontmatter: {}, body: content }

  const frontmatter: Record<string, unknown> = {}
  const fmLines = fmMatch[1].split('\n')

  for (const line of fmLines) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value: unknown = line.slice(colonIdx + 1).trim()

    if (typeof value === 'string') {
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      } else if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value)
        } catch {
          // leave as string
        }
      } else if (value === 'true') {
        value = true
      } else if (value === 'false') {
        value = false
      } else if (/^\d+$/.test(value as string)) {
        value = parseInt(value as string, 10)
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(value as string)) {
        value = new Date(value as string).toISOString()
      }
    }

    frontmatter[key] = value
  }

  return { frontmatter, body: fmMatch[2].trim() }
}
