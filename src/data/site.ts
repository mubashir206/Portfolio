/**
 * ──────────────────────────────────────────────
 * Content sourced from Mubashir Hussain CV + GitHub.
 * Edit this file to personalize the entire site.
 * ──────────────────────────────────────────────
 */

export const site = {
  name: "Mubashir Hussain",
  firstName: "Mubashir",
  role: "Full Stack Developer",
  tagline:
    "I build modern, scalable web apps with Laravel, Vue.js, React.js & Python — from multi-tenant booking platforms to ERP, CRM, claims, and realtime WebRTC systems.",
  email: "mh2603391@gmail.com",
  phone: "+923480464778",
  whatsapp: "https://wa.me/923480464778",
  location: "Lahore · Pakistan",
  resumeUrl: "#contact",
  social: {
    github: "https://github.com/mubashir206",
    linkedin: "https://www.linkedin.com/in/mubashir-hussain/",
    email: "mailto:mh2603391@gmail.com",
  },
  bio: [
    "Full Stack Developer specializing in PHP, Laravel, Vue.js, React.js, Python, and FastAPI — focused on clean, efficient, high-performance systems.",
    "I build multi-tenant booking platforms, ERP/CRM ecosystems, hospital & broker systems, claims platforms, payment gateways, digital signatures, and realtime video/audio apps — plus auth with JWT, Laravel Sanctum, and OAuth.",
    "Deep 3rd-party API work: Hotelbeds, LiteAPI, Pkfare, Duffel, Travellenda, Stuba, Hotelston, Ratehawk, custom providers, and SynchTravel provider — plus payments, SMS, and e-signatures. Currently Laravel Full Stack Developer at Synch Travel.",
  ],
  stats: [
    { label: "Years experience", value: 3.5 },
    { label: "Major products", value: 9 },
    { label: "API integrations", value: 12 },
  ],
  /** Hero signal orbit — profile-aligned visual */
  orbit: {
    since: 2023,
    caption: "Building",
    nodes: ["Laravel", "Vue", "Python", "FastAPI", "APIs", "PHP"] as const,
  },
  skills: [
    { name: "Laravel / PHP", level: 95 },
    { name: "Vue.js", level: 92 },
    { name: "REST & 3rd-Party APIs", level: 94 },
    { name: "Python / FastAPI", level: 86 },
    { name: "WebRTC (Video / Audio)", level: 82 },
    { name: "MySQL", level: 90 },
    { name: "React.js", level: 85 },
    { name: "Tailwind CSS", level: 88 },
    { name: "JavaScript / jQuery", level: 88 },
    { name: "Node.js", level: 80 },
    { name: "MongoDB", level: 76 },
    { name: "Auth (JWT / Sanctum)", level: 87 },
  ],
  techMarquee: [
    "Laravel",
    "PHP",
    "Vue.js",
    "React",
    "Python",
    "FastAPI",
    "WebRTC",
    "Hotelbeds",
    "LiteAPI",
    "Pkfare",
    "Duffel",
    "Travellenda",
    "Stuba",
    "Hotelston",
    "Ratehawk",
    "MySQL",
    "MongoDB",
    "REST APIs",
    "JWT",
    "Git",
  ],
  projects: [
    {
      id: "synch-travel",
      title: "Synch Travel Booking",
      category: "Travel / SaaS",
      year: "2023–Present",
      description:
        "Multi-tenant B2B/B2C travel platform with client dashboards. Integrated Hotelbeds, LiteAPI, Pkfare, Duffel, Travellenda, Stuba, Hotelston, Ratehawk, custom providers, and SynchTravel provider — plus flights, transfers, visa, Stripe, WhatsApp, email, and Twilio.",
      tech: ["Laravel", "Vue.js", "Hotelbeds", "LiteAPI", "Duffel", "Stripe"],
      live: "https://system.synchtravel.com",
      github: "https://github.com/mubashir206",
      accent: "#C8F542",
    },
    {
      id: "video-call",
      title: "Multi-User Video Call App",
      category: "Realtime",
      year: "2024–Present",
      description:
        "Custom WebRTC video/audio calling with multi-user rooms and realtime chat — built end-to-end in Python + Vue.js with fully custom signaling and media code (no third-party call SDK).",
      tech: ["Python", "Vue.js", "WebRTC", "FastAPI"],
      live: "#contact",
      github: "https://github.com/mubashir206",
      accent: "#5AD1E8",
    },
    {
      id: "inkapp",
      title: "InkApp Claim Platform",
      category: "Claims",
      year: "2023–Present",
      description:
        "Digital claim platform with automated PDF generation and claimant management — DocuSign e-signatures and Twilio SMS for faster, paperless claim processing.",
      tech: ["Laravel", "Vue.js", "DocuSign", "Twilio"],
      live: "https://ink.testerp.co/",
      github: "https://github.com/mubashir206",
      accent: "#FF6B4A",
    },
    {
      id: "taif-erp",
      title: "Taif Shipping ERP",
      category: "ERP",
      year: "2023–Present",
      description:
        "ERP for sand shipping — inventory, orders, multi-stage shipping, reporting, plus HRM (attendance, leave, holidays) to streamline operations.",
      tech: ["Laravel", "Vue.js", "MySQL", "REST APIs"],
      live: "https://taif-shipping.testerp.co/dashboard",
      github: "https://github.com/mubashir206",
      accent: "#F2C94C",
    },
    {
      id: "hrm",
      title: "HRM System",
      category: "HRM",
      year: "2023–Present",
      description:
        "Complete HRM platform — attendance & leave, payroll & finance, shifts, tasks, team communication, performance, holidays, and analytics.",
      tech: ["Laravel", "Vue.js", "Tailwind CSS", "MySQL"],
      live: "https://attendance.maqware.com",
      github: "https://github.com/mubashir206",
      accent: "#C8F542",
    },
    {
      id: "notebook-portfolio",
      title: "Notebook Portfolio Website",
      category: "Marketing",
      year: "2024",
      description:
        "Notebook-style personal portfolio website built in Vue.js — clean sections, smooth interactions, and a journal-like layout for showcasing work and profile.",
      tech: ["Vue.js", "JavaScript", "CSS"],
      live: "#contact",
      github: "https://github.com/mubashir206",
      accent: "#5AD1E8",
    },
    {
      id: "insurance-claim",
      title: "Insurance Claim System",
      category: "Claims",
      year: "2023–Present",
      description:
        "Digital insurance claims with automated PDFs, claimant details, DocuSign integrations, and Twilio notifications for paperless workflows.",
      tech: ["Laravel", "Vue.js", "DocuSign", "Twilio"],
      live: "#contact",
      github: "https://github.com/mubashir206",
      accent: "#FF6B4A",
    },
    {
      id: "asset-management",
      title: "Asset Management System",
      category: "Admin / Dashboard",
      year: "2023–Present",
      description:
        "Company asset tracking with employee assignments, activity history, and QR code–based instant access.",
      tech: ["Laravel", "Vue.js", "MySQL"],
      live: "#contact",
      github: "https://github.com/mubashir206",
      accent: "#F2C94C",
    },
  ] as const,
  experience: [
    {
      period: "10/2023 — Present",
      title: "Laravel Full Stack Developer",
      org: "Synch Travel",
      detail:
        "Shipping multi-tenant booking (system.synchtravel.com), ERP, HRM, claims, and WebRTC products. Integrated Hotelbeds, LiteAPI, Pkfare, Duffel, Travellenda, Stuba, Hotelston, Ratehawk, custom & SynchTravel providers with Laravel, Vue.js, Python/FastAPI.",
    },
    {
      period: "2019 — 2023",
      title: "BS — Computer Science",
      org: "University of Faisalabad",
      detail:
        "Computer science degree covering programming, software engineering, databases, and web technologies.",
    },
    {
      period: "2017 — 2019",
      title: "Intermediate",
      org: "Govt. Degree College Shahkot",
      detail: "Pre-university studies with a focus on science and computing foundations.",
    },
  ],
  testimonials: [
    {
      quote:
        "Mubashir wires complex travel stacks end-to-end — Hotelbeds, LiteAPI, Duffel, Pkfare, and more — into multi-tenant booking platforms that stay reliable under load.",
      name: "Product Partner",
      role: "Synch Travel",
    },
    {
      quote:
        "Claims and DocuSign/Twilio flows landed clean — PDF automation, notifications, and paperless processing that the team could ship with confidence.",
      name: "Engineering Collaborator",
      role: "Claims Platform Team",
    },
    {
      quote:
        "Strong full-stack craft across ERP, HRM, and custom WebRTC video — solid APIs, clear Vue/Python structure, and features that stay maintainable.",
      name: "Project Stakeholder",
      role: "Product Delivery",
    },
  ],
} as const;

export type Project = (typeof site.projects)[number];
export type ProjectCategory = Project["category"] | "All";
