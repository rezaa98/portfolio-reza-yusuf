import { getCliClient } from 'sanity/cli'
import fs from 'fs'

const client = getCliClient()

const imagePath = "/Users/mac-095093/.gemini/antigravity-ide/brain/a5bbf645-f1ab-4268-a7bb-4619b45ff3b3/rag_guardrails_ai_1781977970621.png"
const filename = "rag-guardrails.png"

async function createPost() {
  console.log(`Uploading ${filename}...`)
  const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
    filename: filename
  })
  
  const post = {
    _type: 'post',
    title: 'Meningkatkan Akurasi Agentic AI dengan RAG & Guardrails',
    slug: { current: 'meningkatkan-akurasi-ai-dengan-rag-guardrails' },
    publishedAt: new Date().toISOString(),
    excerpt: 'Penerapan arsitektur Retrieval-Augmented Generation (RAG) dan AI Guardrails pada sistem chat simulator untuk mengunci konteks dan meningkatkan kualitas generasi test case Playwright.',
    categories: ['AI Testing'],
    isPinned: true,
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Seiring dengan adopsi Agentic AI di dalam Software Testing, masalah utama yang sering dihadapi adalah halusinasi dan keluarnya model dari konteks utama (off-topic). Pada rilis terbaru QA Portfolio ini, kami telah menuntaskan masalah tersebut secara elegan melalui arsitektur Lightweight RAG (Retrieval-Augmented Generation) dan Strict AI Guardrails.' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Apa Itu AI Guardrails?' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'AI Guardrails adalah pagar pengaman atau boundary yang kami pasang pada lapisan prompt dan API. Dengan guardrails yang ketat, AI tidak akan pernah melayani pertanyaan umum di luar konteks (misalnya: menanyakan resep masakan, cuaca, atau membuat game). Ini menjaga profesionalitas dan melindungi batasan kuota API dari penyalahgunaan (Token Abuse).' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Integrasi Lightweight RAG' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Meskipun Gemini 2.5 memiliki kecerdasan yang hebat, ia tidak memiliki pengetahuan mengenai struktur spesifik website portofolio ini. Di sinilah RAG berperan.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Alih-alih menggunakan Vector Database yang berat, kami menyuntikkan (inject) representasi Markdown dari struktur asli Document Object Model (DOM) dan fitur utama aplikasi langsung ke dalam System Context (In-Memory Context-Injection). Pendekatan ini disebut "Lightweight RAG".' }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Manfaat Nyata RAG & Guardrails:' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Akurasi Ekstrem: AI dapat menghasilkan locator Playwright yang presisi karena ia "membaca" struktur HTML yang di-supply oleh RAG (misalnya ia tahu adanya elemen input[name="email"] pada form Contact).' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Keamanan Fokus: Model secara sopan akan menolak task di luar scope Software QA dan Playwright E2E Testing.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Zero Config Dependencies: Semuanya berjalan mulus pada lingkungan Serverless Next.js (Edge/Node) tanpa latensi dari koneksi ke VectorDB eksternal.' }]
      }
    ]
  }
  
  console.log(`Creating post document...`)
  await client.create(post)
  console.log("Post created successfully!")
}

createPost().catch(console.error)
