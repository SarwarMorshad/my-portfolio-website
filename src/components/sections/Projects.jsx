import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiExternalLink, HiFolder, HiTerminal } from "react-icons/hi";
import { SiGithub } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const projects = [
    {
      title: "Book Now",
      subtitle: "Travel Booking Platform",
      description:
        "A comprehensive travel booking platform with multi-role systems (User, Vendor, Admin), Stripe payment integration, and JWT authentication.",
      features: [
        "Multi-role authentication",
        "Stripe payment integration",
        "Real-time booking",
        "Admin dashboard",
        "JWT security",
        "Modern UI",
      ],
      tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      github: "https://github.com/SarwarMorshad/book-now-client",
      live: "https://booknowbyshovon.netlify.app/",
      image: "https://i.postimg.cc/Y2ZMRpDQ/booknow.png",
      color: "#00fff5",
      folder: "book-now",
    },
    {
      title: "Bocado",
      subtitle: "Restaurant Website",
      description:
        "Spanish tapas restaurant website featuring a complete reservation system using EmailJS, custom branding and elegant animations.",
      features: [
        "Table reservation",
        "EmailJS integration",
        "Custom branding",
        "Smooth animations",
        "Interactive menu",
        "Responsive design",
      ],
      tech: ["React", "Vite", "EmailJS", "Tailwind CSS"],
      github: "https://github.com/SarwarMorshad/bocado-berlin",
      live: "https://bocadoberlin.de/",
      image: "https://i.postimg.cc/P54q2g8W/bocado.png",
      color: "#a7c957",
      folder: "bocado-berlin",
    },
    {
      title: "Movie Matrix",
      subtitle: "Movie Database App",
      description:
        "A feature-rich movie database application with Firebase authentication, CRUD operations, and advanced search filtering.",
      features: [
        "Firebase auth",
        "CRUD operations",
        "Search & filter",
        "Movie ratings",
        "Watchlist",
        "TMDB API",
      ],
      tech: ["React", "Firebase", "Tailwind CSS", "TMDB API"],
      github: "https://github.com/SarwarMorshad/movie-matrix-client",
      live: "https://movie-matrix-bb82a.web.app/",
      image: "https://i.postimg.cc/MGHztvwX/movie.png",
      color: "#8b5cf6",
      folder: "movie-matrix",
    },
    {
      title: "Warm Paws",
      subtitle: "Pet Adoption Platform",
      description:
        "A heartwarming pet adoption platform connecting loving homes with pets in need with user authentication and modern interface.",
      features: [
        "Pet listings",
        "Adoption system",
        "User profiles",
        "Search & filter",
        "Favorites",
        "Admin panel",
      ],
      tech: ["React", "Firebase", "Node.js", "MongoDB"],
      github: "https://github.com/SarwarMorshad/warm-paws",
      live: "https://warm-paws-932c4.web.app/",
      image: "https://i.postimg.cc/Kv1rX55d/warmpaws.png",
      color: "#00fff5",
      folder: "warm-paws",
    },
  ];

  const currentProject = projects[activeProject];

  // Typing animation for command
  useEffect(() => {
    const command = `git clone ${currentProject.github}`;
    let index = 0;
    setTypedCommand("");
    setShowOutput(false);

    const typeInterval = setInterval(() => {
      if (index < command.length) {
        setTypedCommand(command.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowOutput(true), 300);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [activeProject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation - Fade IN
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 80, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Terminal animation - Fade IN
      gsap.fromTo(
        ".terminal-window",
        { opacity: 0, y: 50, filter: "blur(10px)", scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".terminal-window",
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Project list animation - Fade IN
      gsap.fromTo(
        ".project-list-item",
        { opacity: 0, x: -30, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".project-list",
            start: "top 85%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );

      // Stats box animation - Fade IN
      gsap.fromTo(
        ".stats-box",
        { opacity: 0, y: 30, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          scrollTrigger: {
            trigger: ".stats-box",
            start: "top 90%",
            end: "top 75%",
            scrub: 1,
          },
        }
      );

      // Exit animation - Fade OUT
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      exitTl
        .to(".projects-header", { opacity: 0, y: -80, filter: "blur(10px)" }, 0)
        .to(".project-list", { opacity: 0, x: -50, filter: "blur(10px)" }, 0.1)
        .to(".terminal-window", { opacity: 0, y: -50, filter: "blur(10px)", scale: 0.95 }, 0.1)
        .to(".view-more-btn", { opacity: 0, y: -30, filter: "blur(5px)" }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen py-32 px-8 lg:px-16 relative overflow-hidden"
    >
      {/* Subtle Background - No solid black */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,0,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,255,0,0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="projects-header text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/50 px-4 py-2 rounded-full mb-6">
            <HiTerminal className="text-green-400" />
            <span className="text-green-400 text-sm font-mono">~/projects</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-mono mb-4">
            <span className="text-green-400">&gt;</span> <span className="text-base-content">My </span>
            <span className="text-green-400">Projects</span>
            <span className="text-green-400 animate-pulse">_</span>
          </h2>
          <p className="text-base-content/60 font-mono">$ ls -la ./featured-projects</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Project List - Left Side */}
          <div className="project-list lg:col-span-1 space-y-4">
            <div className="bg-base-200/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4">
              <p className="text-green-400 font-mono text-sm mb-3">
                <span className="text-base-content/50">$</span> ls ./projects
              </p>
              <div className="space-y-1">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveProject(index)}
                    className={`project-list-item flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all font-mono text-sm ${
                      activeProject === index
                        ? "bg-green-500/20 border border-green-500/50"
                        : "hover:bg-base-300/30 border border-transparent"
                    }`}
                  >
                    <HiFolder
                      className={`text-lg ${activeProject === index ? "text-green-400" : "text-yellow-500"}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`truncate ${
                          activeProject === index ? "text-green-400" : "text-base-content"
                        }`}
                      >
                        {project.folder}/
                      </p>
                      <p className="text-base-content/50 text-xs truncate">{project.subtitle}</p>
                    </div>
                    {activeProject === index && <span className="text-green-400 text-xs">▶</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-box bg-base-200/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4">
              <p className="text-green-400 font-mono text-sm mb-3">
                <span className="text-base-content/50">$</span> neofetch --projects
              </p>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/50">Total</span>
                  <span className="text-base-content">25+ repos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Featured</span>
                  <span className="text-green-400">4 projects</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Languages</span>
                  <span className="text-cyan-400">JS, TS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Status</span>
                  <span className="text-green-400">● Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Window - Right Side */}
          <div className="terminal-window lg:col-span-2">
            <div className="bg-base-200/50 backdrop-blur-sm border border-green-500/30 rounded-2xl overflow-hidden shadow-xl shadow-green-500/5">
              {/* Terminal Header */}
              <div className="bg-base-300/50 px-4 py-3 flex items-center gap-2 border-b border-green-500/20">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-base-content/50 font-mono">
                  sarwar@portfolio:~/projects/{currentProject.folder}
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm min-h-[500px]">
                {/* Git Clone Command */}
                <div className="mb-4">
                  <span className="text-green-400">➜</span> <span className="text-cyan-400">~/projects</span>{" "}
                  <span className="text-base-content">{typedCommand}</span>
                  <span className="animate-pulse text-green-400">▊</span>
                </div>

                {/* Output */}
                {showOutput && (
                  <div className="animate-fadeIn space-y-4">
                    {/* Clone Output */}
                    <div className="text-base-content/50 text-xs space-y-1">
                      <p>Cloning into '{currentProject.folder}'...</p>
                      <p>remote: Enumerating objects: 234, done.</p>
                      <p>remote: Counting objects: 100% (234/234), done.</p>
                      <p className="text-green-400">✓ Clone completed successfully</p>
                    </div>

                    {/* Project Info */}
                    <div className="border-t border-green-500/20 pt-4">
                      <p className="text-green-400 mb-2">$ cat README.md</p>

                      {/* Project Card */}
                      <div className="bg-base-300/30 rounded-xl overflow-hidden border border-green-500/20">
                        {/* Project Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={currentProject.image}
                            alt={currentProject.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-transparent to-transparent" />
                          <div
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: `${currentProject.color}20`,
                              color: currentProject.color,
                              border: `1px solid ${currentProject.color}50`,
                            }}
                          >
                            Featured
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="p-4">
                          <h3 className="text-2xl font-bold mb-1" style={{ color: currentProject.color }}>
                            # {currentProject.title}
                          </h3>
                          <p className="text-base-content/50 text-sm mb-3">{currentProject.subtitle}</p>
                          <p className="text-base-content/70 text-sm mb-4">{currentProject.description}</p>

                          {/* Features */}
                          <div className="mb-4">
                            <p className="text-green-400 text-xs mb-2">## Features</p>
                            <div className="grid grid-cols-2 gap-1">
                              {currentProject.features.map((feature, i) => (
                                <p key={i} className="text-base-content/60 text-xs flex items-center gap-1">
                                  <span style={{ color: currentProject.color }}>✓</span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div className="mb-4">
                            <p className="text-green-400 text-xs mb-2">## Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                              {currentProject.tech.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 text-xs rounded-full"
                                  style={{
                                    backgroundColor: `${currentProject.color}20`,
                                    color: currentProject.color,
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-4 border-t border-green-500/20">
                            <a
                              href={currentProject.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105"
                              style={{
                                backgroundColor: currentProject.color,
                                color: "#000",
                              }}
                            >
                              <HiExternalLink />$ npm run preview
                            </a>

                            <a
                              href={currentProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm border transition-all hover:scale-105"
                              style={{
                                borderColor: currentProject.color,
                                color: currentProject.color,
                              }}
                            >
                              <SiGithub />$ git remote -v
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Terminal Footer */}
                    <div className="pt-4">
                      <span className="text-green-400">➜</span>{" "}
                      <span className="text-cyan-400">~/{currentProject.folder}</span>{" "}
                      <span className="text-base-content/50">Select another project from the list...</span>
                      <span className="animate-pulse text-green-400">▊</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal Footer */}
              <div className="bg-base-300/50 px-4 py-2 border-t border-green-500/20 flex items-center justify-between">
                <span className="text-xs text-base-content/50 font-mono">
                  {currentProject.tech.length} dependencies | {currentProject.features.length} features
                </span>
                <span className="text-xs text-green-400 font-mono">⚡ zsh 5.9</span>
              </div>
            </div>
          </div>
        </div>

        {/* View More Button */}
        <div className="view-more-btn text-center mt-12">
          <a
            href="https://github.com/SarwarMorshad?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 font-mono hover:bg-green-500/30 transition-all hover:scale-105"
          >
            <SiGithub />$ git clone --all-repos
          </a>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Projects;
