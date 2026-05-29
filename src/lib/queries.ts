export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  brandName,
  tagline,
  logo,
  favicon,
  socialLinks,
  contactInfo,
  footerContent,
  navigation
}`

export const homePageQuery = `*[_type == "homePage"][0]{
  hero {
    ...,
    backgroundImage { asset->, hotspot, crop },
    "presentationVideoUrl": coalesce(presentationVideo.asset->url, presentationVideoUrl),
    videoPoster { asset->, hotspot, crop }
  },
  groupLaunchBanner {
    enabled,
    badge,
    title,
    titleHighlight,
    subtitle,
    launchDate,
    launchPriceText,
    ctaLabel,
    ctaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    urgencyText,
    postLaunchText,
    backgroundImage { asset->, hotspot, crop }
  },
  aboutPreview {
    ...,
    profileImage { asset->, hotspot, crop },
    humanImage { asset->, hotspot, crop }
  },
  transitionSection {
    image { asset->, hotspot, crop },
    title,
    subtitle,
    ctaLabel,
    ctaHref
  },
  problemsSection,
  servicesPreview,
  "testimonials": testimonials[]->{ _id, name, text, rating, date, source, serviceType, hasVideo, "videoUrl": coalesce(videoFile.asset->url, videoUrl), "hugVideoUrl": coalesce(hugVideoFile.asset->url, hugVideoUrl), videoPoster { asset->, hotspot, crop } },
  leadMagnet,
  "faqItems": *[_type == "faqItem"] | order(order asc) { _id, question, answer, "category": select(category == "group" => "grupal", category == "anxiety" => "ansiedad", category) },
  ctaBanner { ..., backgroundImage { asset->, hotspot, crop } }
}`

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  hero {
    ...,
    heroImage { asset->, hotspot, crop },
    "videoUrl": coalesce(video.asset->url, videoUrl),
    videoPoster { asset->, hotspot, crop }
  },
  personalStory {
    ...,
    storyImage { asset->, hotspot, crop }
  },
  trustBar,
  approach,
  transitionBanner { image { asset->, hotspot, crop }, title, subtitle },
  "testimonials": testimonials[]->{ _id, name, text, rating, date, source, serviceType, hasVideo, "videoUrl": coalesce(videoFile.asset->url, videoUrl), videoPoster { asset->, hotspot, crop } },
  timeline,
  timelineImage { asset->, hotspot, crop },
  ctaBanner { ..., backgroundImage { asset->, hotspot, crop } }
}`

export const contactPageQuery = `*[_type == "contactPage"][0]{
  sectionLabel,
  title,
  titleHighlight,
  subtitle,
  sideImage { asset->, hotspot, crop },
  formLabels,
  successState,
  whatsappSection,
  infoCards
}`

export const faqPageQuery = `*[_type == "faqPage"][0]{
  heroLabel,
  heroTitle,
  heroHighlight,
  heroDescription,
  sideImage { asset->, hotspot, crop },
  ctaBanner { ..., backgroundImage { asset->, hotspot, crop } }
}`

export const allFaqItemsQuery = `*[_type == "faqItem"] | order(order asc){
  _id,
  question,
  answer,
  "category": select(category == "group" => "grupal", category == "anxiety" => "ansiedad", category),
  order
}`

export const testimonialsPageQuery = `*[_type == "testimonialsPage"][0]{
  heroLabel,
  heroTitle,
  heroHighlight,
  heroDescription,
  heroImage { asset->, hotspot, crop },
  ctaBanner { ..., backgroundImage { asset->, hotspot, crop } }
}`

export const allTestimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  _id,
  name,
  text,
  rating,
  date,
  source,
  serviceType,
  hasVideo,
  "videoUrl": coalesce(videoFile.asset->url, videoUrl),
  "hugVideoUrl": coalesce(hugVideoFile.asset->url, hugVideoUrl),
  videoPoster { asset->, hotspot, crop },
  featured,
  order
}`

export const resourcesPageQuery = `*[_type == "resourcesPage"][0]{
  heroLabel,
  heroTitle,
  heroHighlight,
  heroDescription,
  heroImage { asset->, hotspot, crop },
  valuePropositions,
  previewSection,
  emailGate,
  inlineTestimonial,
  blogCrossLink,
  ctaBanner { ..., backgroundImage { asset->, hotspot, crop } }
}`

export const allResourcesQuery = `*[_type == "resource"] | order(order asc){
  _id,
  title,
  slug,
  description,
  type,
  coverImage,
  "fileUrl": file.asset->url,
  order
}`

export const servicesIndexPageQuery = `*[_type == "servicesIndexPage"][0]{
  heroLabel,
  heroTitle,
  heroHighlight,
  heroDescription,
  heroImage { asset->, hotspot, crop },
  processSteps,
  comparisonSection,
  trustStats,
  therapeuticApproach,
  quickFaq,
  ctaBanner { ..., backgroundImage { asset->, hotspot, crop } }
}`

export const allServicesQuery = `*[_type == "service"] | order(title asc){
  _id,
  title,
  slug,
  tagline,
  color,
  previewCard,
  pricing
}`

export const serviceDetailQuery = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  tagline,
  color,
  heroLabel,
  heroImage { asset->, hotspot, crop },
  whoIsItFor,
  galleryImages[] { asset->, hotspot, crop },
  previewCard,
  formalDisorders,
  transdiagnostic,
  evaluation {
    ...,
    "videoUrl": coalesce(video.asset->url, videoUrl),
    videoPoster { asset->, hotspot, crop }
  },
  pricing,
  pricePerHour,
  methodology,
  outcomes,
  process,
  "testimonials": testimonials[]->{ _id, name, text, rating, date, source, serviceType, hasVideo, "videoUrl": coalesce(videoFile.asset->url, videoUrl), videoPoster { asset->, hotspot, crop } },
  ctaBanner { ..., backgroundImage { asset->, hotspot, crop } },
  programDetails,
  differentiators,
  bonuses,
  monthlyBreakdown,
  syllabusCapture
}`

export const blogIndexPageQuery = `*[_type == "blogIndexPage"][0]{
  heroLabel,
  heroTitle,
  heroHighlight,
  heroDescription,
  heroImage { asset->, hotspot, crop },
  categories,
  emptyStateText,
  ctaBanner { ..., backgroundImage { asset->, hotspot, crop } }
}`

export const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishedDate desc){
  _id,
  title,
  slug,
  description,
  publishedDate,
  author,
  category,
  tags,
  coverImage,
  readingTime,
  featured
}`

export const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  body,
  publishedDate,
  updatedDate,
  author,
  category,
  tags,
  coverImage,
  readingTime,
  featured,
  "relatedPosts": select(
    count(relatedPosts) > 0 =>
      relatedPosts[]->{ _id, title, slug, description, category, readingTime, coverImage, publishedDate },
    *[
      _type == "blogPost"
      && slug.current != ^.slug.current
      && publishedDate <= now()
      && (category == ^.category || count((tags[])[@ in ^.tags]) > 0)
    ] | order(count((tags[])[@ in ^.tags]) desc, publishedDate desc)[0..2]{
      _id, title, slug, description, category, readingTime, coverImage, publishedDate
    }
  )
}`

export const privacyPolicyQuery = `*[_type == "privacyPolicyPage"][0]{
  title,
  lastUpdated,
  body
}`
