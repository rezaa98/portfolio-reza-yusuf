const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const id = JSON.parse(fs.readFileSync('messages/id.json', 'utf8'));

const webDemoEn = {
  "Hero": {
    "title1": "Automation & CI/CD",
    "title2": "Showcase",
    "description": "An interactive demonstration of my QA Engineering workflow. This page simulates how automated tests are written using Playwright, executed through CI/CD pipelines, and monitored via reporting dashboards.",
    "btnExplore": "Explore Demo",
    "btnViewProjects": "View Real Projects"
  },
  "Sections": {
    "s1Title": "Test Scenario Documentation",
    "s1Desc": "A repository of the end-to-end testing scenarios designed for this portfolio. Click on any test case to view its detailed documentation, steps, and expected results.",
    "s2Title": "Live Test Execution",
    "s2Desc": "Simulating a Playwright E2E test execution. Click \"Run Test\" to observe the automated scenario stepping through expected vs actual results in real-time.",
    "s3Title": "Pipeline Visualizer",
    "s3Desc": "A representation of a Continuous Integration workflow. Automation tests are triggered automatically on push, ensuring code quality before deployment.",
    "s4Title": "Automation Report",
    "s4Desc": "Mock reporting dashboard tracking test suite health, execution time, and detailed failure logs to quickly identify and resolve regressions.",
    "s5Title": "Agentic AI Test Generator",
    "s5Desc": "Experience the future of QA Automation. This live chatbot is powered by Google Gemini 1.5, strictly configured to generate Playwright TypeScript scripts. Try prompting it to write a test scenario!",
    "s5Link": "View Full MCP Source Code"
  },
  "TestCaseRepository": {
    "header": "Test Scenario Repository",
    "description": "Description",
    "testData": "Test Data",
    "automationStatus": "Automation Status",
    "testSteps": "Test Steps",
    "expectedResult": "Expected Result",
    "automated": "Automated (Playwright)",
    "manual": "Manual",
    "testCases": {
      "TC-001": {
        "name": "Verify Homepage Load and Welcome Text",
        "description": "Ensure the homepage loads correctly and the main H1 welcome text is visible.",
        "label": "Positive",
        "status": "Passed",
        "expectedResult": "The homepage renders successfully with the H1 heading clearly visible.",
        "steps": [
          "Navigate to the English homepage ('/en').",
          "Wait for the network state to be idle.",
          "Locate the H1 heading containing the user's name.",
          "Assert that the heading is visible on the screen."
        ]
      },
      "TC-002": {
        "name": "Verify Web Demo Navigation",
        "description": "Verify that users can navigate from the homepage to the Web Demo page using the main navigation link.",
        "label": "Positive",
        "status": "Passed",
        "expectedResult": "User is successfully redirected to the Web Demo page and the correct heading is displayed.",
        "steps": [
          "Navigate to the English homepage ('/en').",
          "Locate the 'Web Demo' link in the navigation menu.",
          "Click the 'Web Demo' link.",
          "Wait for the URL to change to include '/web-demo'.",
          "Verify the H1 heading 'Automation & CI/CD Showcase' is visible."
        ]
      },
      "TC-003": {
        "name": "Verify Localization Switcher",
        "description": "Ensure that changing the language from English to Indonesian correctly updates the text content on the page.",
        "label": "Positive",
        "status": "Passed",
        "expectedResult": "The website successfully changes the locale and translates the target text to Indonesian.",
        "steps": [
          "Navigate to the English homepage ('/en').",
          "Verify initial English text ('Available for new opportunities').",
          "Locate and click the localization dropdown/button.",
          "Select 'Indonesia (ID)' from the options.",
          "Wait for navigation and network state to be idle.",
          "Verify the URL contains '/id'.",
          "Assert that the text has updated to Indonesian ('Terbuka untuk peluang baru')."
        ]
      },
      "TC-004": {
        "name": "Negative Test: Verify 404 on Invalid Route",
        "description": "Ensure that navigating to a non-existent route correctly renders a 404 error page instead of crashing.",
        "label": "Negative",
        "status": "Passed",
        "expectedResult": "The server returns a 404 HTTP status and the Next.js default 404 page is rendered to the user.",
        "steps": [
          "Attempt to navigate to the non-existent URL.",
          "Capture the HTTP response status code.",
          "Assert that the HTTP response status is exactly 404.",
          "Locate the H2 heading on the page.",
          "Assert the heading contains the text 'This page could not be found'."
        ]
      },
      "TC-005": {
        "name": "Edge Test: Verify Mobile Navigation Menu",
        "description": "Verify that the responsive mobile hamburger menu appears and functions correctly on small screens.",
        "label": "Edge",
        "status": "Passed",
        "expectedResult": "The mobile menu button is present on small screens, and clicking it successfully reveals the hidden navigation links.",
        "steps": [
          "Set the browser viewport size to mobile dimensions (375x812).",
          "Navigate to the homepage.",
          "Locate the hamburger menu button (visible only on mobile).",
          "Assert that the hamburger menu button is visible.",
          "Click the menu button to expand the navigation.",
          "Verify that the 'About' link becomes visible in the expanded menu."
        ]
      }
    }
  },
  "PlaywrightSimulator": {
    "runTest": "Run Test",
    "running": "Running...",
    "terminal": "Terminal",
    "clickToRun": "Click \"Run Test\" to execute Playwright scenario."
  },
  "PipelineVisualizer": {
    "viewRealReport": "View Real Report",
    "runWorkflow": "Run Workflow",
    "running": "Running...",
    "pending": "Pending",
    "completedText": "Workflow completed successfully. Automation tests passed and deployed to staging.",
    "stages": {
      "checkout": "Checkout Code",
      "install": "Install Dependencies",
      "lint": "Run Linter",
      "test": "Playwright E2E Tests",
      "deploy": "Deploy to Staging"
    }
  },
  "TestReportDashboard": {
    "title": "Automation Test Report",
    "subtitle": "Generated by Playwright Reporter",
    "viewUiSummary": "View UI Summary",
    "viewRawHtml": "View Raw HTML Report",
    "totalTests": "Total Tests",
    "passRate": "Pass Rate",
    "duration": "Duration",
    "passed": "Passed",
    "failed": "Failed",
    "skipped": "Skipped",
    "tests": {
      "t1": "Verify Homepage Load and Welcome Text",
      "t2": "Verify Web Demo Navigation",
      "t3": "Verify Localization Switcher",
      "t4": "Negative Test: Verify 404 on Invalid Route",
      "t5": "Edge Test: Verify Mobile Navigation Menu"
    }
  },
  "AgentChatSimulator": {
    "placeholder": "e.g., 'Write a test to verify the login form'",
    "send": "Send"
  }
};

