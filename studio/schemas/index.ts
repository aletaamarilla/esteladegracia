import { ctaBanner, ctaLink, blockContent } from './objects'
import { testimonial, faqItem, service, blogPost, resource } from './documents'
import {
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  faqPage,
  testimonialsPage,
  resourcesPage,
  servicesIndexPage,
  blogIndexPage,
  privacyPolicyPage,
} from './singletons'

export const schemaTypes = [
  // Objects
  ctaBanner,
  ctaLink,
  blockContent,
  // Collections
  testimonial,
  faqItem,
  service,
  blogPost,
  resource,
  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  faqPage,
  testimonialsPage,
  resourcesPage,
  servicesIndexPage,
  blogIndexPage,
  privacyPolicyPage,
]
