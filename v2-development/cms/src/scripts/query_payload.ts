import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const run = async () => {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages'
  })
  
  console.log('--- PAYLOAD PAGES ---')
  console.log(JSON.stringify(pages.docs, null, 2))
  process.exit(0)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
