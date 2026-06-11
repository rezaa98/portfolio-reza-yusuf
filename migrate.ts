import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function migrate() {
  console.log("Setting isPinned: true for QK4H72SBgS3m4yyqNTWRQP...")
  await client.patch('QK4H72SBgS3m4yyqNTWRQP').set({ isPinned: true }).commit()

  const expandedPosts = [
    {
      id: "post-1",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", marks: [], text: "Test automation is evolving rapidly. Recently, we decided to migrate our massive Katalon test suite to Playwright to improve our CI/CD pipeline's reliability and execution speed. Katalon had served us well, but as our application grew in complexity, we began facing flakiness and high resource consumption during parallel runs."}]
        },
        { _type: "image" },
        {
          _type: "block",
          style: "h2",
          children: [{_type: "span", marks: [], text: "Why Playwright?"}]
        },
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", marks: [], text: "Playwright offers built-in auto-waiting, a fantastic tracing viewer, and seamless cross-browser testing. Its ability to intercept network requests natively gave us the power to mock heavy third-party APIs, drastically reducing test execution time from 45 minutes to just under 8 minutes."}]
        },
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", marks: [], text: "The migration wasn't without challenges. Rewriting thousands of Groovy scripts into TypeScript required a solid design pattern. We adopted the Page Object Model (POM) and implemented custom fixtures. This guide details our exact roadmap, from proof-of-concept to full deployment."}]
        }
      ]
    },
    {
      id: "post-2",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", marks: [], text: "Testing AI models, especially speech-to-text engines, requires a fundamentally different approach compared to traditional deterministic software. When an LLM evaluates audio, minor variations in background noise or accent can produce vastly different outputs."}]
        },
        { _type: "image" },
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", marks: [], text: "To tackle this, we built an automated evaluation pipeline. We curated a 'Golden Dataset' of 1,000 diverse audio samples with perfect human transcriptions. Our automation script feeds these samples into the AI model and calculates the Word Error Rate (WER) using Levenshtein distance algorithms."}]
        },
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", marks: [], text: "By tracking WER trends over time in our CI dashboard, we successfully prevented several degraded AI models from reaching production, ensuring our voice recognition features remained top-tier."}]
        }
      ]
    },
    {
      id: "post-3",
      body: [
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", marks: [], text: "Shift-left testing is more than just a buzzword. By integrating Quality Assurance right from the requirements phase, we transformed our delivery lifecycle. Instead of waiting for a fully built feature, QA engineers now collaborate with product managers during wireframing to identify edge cases early."}]
        },
        { _type: "image" },
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", marks: [], text: "This proactive approach forced us to adopt Behaviour-Driven Development (BDD). We write Gherkin syntax scenarios that serve as both living documentation and automated tests. It significantly bridged the communication gap between business and engineering."}]
        },
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", marks: [], text: "The results? A 40% reduction in critical production bugs and a much happier development team who rarely deal with last-minute release blockers."}]
        }
      ]
    }
  ]

  for (const post of expandedPosts) {
    console.log("Updating", post.id)
    await client.patch(post.id).set({ body: post.body }).commit()
  }

  console.log("Done!")
}

migrate().catch(console.error)
