export const experiences = [
  {
    id: "exp-001",
    company: "PT BFI Finance Indonesia Tbk",
    companyShort: "BFI Finance",
    role: "Quality Assurance Engineer",
    type: "fulltime" as const,
    startDate: "June 2022",
    endDate: null,
    isCurrent: true,
    location: "South Tangerang, Indonesia",
    logo: "/images/experience/bfi.png",
    accentColor: "#3b82f6",
    description:
      "Responsible for end-to-end quality assurance of the company's core financial recovery ecosystems. Leading testing strategies across Web, Mobile, and API platforms.",
    highlights: [
      "Developed and maintained automated test scripts using Cypress and Playwright, significantly reducing regression testing time",
      "Implemented Katalon Studio for legacy system integrations, ensuring stability across 3 major platforms (Web, Mobile, API)",
      "Led AI-Driven Quality Management (AQM) validation — Voice-to-Text transcription accuracy & automated scoring algorithms",
      "Collaborated with product teams on FSD/BRD documents (Shift-Left Testing) to prevent defects early in development",
      "Managed vendor assessment & quality control of 3rd party deliverables",
      "Collaborated daily with expatriate professionals from Malaysia, Bangladesh, and India in a multicultural working environment",
    ],
    projects: [
      {
        name: "Collection Management System (CMS)",
        description:
          "Comprehensive testing for Digital (WhatsApp/SMS), Tele-Collection, and Field Operation channels. Validated Smart Mobile App for field collectors with offline mode, GPS tracking, and secure payment.",
        tags: ["Cypress", "Playwright", "Postman", "JIRA"],
      },
      {
        name: "Inventory Management System (IMS)",
        description:
          "Quality control for asset recovery lifecycle (Repossessed Assets), validating complex financial logic: asset depreciation, auction bidding rules, and Profit/Loss calculations.",
        tags: ["Katalon", "Selenium", "API Testing", "JMeter"],
      },
      {
        name: "AI-Driven Quality Management (AQM)",
        description:
          "Led validation of AI monitoring system for Tele-Collection. Tested Voice-to-Text transcription accuracy and verified automated scoring algorithms against manual ground truth data.",
        tags: ["AI Testing", "Voice-to-Text", "Automated Scoring", "Playwright MCP"],
      },
    ],
    techTags: ["Cypress", "Playwright", "Katalon", "Postman", "JIRA", "Confluence", "Zephyr", "JMeter", "Playwright MCP"],
  },
  {
    id: "exp-002",
    company: "PT. Dalligent Solusi Indonesia",
    companyShort: "Dalligent",
    role: "Software QA Engineer",
    type: "internship" as const,
    startDate: "January 2022",
    endDate: "June 2022",
    isCurrent: false,
    location: "Indonesia",
    logo: "/images/experience/dalligent.png",
    accentColor: "#22d3ee",
    description:
      "Developed flow-based test cases and executed test suites for web applications. Conducted cross-browser testing and API validation.",
    highlights: [
      "Developed flow-based test cases and executed test suites for web applications using Cypress",
      "Conducted cross-browser testing (Chrome, Firefox, Edge, Safari) on Windows environments",
      "Performed API testing using Postman to validate data exchange between client and server",
      "Executed performance testing using JMeter to ensure system stability under load",
    ],
    projects: [],
    techTags: ["Cypress", "Postman", "JMeter", "Cross-browser Testing"],
  },
  {
    id: "exp-003",
    company: "PT. Gumcode Indonesia",
    companyShort: "Gumcode",
    role: "Software QA Manual Tester",
    type: "contract" as const,
    startDate: "June 2021",
    endDate: "December 2021",
    isCurrent: false,
    location: "Indonesia",
    logo: "/images/experience/gumcode.png",
    accentColor: "#a78bfa",
    description:
      "Executed manual testing scenarios and managed comprehensive test plans covering multiple testing types.",
    highlights: [
      "Executed manual testing scenarios for software developed by the engineering team",
      "Created comprehensive test plans covering functional, regression, smoke, and exploratory testing",
      "Managed testing environment and tracked critical bugs using JIRA to ensure timely resolution",
    ],
    projects: [],
    techTags: ["Manual Testing", "JIRA", "Test Planning", "Bug Tracking"],
  },
] as const;

export type Experience = (typeof experiences)[number];
