import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'fs'

const client = getCliClient()
const postId = 'QK4H72SBgS3m4yyqNTWRQP'

async function uploadImages() {
  console.log('Uploading images to Sanity...')
  
  const img1Path = '/Users/mac-095093/.gemini/antigravity-ide/brain/e9648c8f-9870-467d-8640-1ea1c251a499/media__1781173004471.png'
  const img2Path = '/Users/mac-095093/.gemini/antigravity-ide/brain/e9648c8f-9870-467d-8640-1ea1c251a499/media__1781173055156.png'
  
  const asset1 = await client.assets.upload('image', createReadStream(img1Path), {
    filename: 'team-photo.png'
  })
  console.log('Image 1 uploaded:', asset1._id)

  const asset2 = await client.assets.upload('image', createReadStream(img2Path), {
    filename: 'group-photo.png'
  })
  console.log('Image 2 uploaded:', asset2._id)

  await client
    .patch(postId)
    .set({
      mainImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset1._id
        }
      }
    })
    .insert('after', 'body[-1]', [
      {
        _key: Math.random().toString(36).substring(2, 9),
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset2._id
        }
      }
    ])
    .commit()

  console.log('Post updated with images successfully!')
}

uploadImages().catch(err => {
  console.error('Error uploading images:', err)
  process.exit(1)
})
