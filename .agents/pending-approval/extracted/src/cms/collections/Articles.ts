// @ts-nocheck
import { CollectionConfig } from 'payload/types';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sourceName', 'publishedDate', 'importance'],
    group: 'Content Management',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter article headline...',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Direct link to the original publication source.',
        placeholder: 'https://techcrunch.com/example-article',
      },
    },
    {
      name: 'sourceName',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., MIT Technology Review, Wired, TechCrunch',
      },
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AI Policy & Regulation', value: 'AI Policy' },
        { label: 'Tech & Market Trends', value: 'Tech Trends' },
        { label: 'Research Breakthroughs', value: 'Research Breakthroughs' },
        { label: 'Core Infrastructure', value: 'Core Infrastructure' },
      ],
      defaultValue: 'Tech Trends',
    },
    {
      name: 'importance',
      type: 'select',
      required: true,
      options: [
        { label: 'Low Alert', value: 'Low' },
        { label: 'Medium Alert', value: 'Medium' },
        { label: 'High Alert', value: 'High' },
        { label: 'Critical Advisory', value: 'Critical' },
      ],
      defaultValue: 'Medium',
    },
    {
      name: 'customSummary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A brief, concise custom summary of the original article.',
        placeholder: 'Summary of the key points covered in the source publication...',
      },
    },
    {
      name: 'commentary',
      type: 'richText',
      required: true,
      admin: {
        description: 'Our proprietary strategic analysis, critique, or operational commentary on why this news matters to our enterprise partners.',
      },
    },
    {
      name: 'curator',
      type: 'text',
      defaultValue: 'Lycos Strategic Advisory Group',
      required: true,
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

export default Articles;
