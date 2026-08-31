import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          fields: [
            { name: 'tagline', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'subtitle', type: 'text' },
            { name: 'exploreBtnText', type: 'text' },
            { name: 'partnerBtnText', type: 'text' },
          ],
        },
        {
          slug: 'pillars',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          slug: 'framework',
          fields: [
            { name: 'title', type: 'text' },
            {
              name: 'steps',
              type: 'array',
              fields: [
                { name: 'stepNumber', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'focus', type: 'text' },
                { name: 'deliverables', type: 'textarea' },
              ],
            },
          ],
        },
        {
          slug: 'deepDive',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'subtitle', type: 'text' },
            {
              name: 'panels',
              type: 'array',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'overview', type: 'textarea' },
                { name: 'focusAreas', type: 'textarea' },
                { name: 'image', type: 'relationship', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          slug: 'useCase',
          fields: [
            { name: 'badge', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'metrics',
              type: 'array',
              fields: [
                { name: 'value', type: 'text' },
                { name: 'label', type: 'text' },
              ],
            },
            { name: 'insightTitle', type: 'text' },
            { name: 'insightSummary', type: 'textarea' },
            { name: 'insightLink', type: 'text' },
          ],
        },
        {
          slug: 'performance',
          fields: [
            { name: 'title', type: 'text' },
            {
              name: 'metrics',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'value', type: 'text' },
                { name: 'change', type: 'text' },
              ],
            },
          ],
        },
        {
          slug: 'contact',
          fields: [
            { name: 'title', type: 'text' },
          ],
        },
      ],
    },
  ],
}
