"use client";

import Image from "next/image";
import {useState, useEffect} from "react";
import {Mail, Download, ChevronDown} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {getTechIcon, getSimpleTechIcon} from "@/lib/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AnnouncementBanner} from "@/components/ui/announcement-banner";

// Work experience data
const workExperiences = [
  {
    company: "Naveum AG",
    role: "Development Operations Engineer",
    period: { start: "May 2025", end: "Present" },
    logo: "/naveum.png",
    locationText: "Zürich - Switzerland",
    tasks: [
      "Automating infrastructure deployment and management for cloud, on-prem and hybrid environments"
    ],
    techStack: ["PowerShell", "Azure AD", "M365", "Active Directory", "Windows Server", "VMWare", "CI/CD", "Python", "Git"]
  },
  {
    company: "ALTEN",
    role: "Bachelor Thesis / Internship",
    period: { start: "Feb 2024", end: "May 2024" },
    logo: "/alten.svg",
    locationText: "Turin - Italy",
    tasks: [
      "Conducted application performance analysis using Dynatrace to improve user experience and software performance",
      "Optimized Application Performance Index (APDEX) for measuring user satisfaction and identifying performance bottlenecks",
      "Performed daily data analysis and extraction using SQL to improve transparency and support decision-making"
    ],
    techStack: ["Dynatrace", "SQL", "APM"]
  },
  {
    company: "GradFuel",
    role: "Team Lead & Full-Stack Developer",
    period: { start: "Apr 2020", end: "May 2021" },
    logo: "/gradfuel.svg",
    locationText: "Remote - London",
    tasks: [
      "Led an Auroware team developing GradFuel, a B2B SaaS platform built with MongoDB, Express, React, and Node.js",
      "Managed recruiting and funding processes for 1,500 SMBs",
      "Contributed to the company's valuation of €1.05 Million in 2020"
    ],
    techStack: ["MongoDB", "Express", "React", "Node.js"]
  },
  {
    company: "Auroware Ltd.",
    role: "Co-Founder & Technical Lead",
    period: { start: "Feb 2020", end: "Jun 2021" },
    logo: "/auroware.png",
    locationText: "Remote - London",
    tasks: [
      "Co-founded an IT consulting company with two partners, leading business and technical aspects",
      "Managed a team of three employees while overseeing project development",
      "Collaborated closely with clients on defining, planning, and implementing projects",
      "Led meetings with clients and stakeholders to communicate technical concepts and develop efficient solutions",
    ],
    techStack: ["Project Management", "Agile Methodologies", "Team Management"]
  }
];

