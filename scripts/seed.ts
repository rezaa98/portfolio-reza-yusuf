import { getCliClient } from 'sanity/cli'

const client = getCliClient()

function genKey() {
  return Math.random().toString(36).substring(2, 9)
}

async function seed() {
  console.log('Seeding Sanity database...')
  
  // 1. Create Author
  const authorId = 'author-reza-yusuf'
  const author = await client.createIfNotExists({
    _id: authorId,
    _type: 'author',
    name: 'Reza Yusuf Maulana',
    slug: { current: 'reza-yusuf-maulana', _type: 'slug' },
    bio: [
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: 'QA Engineer and Developer.' }]
      }
    ]
  })
  console.log(`Created author: ${author.name}`)

  // 2. Create Categories
  const catQaId = 'cat-qa-automation'
  const catQa = await client.createIfNotExists({
    _id: catQaId,
    _type: 'category',
    title: 'QA Automation',
    description: 'Posts about Quality Assurance and Test Automation'
  })

  const catAiId = 'cat-ai-testing'
  const catAi = await client.createIfNotExists({
    _id: catAiId,
    _type: 'category',
    title: 'AI Testing',
    description: 'Testing non-deterministic models and AI applications'
  })

  const catProcessId = 'cat-process'
  const catProcess = await client.createIfNotExists({
    _id: catProcessId,
    _type: 'category',
    title: 'Process',
    description: 'Software development life cycle and agile methodologies'
  })

  // 3. Create Posts
  const posts = [
    {
      _id: 'post-1',
      _type: 'post',
      title: 'Migrating from Katalon to Playwright: A Practical Guide',
      slug: { current: 'migrating-katalon-to-playwright', _type: 'slug' },
      author: { _type: 'reference', _ref: authorId },
      categories: [{ _type: 'reference', _ref: catQaId, _key: genKey() }],
      publishedAt: new Date().toISOString(),
      excerpt: 'Lessons learned while modernizing our E2E testing framework for better stability and execution speed.',
      body: [
        {
          _key: genKey(),
          _type: 'block',
          style: 'normal',
          children: [{ _key: genKey(), _type: 'span', marks: [], text: 'Test automation is evolving rapidly. Recently, we decided to migrate our massive Katalon test suite to Playwright...' }]
        }
      ]
    },
    {
      _id: 'post-2',
      _type: 'post',
      title: 'AI in Test Automation: Evaluating Voice-to-Text Accuracy',
      slug: { current: 'ai-in-test-automation', _type: 'slug' },
      author: { _type: 'reference', _ref: authorId },
      categories: [{ _type: 'reference', _ref: catAiId, _key: genKey() }],
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      excerpt: 'Strategies for testing non-deterministic AI models and establishing ground truth for LLM automated scoring.',
      body: [
        {
          _key: genKey(),
          _type: 'block',
          style: 'normal',
          children: [{ _key: genKey(), _type: 'span', marks: [], text: 'Testing AI models, especially speech-to-text engines, requires a fundamentally different approach compared to traditional deterministic software...' }]
        }
      ]
    },
    {
      _id: 'post-3',
      _type: 'post',
      title: 'Shift-Left Testing: Integrating QA Early in the SDLC',
      slug: { current: 'shift-left-testing', _type: 'slug' },
      author: { _type: 'reference', _ref: authorId },
      categories: [{ _type: 'reference', _ref: catProcessId, _key: genKey() }],
      publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      excerpt: 'How involving QA early prevents critical defects and reduces time-to-market in complex financial systems.',
      body: [
        {
          _key: genKey(),
          _type: 'block',
          style: 'normal',
          children: [{ _key: genKey(), _type: 'span', marks: [], text: 'Shift-left testing is more than just a buzzword. By integrating Quality Assurance right from the requirements phase...' }]
        }
      ]
    }
  ]

  for (const post of posts) {
    await client.createOrReplace(post)
    console.log(`Created post: ${post.title}`)
  }

  console.log('Seeding completed!')
}

seed().catch(err => {
  console.error('Error seeding data:', err)
  process.exit(1)
})
