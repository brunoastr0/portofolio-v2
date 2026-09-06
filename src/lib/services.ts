import type { Language } from "@/components/LanguageProvider";

interface Service {
  title: string;
  capabilities: string[];
}

export const servicesByLanguage: Record<Language, Service[]> = {
  en: [
    { title: "Backend systems & APIs", capabilities: ["Domain & database modelling", "REST APIs", "Authentication & permissions", "Integrations & automation"] },
    { title: "Full-stack web products", capabilities: ["Web applications", "Responsive interfaces", "Forms & dashboards", "Admin platforms"] },
    { title: "Deployment & reliability", capabilities: ["VPS & cloud deployment", "Containers", "Monitoring & maintenance", "Performance optimisation"] },
    { title: "Network engineering", capabilities: ["Problem & requirements analysis", "Infrastructure design", "Existing infrastructure assessment", "Topology, performance & resilience"] },
  ],
  pt: [
    { title: "Sistemas backend e APIs", capabilities: ["Modelação de domínio e bases de dados", "APIs REST", "Autenticação e permissões", "Integrações e automação"] },
    { title: "Produtos web full-stack", capabilities: ["Aplicações web", "Interfaces responsivas", "Formulários e painéis", "Plataformas administrativas"] },
    { title: "Implementação e fiabilidade", capabilities: ["Implementação em VPS e cloud", "Contentores", "Monitorização e manutenção", "Otimização de desempenho"] },
    { title: "Engenharia de redes", capabilities: ["Análise do problema e requisitos", "Desenho de infraestrutura", "Avaliação da infraestrutura existente", "Topologia, desempenho e resiliência"] },
  ],
};

// User-confirmed tools plus direct dependencies and deployment configuration
// found in the local portfolio, DiveTribe, school API, Nhafarma, and shop projects.
export const technologyGroups = [
  { title: { en: "Languages", pt: "Linguagens" }, items: ["JavaScript", "TypeScript", "Python", "C", "PHP"] },
  { title: { en: "Frontend", pt: "Frontend" }, items: ["React", "Next.js", "Tailwind CSS", "Vite"] },
  { title: { en: "Backend & data", pt: "Backend e dados" }, items: ["Laravel", "Node.js", "Fastify", "Express", "PostgreSQL", "MySQL", "Redis", "Drizzle ORM", "Prisma", "S3"] },
  { title: { en: "Hosting & infrastructure", pt: "Alojamento e infraestrutura" }, items: ["Vercel", "Laravel Forge", "Hetzner VPS", "Coolify", "Docker", "Docker Compose", "Nginx"] },
  { title: { en: "Monitoring", pt: "Monitorização" }, items: ["Grafana", "Prometheus", "Laravel Nightwatch"] },
  { title: { en: "Testing", pt: "Testes" }, items: ["Vitest", "Playwright"] },
];
