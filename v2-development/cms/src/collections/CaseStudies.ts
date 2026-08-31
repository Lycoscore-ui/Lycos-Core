import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['clientName', 'title', 'industry', 'featured'],
    group: 'Content Management',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., Global Logistics Corp',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter case study headline...',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: 'e.g., predictive-maintenance-iot-scale',
      },
    },
    {
      name: 'industry',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., Manufacturing, Finance, Healthcare',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on Homepage / Highlight Carousel',
      defaultValue: false,
    },
    {
      name: 'projectDuration',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., 6 Months, Q2 2026',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'metrics',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      labels: {
        singular: 'Performance Metric',
        plural: 'Performance Metrics',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., 92%, R3.2M, +34%',
            description: 'The raw statistical impact value',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., reduction in operational overhead',
            description: 'Short label explaining the metric',
          },
        },
        {
          name: 'isHighlight',
          type: 'checkbox',
          label: 'Highlight in Large Stat Blocks',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'problem',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Detailed analysis of the clients original operational bottlenecks or market challenges.',
      },
    },
    {
      name: 'solution',
      type: 'richText',
      required: true,
      admin: {
        description: 'Deep dive into the custom AI agents, model architectures, and pipelines implemented to solve the problem.',
      },
    },
    {
      name: 'results',
      type: 'richText',
      required: true,
      admin: {
        description: 'Quantitative and qualitative outcomes, ROI validation, and long-term strategic results.',
      },
    },
    {
      name: 'techStack',
      type: 'array',
      required: true,
      labels: {
        singular: 'Technology Used',
        plural: 'Technology Stack',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., FastAPI, PyTorch, PostgreSQL, Gemini Pro',
          },
        },
      ],
    },
  ],
}

export default CaseStudies
