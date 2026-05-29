import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
}

export interface CtaBanner {
  title: string
  highlight?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  backgroundImage?: SanityImage
}

export interface CtaLink {
  label: string
  href: string
}

// --- Collections ---

export interface Testimonial {
  _id: string
  name: string
  text?: string
  rating: number
  date?: string
  source?: string
  serviceType?: 'individual' | 'group'
  hasVideo?: boolean
  videoUrl?: string
  videoFile?: SanityFile
  videoPoster?: SanityImage
  videoPosterUrl?: string
  videoPosterSrcSet?: string
  videoPosterMobileUrl?: string
  videoPosterMobileSrcSet?: string
  hugVideoUrl?: string
  hugVideoFile?: SanityFile
  featured?: boolean
  order?: number
}

export interface FaqItem {
  _id: string
  question: string
  answer: string
  category: 'individual' | 'grupal' | 'ansiedad' | 'group' | 'anxiety'
  order?: number
}

export interface ServicePreview {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  color: 'rose' | 'purple'
  previewCard?: {
    badge?: string
    shortDescription?: string
    features?: string[]
  }
  pricing?: Array<{ name: string; price: number; savings?: number }>
}

export interface ServiceDetail extends ServicePreview {
  heroLabel?: string
  heroImage?: SanityImage
  whoIsItFor?: string
  galleryImages?: SanityImage[]
  formalDisorders?: Array<{ category: string; items: string[] }>
  transdiagnostic?: string[]
  evaluation?: {
    description: string
    price: number
    videoUrl?: string
    video?: SanityFile
    videoPoster?: SanityImage
    videoLabel?: string
  }
  pricePerHour?: string
  methodology?: string[]
  outcomes?: string[]
  process?: Array<{ step: number; title: string; description: string }>
  testimonials?: Testimonial[]
  ctaBanner?: CtaBanner
  programDetails?: {
    duration: string
    sessionsTotal: number
    frequency: string
    groupSize: string
    sessionLength: string
    modality: string
  }
  differentiators?: string[]
  bonuses?: Array<{ title: string; description: string }>
  monthlyBreakdown?: Array<{
    month: number
    title: string
    description: string
    topics: string[]
  }>
  syllabusCapture?: {
    title: string
    titleHighlight: string
    description: string
    buttonText: string
    successMessage: string
  }
}

export interface BlogPostPreview {
  _id: string
  title: string
  slug: { current: string }
  description: string
  publishedDate: string
  author?: string
  category?: string
  tags?: string[]
  coverImage?: SanityImage
  readingTime?: number
  featured?: boolean
}

export interface BlogPostDetail extends BlogPostPreview {
  body?: PortableTextBlock[]
  updatedDate?: string
  relatedPosts?: BlogPostPreview[]
}

export interface Resource {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  type: 'pdf' | 'audio' | 'video' | 'checklist'
  coverImage?: SanityImage
  fileUrl?: string
  order?: number
}

// --- Singletons ---

export interface SiteSettings {
  brandName: string
  tagline?: string
  logo?: SanityImage
  favicon?: SanityImage
  socialLinks?: Array<{ platform: string; url: string }>
  contactInfo?: {
    email?: string
    phone?: string
    whatsappNumber?: string
    whatsappDefaultMessage?: string
    responseTime?: string
    schedule?: string
  }
  footerContent?: {
    description?: string
    copyright?: string
    madeWithLoveText?: string
  }
  navigation?: {
    mainLinks?: Array<{
      label: string
      href: string
      children?: Array<{ label: string; href: string }>
    }>
    ctaButton?: { label: string; href: string }
  }
}

