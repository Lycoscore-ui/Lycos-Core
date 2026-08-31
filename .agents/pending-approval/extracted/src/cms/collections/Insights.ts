// @ts-nocheck
import { CollectionConfig } from 'payload/types';

export const Insights: CollectionConfig = {
  slug: 'insights',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'status'],
    group: 'Content Management',
  },
  access: {
    read: () => true, // Publicly accessible to view
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter thought leadership title...',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: 'e.g., future-of-agentic-frameworks',
        description: 'Used for the web URL slug.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AI Governance', value: 'AI Governance' },
        { label: 'Agentic Frameworks', value: 'Agentic Frameworks' },
        { label: 'Neural Architectures', value: 'Neural Architectures' },
        { label: 'Strategic Advisory', value: 'Strategic Advisory' },
      ],
      defaultValue: 'AI Governance',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'readTime',
      type: 'number',
      required: true,
      admin: {
        description: 'Estimated reading time in minutes',
        placeholder: '5',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Published', value: 'Published' },
      ],
      defaultValue: 'Draft',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media', // References a media collection
      required: false,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A brief 2-3 sentence overview of the article for list grids.',
      },
    },
    {
      name: 'content',
      type: 'richText', // Rich text editor for modular storytelling
      required: true,
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Principal AI Strategist',
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          required: false,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
};

export default Insights;
