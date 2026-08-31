import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const run = async () => {
  const payload = await getPayload({ config })
  
  const homePage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home'
      }
    }
  })
  
  const consultingPage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'ai-consulting'
      }
    }
  })

  console.log('--- HOME PAGE LAYOUT ---')
  if (homePage.docs.length > 0) {
    console.log(JSON.stringify(homePage.docs[0].layout, null, 2))
  } else {
    console.log('Home page not found!')
  }

  console.log('--- AI CONSULTING PAGE LAYOUT ---')
  if (consultingPage.docs.length > 0) {
    console.log(JSON.stringify(consultingPage.docs[0].layout, null, 2))
  } else {
    console.log('AI Consulting page not found!')
  }
  
  process.exit(0)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
