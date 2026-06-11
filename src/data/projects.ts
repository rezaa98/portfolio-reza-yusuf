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
    shortDesc: "Web application system yang dikembangkan untuk manajemen klinik estetik secara komprehensif.",
    longDesc: "LuminaAesthetic adalah platform berbasis web komprehensif yang dirancang secara khusus untuk memenuhi kebutuhan operasional klinik estetik. Platform ini menyediakan antarmuka pengguna yang modern dan intuitif untuk memfasilitasi pemesanan jadwal konsultasi, manajemen data klien, serta pelacakan riwayat perawatan. Berfokus pada kemudahan navigasi (UI/UX) serta keandalan pengelolaan database yang aman dan terstruktur.",
    category: "web",
    techStack: ["Web Development", "UI/UX", "Management System"],
    thumbnailUrl: "/images/projects/lumina-aesthetic.png",
    demoUrl: null,
    githubUrl: "https://github.com/rezaa98/LuminaAesthetic",
    year: 2026,
    isFeatured: true,
  },
  {
    id: "proj-003",
    title: "Machine Learning & CI/CD Pipeline",
    slug: "ml-cicd-dicoding",
    shortDesc: "Proyek eksperimen implementasi model Machine Learning beserta pipeline otomatis Continuous Integration & Deployment (CI/CD) sebagai bagian dari sertifikasi Dicoding.",
    longDesc: "Sebuah portofolio komprehensif yang dibuat sebagai syarat penyelesaian sertifikasi Dicoding. Proyek ini terbagi menjadi dua pilar utama: pertama, perancangan Sistem Machine Learning andal menggunakan Python dan teknik Data Science modern untuk model prediktif; kedua, penerapan Workflow CI/CD otomatis menggunakan GitHub Actions yang secara konsisten menguji, memvalidasi, dan men-deploy pembaruan sistem secara langsung. Hasilnya adalah siklus pengembangan yang efisien dan minim bug.",
    category: "ai",
    techStack: ["Machine Learning", "Python", "CI/CD", "GitHub Actions"],
    thumbnailUrl: null,
    demoUrl: null,
    githubUrl: null,
    githubUrls: [
      { name: "ML System", url: "https://github.com/rezaa98/Eksperimen_SML_Reza-Yusuf-Maulana" },
      { name: "CI/CD Workflow", url: "https://github.com/rezaa98/Workflow-CI_Reza-Yusuf-Maulana" }
    ],
    year: 2026,
    isFeatured: true,
  },
] as const;

export type Project = Omit<(typeof projects)[number], "githubUrls"> & {
  longDesc: string;
  githubUrls?: readonly { name: string; url: string }[];
};
