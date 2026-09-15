export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
};



export type WorkTechnology = {
  name: string;
  mark: string;
  color: string;
  markColor?: string;
};

export type WorkExperienceDetail = ExperienceItem & {
  technologies: WorkTechnology[];
  highlights: string[];
};

export type BlogItem = {
  title: string;
  description: string;
  date: string;
  href: string;
};

export type ResourceCard = {
  title: string;
  description: string;
  href: string;
};

export const site = {
  name: "Anubhab Roy Chowdhury",
  shortName: "Anubhab",
  url: "https://your-domain.com",
  email: "anubhabrc4work@gmail.com",
  location: "Mumbai, India",
  headline: "Product Curious.",
  bio: "I like making useful things, understanding why people use them, and turning messy ideas into clear products.",
  avatar: "/anubhab.png",
  socials: [
    {
      label: "X",
      href: "#",
      icon: "x",
      color: "#111111",
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: "linkedin",
      color: "#0A66C2",
    },
    {
      label: "Email",
      href: "mailto:anubhabrc4work@gmail.com",
      icon: "mail",
      color: "#EA4335",
    },
  ],
  experience: [
    {
      company: "Oneture Technologies",
      role: "Associate Software Engineer",
      period: "January 2025 – Present",
      location: "Mumbai, India (On-Site)",
      current: true,
    },
    {
      company: "Independent Projects",
      role: "Product, AI & software experiments",
      period: "2025 – Present",
      location: "Bangalore, India (Remote)",
    },
    {
      company: "Learning in Public",
      role: "Case studies, prototypes & writing",
      period: "Ongoing",
      location: "Bangalore, India (Remote)",
    },
  ] satisfies ExperienceItem[],
  blogs: [
    {
      title: "A product note worth sharing",
      description:
        "A compact place for observations, experiments, and things I am learning.",
      date: "Coming soon",
      href: "/blog",
    },
    {
      title: "How I think about messy problems",
      description:
        "From ambiguity to a smaller, testable problem worth solving.",
      date: "Coming soon",
      href: "/blog",
    },
    {
      title: "Building, breaking, learning",
      description:
        "Notes from making products and prototypes with code and AI.",
      date: "Coming soon",
      href: "/blog",
    },
  ] satisfies BlogItem[],
  development: [
    {
      title: "Gears",
      description:
        "Tools, devices, software, and systems I use to get work done.",
      href: "#",
    },
    {
      title: "Setup",
      description:
        "My working setup, apps, workflows, and small quality-of-life tweaks.",
      href: "#",
    },
    {
      title: "Notes",
      description:
        "Technical notes, product frameworks, snippets, and things worth keeping.",
      href: "#",
    },
  ] satisfies ResourceCard[],
  personal: [
    {
      title: "Books",
      description:
        "Books that have influenced how I think, work, and see people.",
      href: "#",
    },
    {
      title: "Movies",
      description:
        "Films and shows I keep returning to, recommending, or thinking about.",
      href: "#",
    },
  ] satisfies ResourceCard[],
  quote: {
    text: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of actions.",
    source: "Bhagavad Gita",
  },
};

export const workItems = [
  {
    kicker: "Product case study",
    title: "Emergency Mode for digital healthcare",
    description:
      "A future-facing case study on ambulance discovery, dispatch, patient context, hospital readiness, and the journey after admission.",
    status: "Drafting",
  },
  {
    kicker: "Product experiment",
    title: "Super Pins",
    description:
      "A visual moodboard concept built around expressive stickers, aesthetics, collections, and future social integrations.",
    status: "Exploring",
  },
  {
    kicker: "AI prototype",
    title: "Splitbot",
    description:
      "A conversational expense-splitting prototype and a sandbox for experimenting with AI-first interaction patterns.",
    status: "Prototype",
  },
];

export const allBlogItems = [
  ...site.blogs,
  {
    title: "Why a portfolio should feel like a person, not a résumé",
    description:
      "A note about mixing product work, code, taste, media, and personal interests in one place.",
    date: "Idea",
    href: "#",
  },
];


export const workExperienceDetails: WorkExperienceDetail[] = [
  {
    company: "Oneture Technologies",
    role: "Associate Software Engineer",
    period: "January 2025 – Present",
    location: "Mumbai, India (On-Site)",
    current: true,
    technologies: [
      { name: "Angular", mark: "A", color: "#DD0031" },
      { name: "PrimeNG", mark: "P", color: "#2563EB" },
      { name: "TypeScript", mark: "TS", color: "#3178C6" },
      { name: "JavaScript", mark: "JS", color: "#F7DF1E", markColor: "#111111" },
      { name: "HTML5", mark: "5", color: "#E34F26" },
      { name: "CSS3", mark: "3", color: "#1572B6" },
      { name: "Git", mark: "◆", color: "#F05032" },
      { name: "REST APIs", mark: "API", color: "#F97316" },
    ],
    highlights: [
      "Led frontend delivery for NSDL's unified FPI–FVCI platform, building multi-step registration flows, role-based dashboards, validations, and digital-signing journeys.",
      "Worked across maker-checker workflows, renewal and transaction-upload modules, submit-preview flows, master-data mapping, and complex nested form states.",
      "Improved one critical frontend process from roughly three minutes to about three seconds by reworking the implementation and data flow.",
      "Worked directly with backend teams, senior managers, and client stakeholders while taking ownership of frontend execution and issue resolution.",
    ],
  },
  {
    company: "Independent Projects",
    role: "Product, AI & software experiments",
    period: "2025 – Present",
    location: "Bangalore, India (Remote)",
    technologies: [
      { name: "Next.js", mark: "N", color: "#111111" },
      { name: "React", mark: "⚛", color: "#61DAFB", markColor: "#062B36" },
      { name: "TypeScript", mark: "TS", color: "#3178C6" },
      { name: "Python", mark: "Py", color: "#3776AB" },
      { name: "FastAPI", mark: "⚡", color: "#009688" },
      { name: "Tailwind", mark: "≈", color: "#06B6D4" },
      { name: "Figma", mark: "F", color: "#F24E1E" },
      { name: "Vercel", mark: "▲", color: "#111111" },
    ],
    highlights: [
      "Exploring product concepts that combine software, AI, interface design, and practical user problems rather than staying inside a single role or discipline.",
      "Building Super Split as a conversational expense-splitting and financial-assistant concept, with AI-first interaction patterns and a WhatsApp-native product direction.",
      "Developing Super Pins as a visual collection and moodboard product, with room for richer social, discovery, and Pinterest-style integrations later.",
      "Using these projects as working product case studies: defining the problem, shaping flows, prototyping, building, testing assumptions, and documenting decisions.",
    ],
  },
  {
    company: "Learning in Public",
    role: "Case studies, prototypes & writing",
    period: "Ongoing",
    location: "Bangalore, India (Remote)",
    technologies: [
      { name: "Figma", mark: "F", color: "#F24E1E" },
      { name: "Notion", mark: "N", color: "#111111" },
      { name: "Next.js", mark: "N", color: "#111111" },
      { name: "Markdown", mark: "M", color: "#6B7280" },
    ],
    highlights: [
      "Turning product observations, technical learnings, and experiments into concise notes and portfolio-ready case studies.",
      "Developing an Emergency Mode healthcare case study around ambulance booking, dispatch, patient context, hospital readiness, and the journey after admission.",
      "Using writing and prototypes to make thinking visible: what problem is being solved, why a decision was made, what changed, and what should be tested next.",
    ],
  },
];
