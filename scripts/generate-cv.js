const puppeteer = require("puppeteer");
const path = require("path");

const OUTPUT_PATH = path.join(__dirname, "..", "public", "CV_Reza_Yusuf_Maulana.pdf");

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV - Reza Yusuf Maulana</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Helvetica, Arial, sans-serif;
      font-size: 9pt;
      line-height: 1.4;
      color: #1a1a1a;
      text-align: justify;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── Header ── */
    .header {
      text-align: center;
      margin-bottom: 5pt;
      border-bottom: 2pt solid #1a1a1a;
      padding-bottom: 8pt;
    }

    .header h1 {
      font-size: 18pt;
      font-weight: 700;
      letter-spacing: 2pt;
      margin-bottom: 2pt;
      text-transform: uppercase;
    }

    .header .subtitle {
      font-size: 10pt;
      font-weight: 400;
      color: #444;
      margin-bottom: 5pt;
    }

    .contact-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 4pt 12pt;
      font-size: 8pt;
      color: #333;
    }

    .contact-row a {
      color: #1a5276;
      text-decoration: none;
    }

    .contact-row .sep {
      color: #aaa;
    }

    /* ── Section ── */
    .section {
      margin-bottom: 7pt;
    }

    .section-title {
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1pt;
      border-bottom: 1pt solid #555;
      padding-bottom: 2pt;
      margin-bottom: 4pt;
      color: #1a1a1a;
      text-align: left;
    }

    /* ── Summary ── */
    .summary p {
      text-align: justify;
      line-height: 1.45;
    }

    /* ── Experience ── */
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1pt;
    }

    .exp-header .company {
      font-weight: 700;
      font-size: 9.5pt;
    }

    .exp-header .date {
      font-style: italic;
      font-size: 8.5pt;
      color: #444;
      white-space: nowrap;
    }

    .exp-role {
      font-style: italic;
      font-size: 9pt;
      color: #333;
      margin-bottom: 1pt;
    }

    .exp-location {
      font-size: 8pt;
      color: #666;
      margin-bottom: 2pt;
    }

    .exp-block {
      margin-bottom: 7pt;
    }

    .exp-block:last-child {
      margin-bottom: 0;
    }

    ul {
      padding-left: 14pt;
      margin-bottom: 0;
    }

    li {
      margin-bottom: 1pt;
      text-align: justify;
    }

    /* ── Projects ── */
    .project-block {
      margin-bottom: 5pt;
    }

    .project-block:last-child {
      margin-bottom: 0;
    }

    .project-name {
      font-weight: 700;
      font-size: 9pt;
    }

    .project-company {
      font-style: italic;
      color: #555;
      font-size: 8.5pt;
    }

    .project-tools {
      font-size: 8pt;
      color: #444;
      margin-top: 1pt;
    }

    .project-tools strong {
      font-weight: 600;
    }

    /* ── Skills ── */
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2pt 20pt;
    }

    .skill-item {
      font-size: 9pt;
    }

    .skill-item strong {
      font-weight: 600;
    }

    /* ── Certifications ── */
    .cert-list {
      list-style: disc;
      padding-left: 14pt;
    }

    .cert-list li {
      margin-bottom: 1pt;
    }

    .cert-issuer {
      color: #555;
      font-size: 8pt;
    }

    /* ── Education ── */
    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .edu-header .school {
      font-weight: 700;
      font-size: 9.5pt;
    }

    .edu-header .location {
      font-style: italic;
      font-size: 8.5pt;
      color: #444;
    }

    .edu-degree {
      font-size: 9pt;
      color: #333;
    }

    .edu-gpa {
      font-size: 8.5pt;
      color: #555;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <h1>Reza Yusuf Maulana</h1>
    <div class="subtitle">Quality Assurance Engineer</div>
    <div class="contact-row">
      <span>South Tangerang, Indonesia</span>
      <span class="sep">|</span>
      <a href="https://wa.me/6282251292745">+6282251292745</a>
      <span class="sep">|</span>
      <a href="mailto:reza.yusuf98@gmail.com">reza.yusuf98@gmail.com</a>
      <span class="sep">|</span>
      <a href="https://linkedin.com/in/rezayusufmaulana">linkedin.com/in/rezayusufmaulana</a>
      <span class="sep">|</span>
      <a href="https://github.com/rezaa98">github.com/rezaa98</a>
      <span class="sep">|</span>
      <a href="https://rezacode.cloud">rezacode.cloud</a>
    </div>
  </div>

  <!-- Summary -->
  <div class="section summary">
    <h2 class="section-title">Summary</h2>
    <p>
      Quality Assurance Engineer with over 4 years of experience in end-to-end quality assurance across Web,
      Mobile, and API platforms. Proven track record in transitioning from manual to automated testing using
      modern frameworks like Cypress and Playwright. Skilled in AI-driven testing, Cloud technologies (Azure,
      Google Cloud), and Shift-Left testing strategies. Adept at maintaining software quality standards in fast-paced
      financial and technology sectors.
    </p>
  </div>

  <!-- Experience -->
  <div class="section">
    <h2 class="section-title">Professional Experience</h2>

    <!-- BFI Finance -->
    <div class="exp-block">
      <div class="exp-header">
        <span class="company">PT BFI Finance Indonesia Tbk</span>
        <span class="date">June 2022 &ndash; Present</span>
      </div>
      <div class="exp-role">Quality Assurance Engineer</div>
      <div class="exp-location">South Tangerang, Indonesia</div>
      <ul>
        <li>Responsible for end-to-end quality assurance of the company's core financial recovery ecosystems</li>
        <li>Leading testing strategies across Web, Mobile, and API platforms</li>
        <li>Developed and maintained automated test scripts using Cypress and Playwright, significantly reducing regression testing time</li>
        <li>Implemented Katalon Studio for legacy system integrations, ensuring stability across 3 major platforms (Web, Mobile, API)</li>
        <li>Led AI-Driven Quality Management (AQM) validation &mdash; Voice-to-Text transcription accuracy &amp; automated scoring algorithms</li>
        <li>Collaborated with product teams on FSD/BRD documents (Shift-Left Testing) to prevent defects early in development</li>
        <li>Managed vendor assessment &amp; quality control of 3rd party deliverables</li>
      </ul>
    </div>

    <!-- Dalligent -->
    <div class="exp-block">
      <div class="exp-header">
        <span class="company">PT. Dalligent Solusi Indonesia</span>
        <span class="date">January 2022 &ndash; June 2022</span>
      </div>
      <div class="exp-role">Software QA Engineer</div>
      <div class="exp-location">Indonesia</div>
      <ul>
        <li>Developed flow-based test cases and executed test suites for web applications using Cypress</li>
        <li>Conducted cross-browser testing (Chrome, Firefox, Edge, Safari) on Windows environments</li>
        <li>Performed API testing using Postman to validate data exchange between client and server</li>
        <li>Executed performance testing using JMeter to ensure system stability under load</li>
      </ul>
    </div>

    <!-- Gumcode -->
    <div class="exp-block">
      <div class="exp-header">
        <span class="company">PT. Gumcode Indonesia</span>
        <span class="date">June 2021 &ndash; December 2021</span>
      </div>
      <div class="exp-role">Software QA Manual Tester</div>
      <div class="exp-location">Indonesia</div>
      <ul>
        <li>Executed manual testing scenarios for software developed by the engineering team</li>
        <li>Created comprehensive test plans covering functional, regression, smoke, and exploratory testing</li>
        <li>Managed testing environment and tracked critical bugs using JIRA to ensure timely resolution</li>
      </ul>
    </div>
  </div>

  <!-- Projects -->
  <div class="section">
    <h2 class="section-title">Projects</h2>

    <!-- CMS -->
    <div class="project-block">
      <span class="project-name">Collection Management System (CMS)</span>
      <span class="project-company"> &mdash; BFI Finance</span>
      <ul>
        <li>Comprehensive testing for Digital (WhatsApp/SMS), Tele-Collection, and Field Operation channels</li>
        <li>Validated Smart Mobile App for field collectors with offline mode, GPS tracking, and secure payment</li>
      </ul>
      <div class="project-tools"><strong>Tools:</strong> Cypress, Playwright, Postman, JIRA, ClickUp</div>
    </div>

    <!-- AQM -->
    <div class="project-block">
      <span class="project-name">AI-Driven Quality Management (AQM)</span>
      <span class="project-company"> &mdash; BFI Finance</span>
      <ul>
        <li>Led validation of AI monitoring system for Tele-Collection</li>
        <li>Tested Voice-to-Text transcription accuracy and verified automated scoring algorithms against manual ground truth data</li>
      </ul>
      <div class="project-tools"><strong>Tools:</strong> AI Testing, Voice-to-Text, Automated Scoring, Playwright MCP</div>
    </div>

    <!-- IMS -->
    <div class="project-block">
      <span class="project-name">Inventory Management System (IMS)</span>
      <span class="project-company"> &mdash; BFI Finance</span>
      <ul>
        <li>Quality control for asset recovery lifecycle (Repossessed Assets)</li>
        <li>Validated complex financial logic: asset depreciation, auction bidding rules, and Profit/Loss calculations</li>
      </ul>
      <div class="project-tools"><strong>Tools:</strong> Playwright, API Testing, JMeter</div>
    </div>

    <!-- ML Project -->
    <div class="project-block">
      <span class="project-name">Machine Learning &amp; CI/CD Pipeline</span>
      <span class="project-company"> &mdash; Personal Project</span>
      <ul>
        <li>Designed end-to-end Machine Learning System (SML) using Python for California Housing Prices prediction with Exploratory Data Analysis (EDA)</li>
        <li>Implemented automated CI/CD Workflows using GitHub Actions for consistent testing, validation, and deployment of data pipelines</li>
      </ul>
      <div class="project-tools"><strong>Tools:</strong> Python, Machine Learning, EDA, GitHub Actions, CI/CD</div>
    </div>
  </div>

  <!-- Skills -->
  <div class="section">
    <h2 class="section-title">Skills</h2>
    <div class="skills-grid">
      <div class="skill-item"><strong>Automation Testing:</strong> Cypress, Playwright, Katalon, Selenium</div>
      <div class="skill-item"><strong>API Testing:</strong> Postman, REST API</div>
      <div class="skill-item"><strong>Performance Testing:</strong> JMeter</div>
      <div class="skill-item"><strong>CI/CD:</strong> GitHub Actions</div>
      <div class="skill-item"><strong>AI Testing:</strong> Playwright MCP, Voice-to-Text Validation</div>
      <div class="skill-item"><strong>Cloud:</strong> Azure AI, Google Cloud</div>
      <div class="skill-item"><strong>Project Management:</strong> JIRA, ClickUp, Confluence, Zephyr</div>
    </div>
  </div>

  <!-- Certifications -->
  <div class="section">
    <h2 class="section-title">Certifications</h2>
    <ul class="cert-list">
      <li>Azure AI Engineer Associate <span class="cert-issuer">&mdash; Microsoft (2026)</span></li>
      <li>Meningkatkan Kecerdasan Copilot dengan RAG dan Fine-Tuning di Azure <span class="cert-issuer">&mdash; Microsoft Elevate (2026)</span></li>
      <li>Junior Cybersecurity Analyst Career Path <span class="cert-issuer">&mdash; Cisco (2026)</span></li>
      <li>Prompt Design in Vertex AI <span class="cert-issuer">&mdash; Google Cloud (2026)</span></li>
    </ul>
  </div>

  <!-- Education -->
  <div class="section">
    <h2 class="section-title">Education</h2>
    <div class="edu-header">
      <span class="school">Brawijaya University</span>
      <span class="location">Malang, Indonesia</span>
    </div>
    <div class="edu-degree">Bachelor's Degree in Information Technology | 2021</div>
    <div class="edu-gpa">GPA: 3.32</div>
  </div>

</body>
</html>
`;

async function generateCV() {
  console.log("🚀 Launching Puppeteer...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  console.log("📄 Rendering CV HTML...");
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  console.log("🖨️  Generating PDF...");
  await page.pdf({
    path: OUTPUT_PATH,
    format: "A4",
    printBackground: true,
    margin: {
      top: "14mm",
      bottom: "14mm",
      left: "16mm",
      right: "16mm",
    },
  });

  await browser.close();
  console.log(`✅ CV generated successfully at:\n   ${OUTPUT_PATH}`);
}

generateCV().catch((err) => {
  console.error("❌ Error generating CV:", err);
  process.exit(1);
});
