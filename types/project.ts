export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  liveLinks: ProjectLink[];
  sourceCodes: ProjectLink[];
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}