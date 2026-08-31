import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'

const run = async () => {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })

  // 1. Create Admin User
  console.log('Checking for admin user...')
  const adminEmail = 'admin@lycoscore.local'
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: adminEmail,
      },
    },
  })

  if (existingUsers.totalDocs === 0) {
    console.log('Creating admin user...')
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: 'admin',
      },
    })
    console.log('Admin user created successfully! (Email: admin@lycoscore.local, Password: admin)')
  } else {
    console.log('Admin user already exists.')
  }

  // 2. Read Extracted WordPress Content
  const jsonPath = 'C:/Users/Homebase/.gemini/antigravity-ide/brain/082740e6-324b-498d-ba68-c63ab72843f0/scratch/extracted_wp_content.json'
  if (!fs.existsSync(jsonPath)) {
    console.error('Extracted WordPress content file not found at:', jsonPath)
    process.exit(1)
  }

  console.log('Reading extracted content...')
  const rawData = fs.readFileSync(jsonPath, 'utf-8')
  const items = JSON.parse(rawData)

  // 3. Migrate Pages and Posts
  for (const item of items) {
    if (item.type === 'page') {
      console.log(`Migrating page: "${item.title}"...`)

      // Check if page already exists
      const existingPages = await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: item.slug,
          },
        },
      })

      if (existingPages.totalDocs > 0) {
        console.log(`Page "${item.title}" already exists, skipping.`)
        continue;
      }

      // Structure data
      let layout: any[] = []

      // If it is the home page, map the block layout
      if (item.slug === 'home' || item.slug === 'index') {
        layout = [
          {
            blockType: 'hero',
            tagline: '// COGNITIVE ENGINEERING. APEX INTELLIGENCE',
            title: 'Precision AI Systems.',
            subtitle: 'We architect bespoke AI products, orchestrate enterprise-scale cognitive strategy, and run a high-velocity incubation hub to trial next-generation solutions. Systemic machine intelligence, built to navigate market complexity.',
            exploreBtnText: 'Deploy Solutions',
            partnerBtnText: 'Enter Incubation',
          },
          {
            blockType: 'pillars',
            title: 'Our Core Protocols',
            items: [
              {
                title: 'Cognitive Advisory',
                description: 'Strategic advisory for AI implementation and technology transformation.',
              },
              {
                title: 'System Synthesis',
                description: 'End-to-End development of custom AI tools and platform integrations.',
              },
              {
                title: 'Incubation Den',
                description: 'Accelerating early-stage AI ventures from concept to product market fit.',
              },
              {
                title: 'Autonomous Suites',
                description: 'Developed AI software and service suites for diverse business challenges.',
              },
            ],
          },
          {
            blockType: 'useCase',
            badge: 'FEATURED USE CASE',
            title: 'AI agents that transform your customer service',
            description: 'We customize agent infrastructures to act as a seamless front-line support tier, resolving highly complex enterprise inquiries instantly while retaining deep core operational security.',
            metrics: [
              { value: '92%', label: 'Resolution accuracy rate' },
              { value: '90%', label: 'Reduced operational overhead' },
              { value: 'R3.2M', label: 'Annual financial optimization' },
            ],
            insightTitle: 'Matured Insight: Future of Incubation Hub',
            insightSummary: 'Executive summary exploring emergent validation metrics in secure generative data pipelines.',
            insightLink: 'Read the full case study',
          },
          {
            blockType: 'performance',
            title: 'Internal Hub Performance',
            metrics: [
              { label: 'Resolved Queries', value: '12,842', change: '+22.6% vs last 30 days' },
              { label: 'Resolution Rate', value: '92%', change: '92%' },
              { label: 'Avg. Handle Time', value: '02:18', change: '+1.3% vs last 30 days' },
            ],
          },
          {
            blockType: 'contact',
            title: 'Initiate Engagement',
          },
        ]
      }

      await payload.create({
        collection: 'pages',
        data: {
          title: item.title,
          slug: item.slug,
          layout: layout,
        },
      })
      console.log(`Page "${item.title}" migrated successfully.`)
    } else if (item.type === 'post') {
      console.log(`Migrating post: "${item.title}"...`)

      const existingPosts = await payload.find({
        collection: 'posts',
        where: {
          slug: {
            equals: item.slug,
          },
        },
      })

      if (existingPosts.totalDocs > 0) {
        console.log(`Post "${item.title}" already exists, skipping.`)
        continue;
      }

      await payload.create({
        collection: 'posts',
        data: {
          title: item.title,
          slug: item.slug,
          // Store raw HTML or text in content since we're migrating simple paragraph
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing!',
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
      })
      console.log(`Post "${item.title}" migrated successfully.`)
    }
  }

  console.log('Migration completed successfully!')
  process.exit(0)
}

run().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
