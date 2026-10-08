export type SiteLinks = {
  email: string;
  cv: string;
  github: string;
  scholar?: string;
  linkedin?: string;
  dblp?: string;
};

export type ProjectLinks = {
  paper?: string;
  code?: string;
  demo?: string;
  slides?: string;
  zhihu?: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  links: ProjectLinks;
  cover?: string;
};

export type PublicationLinks = {
  pdf?: string;
  arxiv?: string;
  doi?: string;
  code?: string;
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  links: PublicationLinks;
  cover?: string;
  tags?: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  details?: string;
  highlights?: { label: string; url?: string }[];
  logo?: string;
  logoClassName?: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  details?: string;
  highlights?: { label: string; url?: string }[];
  logo?: string;
};

export type TeachingItem = {
  role: string;
  institution: string;
  courses: string[];
};

export type PresentationItem = {
  title: string;
  venue: string;
  location: string;
  year: number;
  note?: string;
};

export type SiteConfig = {
  name: string;
  siteName: string;
  tagline: string;
  bio: string;
  siteUrl?: string;
  avatar?: string;
  lastUpdated: string;
  sourceUrl?: string;
  location: string;
  infoHubUrl?: string;
  links: SiteLinks;
  featuredProjects: Project[];
  selectedPublications: Publication[];
  presentations?: PresentationItem[];
  resume?: {
    education: EducationItem[];
    experience: ExperienceItem[];
    academicService: string[];
    teaching: TeachingItem[];
  };
};

export const siteConfig: SiteConfig = {
  name: "Sunan Zhao",
  siteName: "Sunan Zhao",
  tagline: "PhD Student · MAE · SUSTech",
  bio: "My research interests focus on AI for fluid mechanics, including physics-informed (PI) approaches and neural operator models.",
  siteUrl: "https://personal-page-sunan-zhao.vercel.app",
  avatar: "/avatar.jpg",
  lastUpdated: "2026-10-07",
  sourceUrl: "https://github.com/Sunan-zhao/personal_page",
  location: "[Shenzhen, China]",
  links: {
    email: "mailto:12631229@mail.sustech.edu.cn",
    cv: "/CV_Sunan_Zhao.pdf",
    github: "https://github.com/Sunan-zhao",
  },
  featuredProjects: [],
  selectedPublications: [
    {
      title: "LESnets (Large-Eddy Simulation nets): Physics-informed neural operator for large-eddy simulation of turbulence",
      authors: "Sunan Zhao, Zhijie Li, Boyu Fan, Yunpeng Wang, Huiyu Yang, Jianchun Wang*",
      venue: "Journal of Computational Physics",
      year: 2025,
      links: {
        doi: "https://doi.org/10.1016/j.jcp.2025.114125",
        code: "https://github.com/Sunan-zhao/LESnets",
      },
      tags: ["Turbulence", "LES", "Neural Operator"],
      cover: "/thumbnail/lesnets.png",
    },
    {
      title: "Physics-Informed Transformer operator for the prediction of three-dimensional turbulence",
      authors: "Zhihong Guo, Sunan Zhao, Huiyu Yang, Yunpeng Wang, Jianchun Wang*",
      venue: "Acta Mechanica Sinica",
      year: 2026,
      links: {
        arxiv: "https://arxiv.org/abs/2601.19351",
      },
      tags: ["Turbulence", "Transformer", "Physics-Informed"],
      cover: "/thumbnail/pi-transformer.png",
    },
  ],
  resume: {
    education: [
      {
        school: "Southern University of Science and Technology (SUSTech)",
        degree: "Ph.D. candidate in Mechanics (combined master’s–doctoral program)",
        period: "Sep 2023 – Present",
        highlights: [
          { label: "Supervisor: Prof. Jianchun Wang", url: "https://faculty.sustech.edu.cn/?tagid=wangjc&lang=en" },
        ],
        logo: "/logos/sustech.png",
      },
      {
        school: "China University of Petroleum (East China)",
        degree: "B.Eng. in Engineering Mechanics",
        period: "Sep 2019 – Jul 2023",
        logo: "/logos/upc.png",
      },
    ],
    experience: [],
    academicService: [],
    teaching: [],
  },
  presentations: [
    {
      title: "LESnets: A physics-informed neural operator for three-dimensional large-eddy simulation of turbulence",
      venue: "Chinese Congress of Theoretical and Applied Mechanics (CCTAM 2025)",
      location: "Changsha, China",
      year: 2025,
      note: "Oral",
    },
    {
      title: "A physics-informed neural operator for wall-bounded turbulence prediction",
      venue: "The 3rd Chinese Conference of Aerodynamics",
      location: "Shenyang, China",
      year: 2026,
      note: "Oral",
    },
    {
      title: "A physics-informed neural operator for wall-bounded turbulence prediction",
      venue: "The 14th National Conference on Fluid Mechanics",
      location: "Qingdao, China",
      year: 2026,
      note: "Oral",
    },
  ],
};
