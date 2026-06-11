import { getCliClient } from 'sanity/cli'
import fs from 'fs'

const client = getCliClient()

const images = [
  {
    id: "post-1",
    path: "/Users/mac-095093/.gemini/antigravity-ide/brain/e9648c8f-9870-467d-8640-1ea1c251a499/katalon_playwright_1781200049470.png",
    filename: "katalon-playwright.png"
  },
  {
    id: "post-2",
    path: "/Users/mac-095093/.gemini/antigravity-ide/brain/e9648c8f-9870-467d-8640-1ea1c251a499/ai_voice_testing_1781200061108.png",
    filename: "ai-voice-testing.png"
  },
  {
    id: "post-3",
    path: "/Users/mac-095093/.gemini/antigravity-ide/brain/e9648c8f-9870-467d-8640-1ea1c251a499/shift_left_testing_1781200072293.png",
    filename: "shift-left-testing.png"
  }
]

async function uploadAndUpdate() {
  for (const img of images) {
    console.log(`Uploading ${img.filename}...`)
    const asset = await client.assets.upload('image', fs.createReadStream(img.path), {
      filename: img.filename
    })
    
    console.log(`Updating ${img.id}...`)
    
    await client.patch(img.id).set({
      mainImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      }
    }).commit()
    
    const doc = await client.getDocument(img.id)
    if (doc && doc.body) {
      const imageIndex = doc.body.findIndex((b: any) => b._type === 'image')
      if (imageIndex !== -1) {
        const newBody = [...doc.body]
        newBody[imageIndex] = {
          ...newBody[imageIndex],
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
        await client.patch(img.id).set({ body: newBody }).commit()
      }
    }
  }
  console.log("Done!")
}

uploadAndUpdate().catch(console.error)
