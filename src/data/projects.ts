export const projects = [
  {
    id: "proj-001",
    title: "JelajahPintar",
    slug: "jelajah-pintar",
    shortDesc: "Aplikasi navigasi cerdas menggunakan AI & Google Maps Platform untuk menemukan spot kuliner/hidden gems yang searah rute perjalanan.",
    longDesc: "JelajahPintar adalah sebuah aplikasi inovatif yang menggabungkan kecerdasan buatan (AI) dengan Google Maps Platform untuk memberikan pengalaman navigasi yang efisien bagi traveler modern. Sistem secara otomatis memindai rute yang telah ditentukan pengguna, lalu menyarankan titik kuliner legendaris dan destinasi wisata (hidden gems) yang berada tepat di sepanjang rute tanpa mengharuskan pengguna melakukan putar balik (zero-detour).",
    category: "ai",
    techStack: ["AI", "Google Maps API", "Web App"],
    thumbnailUrl: "/images/projects/jelajah-pintar.png",
    demoUrl: null,
    githubUrl: "https://github.com/rezaa98/JelajahPintar",
    year: 2026,
    isFeatured: true,
  },
  {
    id: "proj-002",
    title: "LuminaAesthetic",
    slug: "lumina-aesthetic",
    shortDesc: "Aplikasi web berbasis AI untuk analisis geometri wajah dan simulasi kacamata 3D (AR Try-On) menggunakan Face-API dan Gemini AI.",
    longDesc: "LuminaAesthetic adalah Optometric Design Suite cerdas yang menggabungkan Computer Vision (Face-API) dan Generative AI (Gemini Flash) untuk analisis anatomi wajah yang presisi. Fitur utamanya meliputi deteksi geometri wajah 68-titik, simulasi AR coba kacamata virtual dengan penyesuaian otomatis (auto-alignment), analisis tona kulit, serta ekstraksi laporan medis optik ke dalam format PDF yang mendukung bilingual (ID/EN).",
    category: "ai",
    techStack: ["React.js", "Node.js", "Computer Vision (Face-API)", "Gemini AI", "AR Try-On"],
    thumbnailUrl: "/images/projects/lumina-aesthetic.png",
    demoUrl: null,
    githubUrl: "https://github.com/rezaa98/LuminaAesthetic",
    year: 2026,
    isFeatured: true,
  },
  {
    id: "proj-003",
    title: "Machine Learning & CI/CD Pipeline",
    slug: "ml-cicd-pipeline",
    shortDesc: "Proyek eksperimen end-to-end implementasi Exploratory Data Analysis (EDA) untuk prediksi harga rumah California, dilengkapi pipeline otomatis CI/CD.",
    longDesc: "Sebuah portofolio komprehensif yang menampilkan keahlian Data Science dan MLOps. Proyek ini terbagi menjadi dua pilar utama: pertama, perancangan Sistem Machine Learning (SML) berbasis Python untuk memproses dataset California Housing Prices; kedua, penerapan Workflow CI/CD otomatis menggunakan GitHub Actions yang secara konsisten menguji, memvalidasi, dan men-deploy pipeline data secara efisien dan minim bug.",
    category: "ai",
    techStack: ["Machine Learning", "Python", "EDA", "CI/CD", "GitHub Actions"],
    thumbnailUrl: "/images/projects/machine-learning.png",
    demoUrl: null,
    githubUrl: null,
    githubUrls: [
      { name: "ML System", url: "https://github.com/rezaa98/Eksperimen_SML_Reza-Yusuf-Maulana" },
      { name: "CI/CD Workflow", url: "https://github.com/rezaa98/Workflow-CI_Reza-Yusuf-Maulana" }
    ],
    year: 2026,
    isFeatured: true,
  },
  {
    id: "proj-004",
    title: "Mahaga Widya Cita",
    slug: "mahagawi-dyacita",
    shortDesc: "Platform web profesional untuk PT Mahaga Widya Cita — perusahaan consulting dan edukasi terdepan untuk ASN & instansi pemerintah Indonesia.",
    longDesc: "Mahaga Widya Cita adalah platform digital terintegrasi yang saya kembangkan untuk PT Mahaga Widya Cita, sebuah perusahaan konsultasi yang berfokus pada transformasi tata kelola pemerintahan dan pengembangan SDM profesional Indonesia. Platform ini menyediakan tujuh layanan inti: Solusi Tenaga Kerja, Technology & Digital Solutions, Pengembangan Modal Manusia, Penelitian & Studi Strategis, Konsultasi Pajak & Keuangan, Business & Investment Advisory, serta Konsultasi Pemerintahan. Website ini dibangun dengan arsitektur modern menggunakan Next.js 15 sebagai frontend dan Payload CMS sebagai headless CMS backend, serta mendukung multilingual (ID/EN). Platform berhasil menghubungkan 500+ pengguna aktif dengan 50++ mitra institusi strategis termasuk Kemenpan RB, BKN, BPKP, LAN RI, DPR RI, Bappenas, Kemendagri, Kemenkeu, dan Ombudsman RI.",
    category: "web",
    techStack: ["Next.js", "Payload CMS", "TypeScript", "PostgreSQL", "Multilingual"],
    thumbnailUrl: "/images/projects/mahagawi-dyacita.png",
    demoUrl: "https://www.mahagawidyacita.com/id",
    githubUrl: null,
    year: 2026,
    isFeatured: true,
  },
] as const;

export type Project = Omit<(typeof projects)[number], "githubUrls"> & {
  longDesc: string;
  githubUrls?: readonly { name: string; url: string }[];
};
