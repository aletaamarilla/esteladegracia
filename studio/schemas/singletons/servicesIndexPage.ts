import { defineType } from 'sanity'
import { ALLOWED_ICONS } from '../shared/iconList'

export const servicesIndexPage = defineType({
  name: 'servicesIndexPage',
  title: 'Servicios — Índice',
  type: 'document',
  preview: {
    select: { title: 'heroTitle' },
    prepare({ title }) {
      return { title: title || 'Servicios' }
    },
  },
  fields: [
    {
      name: 'heroLabel',
      title: 'Etiqueta del hero',
      type: 'string',
      description: 'Texto pequeño que aparece encima del título (ej. "Mis servicios").',
    },
    {
      name: 'heroTitle',
      title: 'Título del hero',
      type: 'string',
      description: 'Título principal de la página de servicios.',
    },
    {
      name: 'heroHighlight',
      title: 'Texto resaltado',
      type: 'string',
      description: 'Parte del título que aparece en color destacado.',
    },
    {
      name: 'heroDescription',
      title: 'Descripción del hero',
      type: 'text',
      rows: 3,
      description: 'Texto introductorio que explica los servicios de forma general.',
    },
    {
      name: 'heroImage',
      title: 'Imagen del hero',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen de fondo de la cabecera de la página de servicios.',
    },
    {
      name: 'processSteps',
      title: 'Pasos del proceso',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Paso', type: 'string' },
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'string' },
            { name: 'icon', title: 'Icono', type: 'string', options: { list: ALLOWED_ICONS, layout: 'dropdown' } },
          ],
          preview: {
            select: { title: 'title', subtitle: 'step' },
            prepare: ({ title, subtitle }) => ({
              title: `${subtitle}: ${title}`,
            }),
          },
        },
      ],
      description: 'Pasos que explican cómo funciona el proceso de empezar terapia (ej. "1. Contacto", "2. Primera sesión").',
    },
    {
      name: 'comparisonSection',
      title: 'Sección comparativa',
      type: 'object',
      description: 'Sección que compara terapia individual vs grupal u otros aspectos de los servicios.',
      fields: [
        { name: 'sectionLabel', title: 'Etiqueta de sección', type: 'string', description: 'Texto pequeño sobre el título.' },
        { name: 'title', title: 'Título', type: 'string', description: 'Título de la sección comparativa.' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string', description: 'Parte del título en color destacado.' },
        { name: 'subtitle', title: 'Subtítulo', type: 'string', description: 'Texto de apoyo bajo el título.' },
      ],
    },
    {
      name: 'trustStats',
      title: 'Estadísticas de confianza',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Valor', type: 'string' },
            { name: 'label', title: 'Etiqueta', type: 'string' },
          ],
        },
      ],
      description: 'Datos numéricos que generan confianza (ej. "500+ pacientes", "98% de satisfacción").',
    },
    {
      name: 'therapeuticApproach',
      title: 'Enfoque terapéutico',
      type: 'object',
      description: 'Sección que detalla los métodos y enfoques terapéuticos que utilizas.',
      fields: [
        { name: 'sectionLabel', title: 'Etiqueta de sección', type: 'string', description: 'Texto pequeño sobre el título.' },
        { name: 'title', title: 'Título', type: 'string', description: 'Título de la sección de enfoque terapéutico.' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string', description: 'Parte del título en color destacado.' },
        { name: 'subtitle', title: 'Subtítulo', type: 'string', description: 'Texto de apoyo bajo el título.' },
        {
          name: 'methods',
          title: 'Métodos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Nombre corto', type: 'string' },
                { name: 'fullName', title: 'Nombre completo', type: 'string' },
                { name: 'description', title: 'Descripción', type: 'string' },
                { name: 'icon', title: 'Icono', type: 'string', options: { list: ALLOWED_ICONS, layout: 'dropdown' } },
              ],
              preview: {
                select: { title: 'name', subtitle: 'fullName' },
              },
            },
          ],
          description: 'Lista de metodologías terapéuticas que aplicas (ej. TCC, EMDR, Mindfulness).',
        },
      ],
    },
    {
      name: 'quickFaq',
      title: 'FAQ rápido',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Pregunta', type: 'string' },
            { name: 'answer', title: 'Respuesta', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
      description: 'Preguntas frecuentes específicas sobre los servicios, mostradas al final de la página.',
    },
    {
      name: 'ctaBanner',
      title: 'Banner CTA',
      type: 'ctaBanner',
      description: 'Bloque final con un mensaje motivacional y un botón de acción.',
    },
  ],
})
