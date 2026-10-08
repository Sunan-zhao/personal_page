export type PublicationLink = {
  label: string;
  href: string;
  stars?: number;
  repo?: string;
};

export type PublicationEntry = {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  type: "C" | "J" | "P" | "T";
  links: PublicationLink[];
  tags?: string[];
  logo?: string;
  short?: string;
};

export const publicationEntries: PublicationEntry[] = [
  {
    id: "J1",
    title: "LESnets (Large-Eddy Simulation nets): Physics-informed neural operator for large-eddy simulation of turbulence",
    authors: "Sunan Zhao, Zhijie Li, Boyu Fan, Yunpeng Wang, Huiyu Yang, Jianchun Wang*",
    year: 2025,
    venue: "Journal of Computational Physics",
    type: "J",
    links: [
      { label: "DOI", href: "https://doi.org/10.1016/j.jcp.2025.114125" },
      { label: "GitHub", href: "https://github.com/Sunan-zhao/LESnets", stars: 0, repo: "Sunan-zhao/LESnets" },
    ],
    tags: ["Turbulence", "LES", "Neural Operator"],
    short: "JCP",
  },
  {
    id: "J2",
    title: "Physics-Informed Transformer operator for the prediction of three-dimensional turbulence",
    authors: "Zhihong Guo, Sunan Zhao, Huiyu Yang, Yunpeng Wang, Jianchun Wang*",
    year: 2026,
    venue: "Acta Mechanica Sinica",
    type: "J",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2601.19351" },
    ],
    tags: ["Turbulence", "Transformer", "Physics-Informed"],
    short: "AMS",
  },
  {
    id: "P1",
    title: "Large-eddy simulation nets (LESnets) based on physics-informed neural operator for wall-bounded turbulence",
    authors: "Sunan Zhao, Yunpeng Wang, Huiyu Yang, Zhihong Guo, Jianchun Wang*",
    year: 2026,
    venue: "arXiv preprint",
    type: "P",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2604.26621" },
    ],
    tags: ["Wall Turbulence", "LES", "Neural Operator"],
    logo: "/logos/arxiv.svg",
  },
];
