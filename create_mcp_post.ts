import { getCliClient } from 'sanity/cli'
import fs from 'fs'

const client = getCliClient()

const imagePath = "/Users/mac-095093/.gemini/antigravity-ide/brain/e9648c8f-9870-467d-8640-1ea1c251a499/playwright_mcp_1781200626670.png"
const filename = "playwright-mcp.png"

async function createPost() {
  console.log(`Uploading ${filename}...`)
  const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
    filename: filename
  })
  
  const post = {
    _type: 'post',
    title: 'Playwright MCP vs Standard Playwright: Revolutionizing AI Testing',
    slug: { current: 'playwright-mcp-vs-standard' },
    publishedAt: new Date().toISOString(),
    excerpt: 'Memahami arsitektur Model Context Protocol (MCP) pada Playwright, dan apa perbedaannya dengan skrip Playwright standar dalam otomatisasi pengujian.',
    categories: ['AI Testing'],
    isPinned: false,
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
        children: [{ _type: 'span', text: 'Evolusi AI dalam software testing telah membawa paradigma baru, salah satunya adalah pemanfaatan Model Context Protocol (MCP) yang diintegrasikan dengan Playwright.' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Apa itu Playwright Standar?' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Playwright standar adalah framework testing end-to-end yang berjalan berdasarkan skrip eksplisit yang ditulis oleh engineer. Setiap interaksi (klik, ketik, navigasi) harus didefinisikan secara statis. Jika struktur DOM (Document Object Model) berubah, skrip tersebut rentan rusak (flaky) dan memerlukan maintenance.' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Apa itu Playwright MCP?' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Model Context Protocol (MCP) adalah standar arsitektur yang memungkinkan agen AI (seperti Claude atau Gemini) untuk terhubung secara langsung ke berbagai tools. Ketika Playwright diintegrasikan sebagai MCP server, agen AI dapat berinteraksi dengan browser secara dinamis.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Perbedaan utama: Playwright MCP memberikan AI "mata" dan "tangan" untuk mengoperasikan browser otonom tanpa skrip statis. AI dapat menginspeksi halaman, mencari elemen berdasarkan intensi visual atau semantik, dan secara otomatis beradaptasi meskipun struktur DOM aplikasi berubah.' }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Keuntungan Utama MCP' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Zero-Maintenance Scripts: Menghilangkan kebutuhan update skrip saat UI berubah.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Intent-Based Actions: Cukup instruksikan "Klik tombol Checkout", AI akan mencari dan mengeksekusinya.' }]
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Self-Healing Tests: Secara alami mampu memperbaiki error ringan saat runtime.' }]
      }
    ]
  }
  
  console.log(`Creating post document...`)
  await client.create(post)
  console.log("Post created successfully!")
}

createPost().catch(console.error)