export interface HomePage {
  hero?: {
    badge?: string
    headline: string
    headlineHighlight?: string
    subtitle?: string
    primaryCta?: CtaLink
    secondaryCta?: CtaLink
    videoPlaceholderText?: string
    trustBadge?: string
    presentationVideoUrl?: string
    presentationVideo?: SanityFile
    videoPoster?: SanityImage
    backgroundImage?: SanityImage
    /** Vacío = imagen tratada como decorativa en el front. */
    heroImageAlt?: string
    rotatingPhrases?: string[]
    scrollInviteText?: string
  }
  aboutPreview?: {
    sectionLabel?: string
    title?: string
    titleHighlight?: string
    professionalStats?: Array<{ icon: string; label: string; value: string }>
    personalQuote?: string
    personalTraits?: Array<{ icon: string; label: string; description: string }>
    linkText?: string
    linkHref?: string
    profileImage?: SanityImage
    humanImage?: SanityImage
  }
  transitionSection?: {
    image?: SanityImage
    title?: string
    subtitle?: string
    ctaLabel?: string
    ctaHref?: string
  }
  problemsSection?: {
    sectionLabel?: string
    title?: string
    titleHighlight?: string
    problems?: Array<{ text: string }>
    transitionLabel?: string
    helpTitle?: string
    helpTitleHighlight?: string
    helpSubtitle?: string
    helpCards?: Array<{ icon: string; title: string; description: string }>
    ctaLabel?: string
    ctaHref?: string
  }
  servicesPreview?: {
    sectionLabel?: string
    title?: string
    titleHighlight?: string
    subtitle?: string
  }
  testimonials?: Testimonial[]
  leadMagnet?: {
    badge?: string
    title?: string
    titleHighlight?: string
    description?: string
    features?: string[]
    formLabel?: string
    buttonText?: string
    successTitle?: string
    successMessage?: string
    privacyNote?: string
  }
  groupLaunchBanner?: {
    enabled?: boolean
    badge?: string
    title?: string
    titleHighlight?: string
    subtitle?: string
    launchDate?: string
    launchPriceText?: string
    ctaLabel?: string
    ctaHref?: string
    secondaryCtaLabel?: string
    secondaryCtaHref?: string
    urgencyText?: string
    postLaunchText?: string
    backgroundImage?: SanityImage
  }
  faqItems?: FaqItem[]
  ctaBanner?: CtaBanner
}

export interface AboutPage {
  hero?: {
    headline: string
    subheadline?: string
    badge?: string
    videoPlaceholderText?: string
    videoUrl?: string
    video?: SanityFile
    videoPoster?: SanityImage
    heroImage?: SanityImage
  }
  personalStory?: {
    sectionLabel?: string
    title?: string
    titleHighlight?: string
    pullQuotes?: string[]
    storyBody?: PortableTextBlock[]
    personalTraits?: Array<{ icon: string; label: string; description: string }>
    inlineCta?: { text?: string; buttonLabel?: string; buttonHref?: string }
    storyImage?: SanityImage
  }
  trustBar?: Array<{ value: string; label: string }>
  transitionBanner?: {
    image?: SanityImage
    title?: string
    subtitle?: string
  }
  approach?: {
    sectionLabel?: string
    title?: string
    titleHighlight?: string
    philosophy?: string
    cards?: Array<{ icon: string; title: string; description: string }>
  }
  testimonials?: Testimonial[]
  timeline?: Array<{ year: string; title: string; description: string }>
  timelineImage?: SanityImage
  ctaBanner?: CtaBanner
}

export interface ContactPage {
  sectionLabel?: string
  title?: string
  titleHighlight?: string
  subtitle?: string
  sideImage?: SanityImage
  formLabels?: {
    nameLabel?: string
    namePlaceholder?: string
    emailLabel?: string
    emailPlaceholder?: string
    phoneLabel?: string
    phonePlaceholder?: string
    messageLabel?: string
    messagePlaceholder?: string
    submitButton?: string
    privacyNote?: string
  }
  successState?: {
    title?: string
    message?: string
    farewell?: string
  }
  whatsappSection?: {
    title?: string
    description?: string
    buttonText?: string
  }
  infoCards?: Array<{ icon: string; title: string; description: string }>
}

export interface SimplePageSingleton {
  heroLabel?: string
  heroTitle?: string
  heroHighlight?: string
  heroDescription?: string
  heroImage?: SanityImage
  ctaBanner?: CtaBanner
}

export interface ResourcesPage extends SimplePageSingleton {
  valuePropositions?: Array<{ icon: string; text: string }>
  previewSection?: { sectionLabel?: string; title?: string; titleHighlight?: string }
  emailGate?: { title?: string; titleHighlight?: string; description?: string }
  inlineTestimonial?: { quote?: string; author?: string }
  blogCrossLink?: { text?: string; linkLabel?: string; linkHref?: string }
}

export interface ServicesIndexPage extends SimplePageSingleton {
  processSteps?: Array<{ step: string; title: string; description: string; icon: string }>
  comparisonSection?: { sectionLabel?: string; title?: string; titleHighlight?: string; subtitle?: string }
  trustStats?: Array<{ value: string; label: string }>
  therapeuticApproach?: {
    sectionLabel?: string
    title?: string
    titleHighlight?: string
    subtitle?: string
    methods?: Array<{ name: string; fullName: string; description: string; icon: string }>
  }
  quickFaq?: Array<{ question: string; answer: string }>
}

export interface BlogIndexPage extends SimplePageSingleton {
  categories?: Array<{ key: string; label: string }>
  emptyStateText?: string
}

export interface FaqPage extends SimplePageSingleton {
  sideImage?: SanityImage
}

export interface TestimonialsPage extends SimplePageSingleton {}

export interface PrivacyPolicyPage {
  title: string
  lastUpdated?: string
  body?: PortableTextBlock[]
}
