import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Next.js data imports
import { experiences } from '../src/data/experience';
import { projects } from '../src/data/projects';
import { skills } from '../src/data/skills';
import { certifications } from '../src/data/certifications';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for skills stringification
function formatSkills(categoryData: any[]) {
  return categoryData.map(s => s.name).join(', ');
}

async function generateCV() {
  console.log('Generating CV HTML...');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reza Yusuf Maulana - CV</title>
  <style>
    :root {
      --primary: #000;
      --text: #333;
      --link: #0366d6;
      --gray: #666;
    }
    @page {
      margin: 15mm;
      size: A4;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: var(--text);
      line-height: 1.4;
      font-size: 10pt;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 24pt;
      text-transform: uppercase;
      text-align: center;
      margin: 0 0 5px 0;
      letter-spacing: 2px;
      color: var(--primary);
    }
    .subtitle {
      text-align: center;
      font-size: 12pt;
      margin: 0 0 10px 0;
    }
    .contact-info {
      text-align: center;
      font-size: 9pt;
      margin-bottom: 15px;
      color: var(--gray);
    }
    .contact-info a {
      color: var(--link);
      text-decoration: none;
    }
    
    .section-header {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 15px;
      margin-bottom: 5px;
      color: var(--primary);
    }
    
    .divider-thick {
      border-top: 2px solid var(--primary);
      margin-bottom: 5px;
    }
    .divider-thin {
      border-top: 1px solid var(--gray);
      margin-bottom: 8px;
    }
    
    p { margin: 0 0 5px 0; }
    ul { margin: 0 0 10px 0; padding-left: 20px; }
    li { margin-bottom: 3px; }
    
    .flex-between {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    
    .bold { font-weight: bold; }
    .italic { font-style: italic; }
    .gray { color: var(--gray); font-size: 9pt; }
    
    .exp-item { margin-bottom: 12px; }
    .exp-title { font-size: 10.5pt; color: var(--primary); }
    .exp-date { font-size: 9.5pt; font-style: italic; }
    
    .project-item { margin-bottom: 10px; }
    
    .skills-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .skills-col {
      width: 48%;
    }
    .skill-item {
      margin-bottom: 6px;
    }
    .languages-container {
      display: grid;
      grid-template-columns: 1fr 1.45fr 1.15fr;
      column-gap: 14px;
      margin-bottom: 10px;
    }
    .language-item {
      font-size: 9.5pt;
      line-height: 1.35;
    }
  </style>
</head>
<body>

  <h1>REZA YUSUF MAULANA</h1>
  <div class="subtitle">Quality Assurance Engineer</div>
  <div class="contact-info">
    South Tangerang, Indonesia &nbsp;|&nbsp; 
    <a href="tel:+6282251292745">+6282251292745</a> &nbsp;|&nbsp; 
    <a href="mailto:reza.yusuf98@gmail.com">reza.yusuf98@gmail.com</a> &nbsp;|&nbsp; 
    <a href="https://linkedin.com/in/rezayusufmaulana">linkedin.com/in/rezayusufmaulana</a> &nbsp;|&nbsp; 
    <a href="https://github.com/rezaa98">github.com/rezaa98</a> &nbsp;|&nbsp; 
    <a href="https://rezacode.id">rezacode.id</a>
  </div>

  <div class="divider-thick"></div>
  <div class="section-header">SUMMARY</div>
  <div class="divider-thin"></div>
  <p>Quality Assurance Engineer with over 5 years of experience in end-to-end quality assurance across Web, Mobile, and API platforms. Proven track record in transitioning from manual to automated testing using modern frameworks like Cypress and Playwright. Skilled in AI-driven testing, Cloud technologies (Azure, Google Cloud), and Shift-Left testing strategies. Adept at maintaining software quality standards in fast-paced financial and technology sectors.</p>

  <div class="section-header">PROFESSIONAL EXPERIENCE</div>
  <div class="divider-thin"></div>
  
  ${experiences.map(exp => `
  <div class="exp-item">
    <div class="flex-between">
      <span class="exp-title bold">${exp.company}</span>
      <span class="exp-date">${exp.startDate} – ${exp.endDate || 'Present'}</span>
    </div>
    <div class="italic">${exp.role}</div>
    <div class="gray" style="margin-bottom: 4px;">${exp.location}</div>
    <ul>
      ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
    </ul>
  </div>
  `).join('')}

  <div class="section-header">PROJECTS</div>
  <div class="divider-thin"></div>
  
  ${experiences.find(e => e.companyShort === 'BFI Finance')?.projects.map(proj => `
  <div class="project-item">
    <div>
      <span class="bold">${proj.name}</span> 
      <span class="gray italic">&mdash; BFI Finance</span>
    </div>
    <ul>
      ${proj.description.split('. ').filter(d => d.trim().length > 0).map(d => `<li>${d.trim() + (d.endsWith('.') ? '' : '.')}</li>`).join('')}
    </ul>
    <div style="font-size: 9pt;"><span class="bold">Tools:</span> ${proj.tags.join(', ')}</div>
  </div>
  `).join('')}
  
  ${projects.filter(p => p.slug === 'ml-cicd-pipeline').map(proj => `
  <div class="project-item">
    <div>
      <span class="bold">${proj.title}</span> 
      <span class="gray italic">&mdash; Personal Project</span>
    </div>
    <ul>
      <li>Designed end-to-end Machine Learning System (SML) using Python for California Housing Prices prediction with Exploratory Data Analysis (EDA).</li>
      <li>Implemented automated CI/CD Workflows using GitHub Actions for consistent testing, validation, and deployment of data pipelines.</li>
    </ul>
    <div style="font-size: 9pt;"><span class="bold">Tools:</span> ${proj.techStack.join(', ')}</div>
  </div>
  `).join('')}

  <div class="section-header">SKILLS</div>
  <div class="divider-thin"></div>
  <div class="skills-container">
    <div class="skills-col">
      <div class="skill-item"><span class="bold">Automation Testing:</span> Cypress, Playwright, Katalon, Selenium</div>
      <div class="skill-item"><span class="bold">Performance Testing:</span> JMeter</div>
      <div class="skill-item"><span class="bold">AI Testing:</span> Playwright MCP, Voice-to-Text Validation</div>
      <div class="skill-item"><span class="bold">Project Management:</span> JIRA, ClickUp, Confluence, Zephyr</div>
    </div>
    <div class="skills-col">
      <div class="skill-item"><span class="bold">API Testing:</span> Postman, REST API</div>
      <div class="skill-item"><span class="bold">CI/CD:</span> GitHub Actions</div>
      <div class="skill-item"><span class="bold">Cloud:</span> Azure AI, Google Cloud</div>
      <div class="skill-item"><span class="bold">Languages:</span> JavaScript, TypeScript, Gherkin, PHP</div>
    </div>
  </div>

  <div class="section-header">LANGUAGES</div>
  <div class="divider-thin"></div>
  <div class="languages-container">
    <div class="language-item"><span class="bold">Indonesian:</span> Native Proficiency</div>
    <div class="language-item"><span class="bold">English:</span> Professional Working Proficiency</div>
    <div class="language-item"><span class="bold">Japanese:</span> Elementary Proficiency</div>
  </div>

  <div class="section-header">CERTIFICATIONS</div>
  <div class="divider-thin"></div>
  <ul>
    ${certifications.filter(c => c.featured).slice(0, 5).map(cert => `
    <li>${cert.name} &mdash; <span class="gray">${cert.issuer} (${cert.year})</span></li>
    `).join('')}
  </ul>

  <div class="section-header">EDUCATION</div>
  <div class="divider-thin"></div>
  <div class="flex-between">
    <span class="bold">Brawijaya University</span>
    <span class="italic">Malang, Indonesia</span>
  </div>
  <div>Bachelor's Degree in Information Technology | 2021</div>
  <div>GPA: 3.32</div>

</body>
</html>
  `;

  const outputPath = path.join(__dirname, '../public/CV_Reza_Yusuf_Maulana.pdf');

  console.log('Launching browser to generate PDF...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Set content
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  
  // Add CSS print media styles automatically
  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      right: '15mm',
      bottom: '15mm',
      left: '15mm',
    },
    displayHeaderFooter: false
  });

  await browser.close();
  console.log(`✅ PDF successfully generated at: ${outputPath}`);
}

generateCV().catch(err => {
  console.error('Failed to generate CV:', err);
  process.exit(1);
});
