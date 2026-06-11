export const skills = {
  automation: [
    { name: "Playwright MCP with AI", proficiency: 95, icon: "Robot", featured: true },
    { name: "Cypress.io", proficiency: 90, icon: "TestTube", featured: false },
    { name: "Playwright", proficiency: 85, icon: "CheckCircle", featured: false },
    { name: "Katalon Studio", proficiency: 80, icon: "Box", featured: false },
    { name: "Selenium", proficiency: 75, icon: "Globe", featured: false },
    { name: "Appium", proficiency: 70, icon: "Smartphone", featured: false },
  ],
  languages: [
    { name: "JavaScript", proficiency: 85, icon: "Code", featured: false },
    { name: "TypeScript", proficiency: 80, icon: "FileCode", featured: false },
    { name: "Gherkin/Cucumber", proficiency: 85, icon: "AlignLeft", featured: false },
    { name: "PHP", proficiency: 65, icon: "Server", featured: false },
  ],
  tools: [
    { name: "Postman", proficiency: 90, icon: "Send", featured: false },
    { name: "JIRA", proficiency: 90, icon: "Trello", featured: false },
    { name: "JMeter", proficiency: 75, icon: "Activity", featured: false },
    { name: "Confluence", proficiency: 85, icon: "FileText", featured: false },
    { name: "Zephyr", proficiency: 80, icon: "Shield", featured: false },
  ],
  cloudAndAI: [
    { name: "Google Cloud Platform (GCP)", proficiency: 80, icon: "Cloud", featured: false },
    { name: "BigQuery & BigQuery ML", proficiency: 75, icon: "Database", featured: false },
    { name: "Vertex AI & Gemini", proficiency: 85, icon: "Sparkles", featured: true },
    { name: "Microsoft Azure AI", proficiency: 80, icon: "Cpu", featured: true },
    { name: "MLOps (MLflow)", proficiency: 75, icon: "Workflow", featured: false },
  ],
} as const;

export type SkillCategory = keyof typeof skills;
export type Skill = (typeof skills)[SkillCategory][number];