const webDemoId = {
  "Hero": {
    "title1": "Etalase",
    "title2": "Otomatisasi & CI/CD",
    "description": "Demonstrasi interaktif dari alur kerja QA Engineering saya. Halaman ini menyimulasikan bagaimana pengujian otomatis ditulis menggunakan Playwright, dieksekusi melalui pipeline CI/CD, dan dipantau melalui dasbor pelaporan.",
    "btnExplore": "Jelajahi Demo",
    "btnViewProjects": "Lihat Proyek Asli"
  },
  "Sections": {
    "s1Title": "Dokumentasi Skenario Uji",
    "s1Desc": "Repositori skenario pengujian end-to-end yang dirancang untuk portofolio ini. Klik pada kasus uji mana saja untuk melihat dokumentasi detail, langkah-langkah, dan hasil yang diharapkan.",
    "s2Title": "Eksekusi Uji Langsung",
    "s2Desc": "Menyimulasikan eksekusi pengujian Playwright E2E. Klik \"Jalankan Pengujian\" untuk mengamati skenario otomatisasi melangkah melalui hasil yang diharapkan vs aktual secara real-time.",
    "s3Title": "Visualizer Pipeline",
    "s3Desc": "Representasi dari alur kerja Continuous Integration. Pengujian otomatisasi dipicu secara otomatis saat push, memastikan kualitas kode sebelum deployment.",
    "s4Title": "Laporan Otomatisasi",
    "s4Desc": "Dasbor pelaporan simulasi yang melacak kesehatan rangkaian pengujian, waktu eksekusi, dan log kegagalan terperinci untuk mengidentifikasi dan menyelesaikan regresi dengan cepat.",
    "s5Title": "Generator Uji AI Agentic",
    "s5Desc": "Rasakan masa depan QA Automation. Chatbot live ini didukung oleh Google Gemini 1.5, dikonfigurasi secara ketat untuk menghasilkan skrip TypeScript Playwright. Coba berikan instruksi untuk menulis skenario pengujian!",
    "s5Link": "Lihat Kode Sumber Lengkap MCP"
  },
  "TestCaseRepository": {
    "header": "Repositori Skenario Pengujian",
    "description": "Deskripsi",
    "testData": "Data Uji",
    "automationStatus": "Status Otomatisasi",
    "testSteps": "Langkah Pengujian",
    "expectedResult": "Hasil yang Diharapkan",
    "automated": "Otomatis (Playwright)",
    "manual": "Manual",
    "testCases": {
      "TC-001": {
        "name": "Verifikasi Pemuatan Beranda dan Teks Sambutan",
        "description": "Memastikan beranda dimuat dengan benar dan teks sambutan H1 utama terlihat.",
        "label": "Positif",
        "status": "Lulus",
        "expectedResult": "Beranda berhasil dimuat dengan heading H1 terlihat jelas.",
        "steps": [
          "Navigasi ke beranda bahasa Inggris ('/en').",
          "Tunggu status jaringan hingga idle.",
          "Temukan heading H1 yang berisi nama pengguna.",
          "Pastikan heading terlihat di layar."
        ]
      },
      "TC-002": {
        "name": "Verifikasi Navigasi Demo Web",
        "description": "Memverifikasi bahwa pengguna dapat bernavigasi dari beranda ke halaman Demo Web menggunakan tautan navigasi utama.",
        "label": "Positif",
        "status": "Lulus",
        "expectedResult": "Pengguna berhasil diarahkan ke halaman Demo Web dan heading yang benar ditampilkan.",
        "steps": [
          "Navigasi ke beranda bahasa Inggris ('/en').",
          "Temukan tautan 'Web Demo' di menu navigasi.",
          "Klik tautan 'Web Demo'.",
          "Tunggu hingga URL berubah menyertakan '/web-demo'.",
          "Verifikasi heading H1 'Automation & CI/CD Showcase' terlihat."
        ]
      },
      "TC-003": {
        "name": "Verifikasi Pengalih Bahasa",
        "description": "Memastikan bahwa mengubah bahasa dari Inggris ke Indonesia memperbarui konten teks pada halaman dengan benar.",
        "label": "Positif",
        "status": "Lulus",
        "expectedResult": "Situs web berhasil mengubah bahasa dan menerjemahkan teks target ke bahasa Indonesia.",
        "steps": [
          "Navigasi ke beranda bahasa Inggris ('/en').",
          "Verifikasi teks awal bahasa Inggris ('Available for new opportunities').",
          "Temukan dan klik dropdown/tombol pelokalan.",
          "Pilih 'Indonesia (ID)' dari opsi.",
          "Tunggu hingga navigasi dan status jaringan idle.",
          "Verifikasi URL berisi '/id'.",
          "Pastikan teks telah diperbarui ke bahasa Indonesia ('Terbuka untuk peluang baru')."
        ]
      },
      "TC-004": {
        "name": "Uji Negatif: Verifikasi 404 pada Rute Tidak Valid",
        "description": "Memastikan bahwa menavigasi ke rute yang tidak ada merender halaman kesalahan 404 dengan benar alih-alih crash.",
        "label": "Negatif",
        "status": "Lulus",
        "expectedResult": "Server mengembalikan status HTTP 404 dan halaman 404 bawaan Next.js ditampilkan kepada pengguna.",
        "steps": [
          "Coba navigasikan ke URL yang tidak ada.",
          "Tangkap kode status respons HTTP.",
          "Pastikan status respons HTTP adalah persis 404.",
          "Temukan heading H2 di halaman.",
          "Pastikan heading berisi teks 'This page could not be found'."
        ]
      },
      "TC-005": {
        "name": "Uji Edge: Verifikasi Menu Navigasi Seluler",
        "description": "Memverifikasi bahwa menu hamburger seluler responsif muncul dan berfungsi dengan benar pada layar kecil.",
        "label": "Edge",
        "status": "Lulus",
        "expectedResult": "Tombol menu seluler ada pada layar kecil, dan mengkliknya berhasil menampilkan tautan navigasi yang tersembunyi.",
        "steps": [
          "Atur ukuran viewport browser ke dimensi seluler (375x812).",
          "Navigasi ke beranda.",
          "Temukan tombol menu hamburger (hanya terlihat di seluler).",
          "Pastikan tombol menu hamburger terlihat.",
          "Klik tombol menu untuk memperluas navigasi.",
          "Verifikasi bahwa tautan 'About' menjadi terlihat di menu yang diperluas."
        ]
      }
    }
  },
  "PlaywrightSimulator": {
    "runTest": "Jalankan Pengujian",
    "running": "Berjalan...",
    "terminal": "Terminal",
    "clickToRun": "Klik \"Jalankan Pengujian\" untuk mengeksekusi skenario Playwright."
  },
  "PipelineVisualizer": {
    "viewRealReport": "Lihat Laporan Asli",
    "runWorkflow": "Jalankan Workflow",
    "running": "Berjalan...",
    "pending": "Tertunda",
    "completedText": "Workflow berhasil diselesaikan. Pengujian otomatisasi lulus dan di-deploy ke staging.",
    "stages": {
      "checkout": "Checkout Kode",
      "install": "Instal Dependensi",
      "lint": "Jalankan Linter",
      "test": "Playwright E2E Test",
      "deploy": "Deploy ke Staging"
    }
  },
  "TestReportDashboard": {
    "title": "Laporan Uji Otomatisasi",
    "subtitle": "Dihasilkan oleh Playwright Reporter",
    "viewUiSummary": "Lihat Ringkasan UI",
    "viewRawHtml": "Lihat HTML Laporan Mentah",
    "totalTests": "Total Pengujian",
    "passRate": "Tingkat Kelulusan",
    "duration": "Durasi",
    "passed": "Lulus",
    "failed": "Gagal",
    "skipped": "Dilewati",
    "tests": {
      "t1": "Verifikasi Pemuatan Beranda dan Teks Sambutan",
      "t2": "Verifikasi Navigasi Demo Web",
      "t3": "Verifikasi Pengalih Bahasa",
      "t4": "Uji Negatif: Verifikasi 404 pada Rute Tidak Valid",
      "t5": "Uji Edge: Verifikasi Menu Navigasi Seluler"
    }
  },
  "AgentChatSimulator": {
    "placeholder": "contoh, 'Tulis test untuk memverifikasi form login'",
    "send": "Kirim"
  }
};

en.WebDemo = webDemoEn;
id.WebDemo = webDemoId;

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2) + '\n');
fs.writeFileSync('messages/id.json', JSON.stringify(id, null, 2) + '\n');
