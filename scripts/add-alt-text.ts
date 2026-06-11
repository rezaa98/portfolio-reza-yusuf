import { getCliClient } from 'sanity/cli'

const client = getCliClient()
const postId = 'QK4H72SBgS3m4yyqNTWRQP'

async function addAltText() {
  console.log('Adding alt text to images...')

  const post = await client.getDocument(postId)
  const body = post.body || []
  
  const patch = client.patch(postId)
  
  patch.set({
    'mainImage.alt': 'Tim pemenang Build with AI Jakarta berfoto bersama memegang totebag hadiah di atas panggung'
  })
  
  body.forEach((block: any, index: number) => {
    if (block._type === 'image') {
      patch.set({
        [`body[${index}].alt`]: 'Foto bersama seluruh peserta, mentor, dan panitia event Build with AI Jakarta 2026'
      })
    }
  })

  await patch.commit()
  console.log('Alt text added successfully!')
}

addAltText().catch(err => {
  console.error('Error adding alt text:', err)
  process.exit(1)
})
