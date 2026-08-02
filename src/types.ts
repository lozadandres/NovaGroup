export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string; // Used to dynamically map Lucide icons
  features: string[];
  techStack: string[];
  deliverables: string[];
  timeline: string;
  startingPrice: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export interface TechStackItem {
  name: string;
  category: "frontend" | "backend" | "ai" | "cloud" | "design";
  level: "expert" | "advanced";
  description: string;
}

export interface ProjectScope {
  services: string[];
  scale: "startup" | "growth" | "enterprise";
  timeline: "urgent" | "standard" | "flexible";
  details: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}