// Education data
const educationExperiences = [
  {
    institution: "University of Turin",
    degree: "Bachelor in Computer Science",
    period: { start: "Nov 2021", end: "Nov 2024" },
    logo: "/university.svg",
    locationText: "Turin, Italy",
    description: "Graduated with a score of 107/110, focusing on software development, algorithms, and system design. Gained practical experience in object-oriented programming with Java and Python, algorithms, data structures, databases (SQL and NoSQL), network technologies, and full-stack development with React and Node.js.",
    thesis: {
      title: "Application Performance Monitoring: the Apdex Score",
      description: "Developed dashboards for real-time monitoring of user satisfaction and application performance",
      link: "/thesis.pdf"
    },
    techStack: [
      "Java", 
      "Python", 
      "JavaScript", 
      "TypeScript", 
      "C", 
      "HTML / CSS", 
      "Node.js", 
      "SQL", 
      "NoSQL", 
      "Software Development Practices"
    ]
  }
];

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [announcementType, setAnnouncementType] = useState<"warning" | "info">("info");
  
  // Fetch announcement from API
  useEffect(() => {
    fetch('/api/announcement')
      .then(res => res.json())
      .then(data => {
        setAnnouncement(data.announcement);
        setAnnouncementType(data.type || "info");
      })
      .catch(err => console.error("Failed to fetch announcement:", err));
  }, []);
  
  const projects = [
    {
      title: "FootballDataPortal",
      description: "A comprehensive system for accessing and analyzing Transfermarkt football data through a frontend interface.",
      tags: ["Java Spring Boot", "Python", "PostgreSQL", "MongoDB", "React", "Node.js", "Docker"],
      github: "https://github.com/Rithari/FootballDataPortal"
    },
    {
      title: "Custom Compiler",
      description: "Implemented a lexer, parser, validator and translator for a custom programming language.",
      tags: ["Java", "Compiler Design", "Parsing"],
      github: "https://github.com/Rithari/custom-compiler"
    },
    {
      title: "URL Shortener",
      description: "A local URL shortening service built as a weekend project with Java Spring Boot, C#, MongoDB, and Redis for caching.",
      tags: ["Java Spring Boot", "C#", "MongoDB", "Redis"],
      github: "https://github.com/Rithari/url-shortener"
    },
    {
      title: "Full Self Driving Neural Network",
      description: "Self-driving cars simulation with reinforcement learning and MLP neural network architecture.",
      tags: ["JavaScript", "Neural Networks", "Reinforcement Learning"],
      github: "https://github.com/Rithari/FSD-javascript"
    },
  ];

  // Display first 2 projects by default, all when showAllProjects is true
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 2);

  return (
    <div className="space-y-16 mb-12">
      {/* Announcement Banner */}
      <AnnouncementBanner announcement={announcement} type={announcementType} />
      
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-6 max-w-3xl mx-auto">
        <div className="text-left w-full">
          <h1 className="text-5xl font-bold mb-3">hi leo here <span className="wave">👋</span></h1>
          <p className="text-lg mb-2 text-gray-600 dark:text-gray-400">
            software engineer from Zürich 🇨🇭
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-sm">
            I like to build stuff. I particularly like doing that with Java, C# and Python.<br /> Outside of coding, I play the clarinet and speak 🇩🇪 (🇨🇭), 🇮🇹 & 🇬🇧  <br /> —sometimes all in the same day.
          </p>
          
          <div className="flex gap-4 mb-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-base font-medium hover:opacity-90 transition-opacity h-auto">
                  <Download className="h-4 w-4" /> Resume <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <a href="/CV EN.pdf" download className="flex items-center cursor-pointer">
                    <Download className="h-4 w-4 mr-2" /> 🇬🇧
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/resume_de.pdf" download className="flex items-center cursor-pointer">
                    <Download className="h-4 w-4 mr-2" /> 🇨🇭 / 🇩🇪 (WIP)
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="https://github.com/Rithari" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-5 w-5" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77a5.07 5.07 0 0 0-.09-3.77S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1a5.07 5.07 0 0 0-.09 3.77A5.44 5.44 0 0 0 3 8.52c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.61V22"></path>
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/leolucadatri/" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin h-5 w-5" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:leo@leolucadatri.io" className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
        
        <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-800 flex-shrink-0 mb-6 md:mb-0">
          <Image
            src="/pfp.jpeg"
            alt="Leo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 144px, 192px"
            priority
          />
        </div>
      </section>

      {/* Work/Education Section */}
      <TabsSection />

      {/* Projects Section */}
      <section id="projects" className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">cool projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title} 
              description={project.description}
              tags={project.tags}
              github={project.github}
            />
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium inline-flex items-center gap-2"
          >
            view {showAllProjects ? "less" : "more"}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${showAllProjects ? "rotate-180" : ""} transition-transform`}>
              <path d="M7.5 11.1412L3.00423 6.3695C2.73943 6.0875 2.81515 5.6347 3.16558 5.45678C3.29454 5.39454 3.44195 5.39455 3.57091 5.45679L7.5 7.72514L11.4291 5.45679C11.7795 5.2788 12.2323 5.35457 12.4103 5.7049C12.4725 5.83387 12.4725 5.98125 12.4103 6.1102L7.9145 11.1412C7.7941 11.2718 7.6204 11.2718 7.5 11.1412Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}

function TabsSection() {
  return (
    <section className="max-w-3xl mx-auto">
      <Tabs defaultValue="work" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-[#191919]">
          <TabsTrigger 
            value="work"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#121212] data-[state=active]:text-foreground data-[state=active]:shadow rounded-md"
          >
            Work
          </TabsTrigger>
          <TabsTrigger 
            value="education"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#121212] data-[state=active]:text-foreground data-[state=active]:shadow rounded-md"
          >
            Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work" className="mt-2">
          <Card className="border-gray-200 dark:border-[#333333] dark:bg-transparent">
            <CardContent className="p-0">
              <ul className="ml-10 border-l border-gray-200 dark:border-[#333333]">
                {workExperiences.map((experience, index) => (
                  <WorkExperienceTimelineItem 
                    key={index}
                    company={experience.company}
                    role={experience.role}
                    period={experience.period}
                    logo={experience.logo}
                    locationText={experience.locationText}
                    tasks={experience.tasks}
                    techStack={experience.techStack}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="mt-2">
          <Card className="border-gray-200 dark:border-[#333333] dark:bg-transparent">
            <CardContent className="p-0">
                <ul className="ml-10 border-l border-gray-200 dark:border-[#333333]">
                {educationExperiences.map((experience, index) => (
                  <EducationTimelineItem 
                    key={index}
                    institution={experience.institution}
                    degree={experience.degree}
                    period={experience.period}
                    logo={experience.logo}
                    locationText={experience.locationText}
                    description={experience.description}
                    thesis={experience.thesis}
                    techStack={experience.techStack}
                  />
                ))}
                </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function WorkExperienceTimelineItem({ 
  company, 
  role, 
  period, 
  logo, 
  logoBackground,
  locationText, 
  tasks,
  projectLinks,
  techStack
}: {
  company: string;
  role: string;
  period: { start: string; end: string };
  logo: string;
  logoBackground?: string;
  locationText: string;
  tasks: string[];
  projectLinks?: Array<{ name: string; url: string }>;
  techStack?: string[];
}) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-4 flex items-center justify-center">
        <div className={`w-12 h-12 rounded-full ${logoBackground || "bg-white"} border border-gray-200 flex items-center justify-center overflow-hidden`}>
          <Image 
            src={logo}
            alt={company}
            width={32}
            height={32}
            className="w-9 h-9 object-contain"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <time className="text-xs text-muted-foreground">
          <span>{period.start}</span>
          <span> - </span>
          <span>{period.end}</span>
        </time>
        <h2 className="font-semibold leading-none">{company}</h2>
        <p className="text-sm text-muted-foreground">{role}</p>
        <p className="text-sm text-muted-foreground">{locationText}</p>
        <ul className="ml-4 list-outside list-disc">
          {tasks.map((task, index) => (
            <li key={index} className="prose pr-8 text-sm dark:prose-invert">{task}</li>
          ))}
        </ul>
      </div>
      
      {/* Tech Stack Badges */}
      {techStack && techStack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {techStack.map((tech, index) => {
            const faIcon = getTechIcon(tech);
            const simpleIcon = getSimpleTechIcon(tech);
            
            return (
              <div 
                key={index}
                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
              >
                {faIcon && (
                  <FontAwesomeIcon 
                    icon={faIcon} 
                    className="w-3.5 h-3.5 mr-1.5" 
                  />
                )}
                {!faIcon && simpleIcon && (
                  <span 
                    dangerouslySetInnerHTML={{ __html: simpleIcon.svg }} 
                    className="w-3.5 h-3.5 mr-1.5 flex-shrink-0"
                    style={{ fill: 'currentColor' }}
                  />
                )}
                {tech}
              </div>
            );
          })}
        </div>
      )}
      
      {projectLinks && projectLinks.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {projectLinks.map((link, index) => (
            <a key={index} href={link.url}>
              <div 
                className="items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 flex gap-2" 
                title={link.name}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe size-3" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                {link.name}
              </div>
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

function EducationTimelineItem({ 
  institution, 
  degree, 
  period, 
  logo, 
  locationText,
  description,
  thesis,
  techStack
}: {
  institution: string;
  degree: string;
  period: { start: string; end: string };
  logo: string;
  locationText: string;
  description: string;
  thesis?: { title: string; description: string; link: string };
  techStack?: string[];
}) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-4 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
          <Image 
            src={logo}
            alt={institution}
            width={32}
            height={32}
            className="w-9 h-9 object-contain"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <time className="text-xs text-muted-foreground">
          <span>{period.start}</span>
          <span> - </span>
          <span>{period.end}</span>
        </time>
        <h2 className="font-semibold leading-none">{institution}</h2>
        <p className="text-sm text-muted-foreground">{degree}</p>
        <p className="text-sm text-muted-foreground">{locationText}</p>
        <p className="prose pr-8 text-sm dark:prose-invert mt-2">{description}</p>
        
        {/* Tech Stack Badges */}
        {techStack && techStack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {techStack.map((tech, index) => {
              const faIcon = getTechIcon(tech);
              const simpleIcon = getSimpleTechIcon(tech);
              
              return (
                <div 
                  key={index}
                  className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                >
                  {faIcon && (
                    <FontAwesomeIcon 
                      icon={faIcon} 
                      className="w-3.5 h-3.5 mr-1.5" 
                    />
                  )}
                  {!faIcon && simpleIcon && (
                    <span 
                      dangerouslySetInnerHTML={{ __html: simpleIcon.svg }} 
                      className="w-3.5 h-3.5 mr-1.5 flex-shrink-0"
                      style={{ fill: 'currentColor' }}
                    />
                  )}
                  {tech}
                </div>
              );
            })}
          </div>
        )}
        
        {thesis && (
          <div className="mt-2">
            <h3 className="text-sm font-semibold">Thesis: {thesis.title}</h3>
            <p className="text-sm text-muted-foreground">{thesis.description}</p>
            <a href={thesis.link} className="text-sm text-blue-500 hover:underline">Read Thesis</a>
          </div>
        )}
      </div>
    </li>
  );
}

function ProjectCard({ title, description, tags, github }: {
  title: string;
  description: string;
  tags: string[];
  github: string;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => {
          const faIcon = getTechIcon(tag);
          const simpleIcon = getSimpleTechIcon(tag);
          
          return (
            <span 
              key={index} 
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded flex items-center"
            >
              {faIcon && (
                <FontAwesomeIcon 
                  icon={faIcon} 
                  className="w-3.5 h-3.5 mr-1.5" 
                />
              )}
              {!faIcon && simpleIcon && (
                <span 
                  dangerouslySetInnerHTML={{ __html: simpleIcon.svg }} 
                  className="w-3.5 h-3.5 mr-1.5 flex-shrink-0"
                  style={{ fill: 'currentColor' }}
                />
              )}
              {tag}
            </span>
          );
        })}
      </div>
      <a href={github} className="text-sm text-blue-500 hover:underline inline-flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77a5.07 5.07 0 0 0-.09-3.77S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1a5.07 5.07 0 0 0-.09 3.77A5.44 5.44 0 0 0 3 8.52c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.61V22"></path>
        </svg>
        View on GitHub
      </a>
    </div>
  );
}
