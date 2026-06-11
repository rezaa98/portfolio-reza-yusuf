import { getCliClient } from 'sanity/cli'

const client = getCliClient()

function genKey() {
  return Math.random().toString(36).substring(2, 9)
}

async function createPost() {
  console.log('Creating AdPulse post...')
  
  // Get author and category references
  const authorId = 'author-reza-yusuf'
  const catAiId = 'cat-ai-testing' // Reusing AI Testing category or we can use another one
  
  const post = {
    _type: 'post',
    title: 'Winning 1st Place at Build with AI Jakarta 2026: Classical AI meets Vibe-Coding',
    slug: { current: 'winning-build-with-ai-jakarta-2026-adpulse', _type: 'slug' },
    author: { _type: 'reference', _ref: authorId },
    categories: [{ _type: 'reference', _ref: catAiId, _key: genKey() }],
    publishedAt: new Date('2026-05-24T10:00:00Z').toISOString(),
    excerpt: 'How my team won 1st place at GDG Cloud Jakarta by building AdPulse, a real-time computer vision ad engagement tracker, instead of just another LLM wrapper.',
    body: [
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: "Yesterday at Build with AI Cloud Jakarta 2026 (Garuda Spark Innovation Hub), my team and I decided to take a different approach. The event's theme was all about bridging the gap between imagination and execution. With a full half-day of learning and building, we wanted to create something unique for the #VibInTheCloud build session." }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: "The Sea of LLMs and Our Different Angle" }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: "Almost everyone at the event went straight to generative AI. LLMs here, chatbots there, image generation everywhere. Which is totally fine! But it reminded me of the classic quote:" }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'blockquote',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: '"To the man with a hammer, everything looks like a nail."' }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: "If everyone brings the same hammer (LLMs), all the solutions are going to look the same. So we tried a different angle: Computer Vision. The \"old\" AI. Face landmarks, iris tracking, body pose—this stuff existed way before ChatGPT became famous, and honestly, it is still incredibly powerful." }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: "Introducing AdPulse" }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: "We vibe-coded a tool called AdPulse. It is a browser tool that watches your face while you watch an ad. It tracks your gaze, expression, and overall engagement in real time. The best part? It all runs entirely in the browser tab with zero backend. Just MediaPipe doing face math at 20fps on your laptop (well, at least it runs smoothly on my 2018 ThinkPad)." }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: "Old School meets New School" }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: "The most fun and ironic part of our project? We used modern AI Agents to vibe-code the whole thing. It was classical AI, built by modern AI. Old school meeting new school in the best way possible." }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: genKey(), _type: 'span', marks: [], text: "Is AdPulse a flawless, production-ready product? No lah. It's a 1-hour hackathon project. The engagement weights are basically just vibes. If you watch ads with a poker face, it will say you're not engaged (which is fair enough). But it works, and it proved a point." }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: genKey(), _type: 'span', marks: ['strong'], text: "The voters liked it, and we proudly took home 1st place! 🥇" }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: genKey(), _type: 'span', marks: ['em'], text: "Sometimes the most interesting thing you can build is the one nobody else thinks to bring back." }]
      },
      {
        _key: genKey(),
        _type: 'block',
        style: 'normal',
        markDefs: [
          {
            _key: 'link-repo',
            _type: 'link',
            href: 'https://lnkd.in/gBWFdRCh'
          }
        ],
        children: [
          { _key: genKey(), _type: 'span', marks: [], text: "Check out the repository here: " },
          { _key: genKey(), _type: 'span', marks: ['link-repo'], text: "AdPulse Repo" }
        ]
      }
    ]
  }

  const result = await client.create(post)
  console.log(`Created post successfully! ID: ${result._id}`)
}

createPost().catch(err => {
  console.error('Error creating post:', err)
  process.exit(1)
})
