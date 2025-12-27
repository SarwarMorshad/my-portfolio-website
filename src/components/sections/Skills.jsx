import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiJavascript,
  SiTypescript,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiReactrouter,
  SiRedux,
  SiVuedotjs,
  SiBootstrap,
  SiDaisyui,
  SiChartdotjs,
  SiThreedotjs,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiFirebase,
  SiJsonwebtokens,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiCloudflare,
  SiCanva,
  SiFigma,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { HiRefresh, HiCode, HiServer, HiDatabase, HiCog, HiColorSwatch } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const SkillsRadar = () => {
  const sectionRef = useRef(null);
  const radarRef = useRef(null);
  const [animateRadar, setAnimateRadar] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [showComparison, setShowComparison] = useState(false);
  const [counters, setCounters] = useState({});
  const [particles, setParticles] = useState([]);

  const categories = [
    {
      name: "Languages",
      value: 85,
      industryAvg: 70,
      icon: <HiCode />,
      color: "#F7DF1E",
      skills: [
        { name: "JavaScript", icon: <SiJavascript />, level: 95 },
        { name: "TypeScript", icon: <SiTypescript />, level: 88 },
        { name: "Go", icon: <SiGo />, level: 65 },
        { name: "GraphQL", icon: <SiGraphql />, level: 75 },
      ],
    },
    {
      name: "Frontend",
      value: 92,
      industryAvg: 75,
      icon: <SiReact />,
      color: "#61DAFB",
      skills: [
        { name: "React", icon: <SiReact />, level: 95 },
        { name: "Next.js", icon: <SiNextdotjs />, level: 85 },
        { name: "TailwindCSS", icon: <SiTailwindcss />, level: 95 },
        { name: "HTML5", icon: <SiHtml5 />, level: 98 },
        { name: "CSS3", icon: <SiCss3 />, level: 95 },
        { name: "Vue.js", icon: <SiVuedotjs />, level: 70 },
        { name: "Redux", icon: <SiRedux />, level: 82 },
        { name: "React Router", icon: <SiReactrouter />, level: 90 },
        { name: "Bootstrap", icon: <SiBootstrap />, level: 88 },
        { name: "DaisyUI", icon: <SiDaisyui />, level: 90 },
        { name: "Chart.js", icon: <SiChartdotjs />, level: 78 },
        { name: "Three.js", icon: <SiThreedotjs />, level: 72 },
        { name: "Vite", icon: <SiVite />, level: 88 },
      ],
    },
    {
      name: "Backend",
      value: 88,
      industryAvg: 68,
      icon: <HiServer />,
      color: "#339933",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs />, level: 92 },
        { name: "Express.js", icon: <SiExpress />, level: 90 },
        { name: "Prisma", icon: <SiPrisma />, level: 75 },
        { name: "Nodemon", icon: <HiRefresh />, level: 85 },
      ],
    },
    {
      name: "Database",
      value: 82,
      industryAvg: 65,
      icon: <HiDatabase />,
      color: "#47A248",
      skills: [
        { name: "MongoDB", icon: <SiMongodb />, level: 90 },
        { name: "MySQL", icon: <SiMysql />, level: 78 },
        { name: "PostgreSQL", icon: <SiPostgresql />, level: 72 },
      ],
    },
    {
      name: "Tools",
      value: 88,
      industryAvg: 72,
      icon: <HiCog />,
      color: "#F05032",
      skills: [
        { name: "Git", icon: <SiGit />, level: 92 },
        { name: "GitHub", icon: <SiGithub />, level: 95 },
        { name: "Firebase", icon: <SiFirebase />, level: 85 },
        { name: "JWT", icon: <SiJsonwebtokens />, level: 88 },
        { name: "Postman", icon: <SiPostman />, level: 90 },
        { name: "VS Code", icon: <VscCode />, level: 95 },
        { name: "Vercel", icon: <SiVercel />, level: 88 },
        { name: "Netlify", icon: <SiNetlify />, level: 85 },
        { name: "Cloudflare", icon: <SiCloudflare />, level: 75 },
      ],
    },
    {
      name: "Design",
      value: 78,
      industryAvg: 60,
      icon: <HiColorSwatch />,
      color: "#F24E1E",
      skills: [
        { name: "Figma", icon: <SiFigma />, level: 78 },
        { name: "Canva", icon: <SiCanva />, level: 80 },
      ],
    },
  ];

  // Get top 3 skills for star indicators
  const topSkills = [...categories].sort((a, b) => b.value - a.value).slice(0, 3);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  // Animated counters
  useEffect(() => {
    if (animateRadar) {
      categories.forEach((cat) => {
        let current = 0;
        const target = cat.value;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters((prev) => ({ ...prev, [cat.name]: Math.round(current) }));
        }, 30);
      });
    } else {
      setCounters({});
    }
  }, [animateRadar]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => setAnimateRadar(true),
        onLeaveBack: () => setAnimateRadar(false),
      });

      // Header animation
      gsap.fromTo(
        ".skills-radar-header",
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

      // Left grid animation
      gsap.fromTo(
        ".skill-panel",
        { opacity: 0, x: -50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-left-grid",
            start: "top 85%",
            end: "top 65%",
            scrub: 1,
          },
        }
      );

      // Radar container with rotation
      gsap.fromTo(
        ".radar-container",
        { opacity: 0, scale: 0.5, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".radar-container",
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        ".stats-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 90%",
            end: "top 75%",
            scrub: 1,
          },
        }
      );

      // Exit animations
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      exitTl
        .to(".skills-radar-header", { opacity: 0, y: -80, filter: "blur(10px)" }, 0)
        .to(".skills-left-grid", { opacity: 0, x: -50 }, 0.1)
        .to(".radar-container", { opacity: 0, scale: 0.8, rotation: 45 }, 0.1)
        .to(".stats-section", { opacity: 0, y: -30 }, 0.2)
        .to(".comparison-toggle", { opacity: 0, y: -20 }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate polygon points for radar chart
  const getPolygonPoints = (values, maxRadius, animated) => {
    const angleStep = (2 * Math.PI) / values.length;
    const points = values.map((value, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const radius = animated ? (value / 100) * maxRadius : 0;
      const x = 200 + radius * Math.cos(angle);
      const y = 200 + radius * Math.sin(angle);
      return `${x},${y}`;
    });
    return points.join(" ");
  };

  // Get label positions
  const getLabelPosition = (index, total, radius) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = 200 + radius * Math.cos(angle);
    const y = 200 + radius * Math.sin(angle);
    return { x, y, angle };
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen py-32 px-8 lg:px-16 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
                              radial-gradient(circle at 70% 70%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/30 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="skills-radar-header text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 px-4 py-2 rounded-full mb-6 animate-pulse">
            <span className="text-primary">📡</span>
            <span className="text-primary text-sm font-mono">SKILL RADAR v2.0</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-base-content">Competency </span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              Analysis
            </span>
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            Interactive visualization of my technical expertise across different domains
          </p>

          {/* Comparison Toggle */}
          <div className="comparison-toggle mt-6">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                showComparison
                  ? "bg-secondary text-secondary-content shadow-lg shadow-secondary/30"
                  : "bg-base-200/50 border border-base-300 text-base-content/70 hover:border-secondary/50"
              }`}
            >
              {showComparison ? "✓ Comparing with Industry" : "Compare with Industry Average"}
            </button>
          </div>
        </div>

        {/* Main Content: Left Grid + Radar */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Left Skills Grid */}
          <div className="skills-left-grid lg:col-span-2 grid grid-cols-2 gap-3 content-start">
            {categories.map((category, index) => {
              const isHighlighted = hoveredSkill === category.name || selectedCategory === category.name;
              const isTopSkill = topSkills.some((s) => s.name === category.name);

              return (
                <div
                  key={index}
                  className={`skill-panel relative overflow-hidden bg-base-200/30 backdrop-blur-sm border rounded-2xl p-4 transition-all duration-300 cursor-pointer group ${
                    isHighlighted
                      ? "border-primary bg-primary/10 scale-105 shadow-xl"
                      : "border-base-300 hover:border-primary/50"
                  }`}
                  onMouseEnter={() => setHoveredSkill(category.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === category.name ? null : category.name)
                  }
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${category.color}40 0%, transparent 70%)`,
                    }}
                  />

                  {/* Top skill star indicator */}
                  {isTopSkill && (
                    <div className="absolute top-2 right-2">
                      <span className="text-yellow-400 text-sm">⭐</span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <span
                      className="text-2xl group-hover:scale-110 transition-transform"
                      style={{ color: category.color }}
                    >
                      {category.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-base-content">{category.name}</p>
                      <p className="text-xl font-bold" style={{ color: category.color }}>
                        {counters[category.name] || 0}%
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-base-300 rounded-full overflow-hidden mb-2 relative z-10">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: animateRadar ? `${category.value}%` : "0%",
                        backgroundColor: category.color,
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between relative z-10">
                    <p className="text-xs text-base-content/50">{category.skills.length} skills</p>
                    <span className="text-xs text-green-400 font-medium">
                      +{category.value - category.industryAvg}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Radar Chart */}
          <div className="radar-container lg:col-span-3 flex justify-center items-center">
            <div
              ref={radarRef}
              className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]"
            >
              {/* Outer Glow Ring */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                  animateRadar ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(circle, transparent 60%, rgba(99, 102, 241, 0.1) 70%, transparent 80%)",
                  animation: "pulse 3s ease-in-out infinite",
                }}
              />

              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Animated Background Circles */}
                {[20, 40, 60, 80, 100].map((percent, i) => (
                  <g key={i}>
                    <polygon
                      points={getPolygonPoints(Array(6).fill(percent), 150, true)}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-base-300/30"
                      strokeDasharray={animateRadar ? "0" : "1000"}
                      style={{
                        transition: "stroke-dasharray 1s ease-out",
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </g>
                ))}

                {/* Percentage labels */}
                {[20, 40, 60, 80, 100].map((percent, i) => (
                  <text
                    key={i}
                    x={208}
                    y={200 - (percent / 100) * 150 + 4}
                    className="text-[10px] fill-base-content/40 font-mono"
                  >
                    {percent}%
                  </text>
                ))}

                {/* Axis lines with animation */}
                {categories.map((_, index) => {
                  const pos = getLabelPosition(index, categories.length, 150);
                  return (
                    <line
                      key={index}
                      x1="200"
                      y1="200"
                      x2={pos.x}
                      y2={pos.y}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-base-300/20"
                      strokeDasharray={animateRadar ? "0" : "200"}
                      style={{
                        transition: "stroke-dasharray 0.8s ease-out",
                        transitionDelay: `${index * 50}ms`,
                      }}
                    />
                  );
                })}

                {/* Industry Average Polygon (Comparison) */}
                {showComparison && (
                  <polygon
                    points={getPolygonPoints(
                      categories.map((s) => s.industryAvg),
                      150,
                      animateRadar
                    )}
                    fill="rgba(156, 163, 175, 0.1)"
                    stroke="rgba(156, 163, 175, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="transition-all duration-1000 ease-out"
                    style={{ opacity: animateRadar ? 1 : 0 }}
                  />
                )}

                {/* Main Data Polygon */}
                <polygon
                  points={getPolygonPoints(
                    categories.map((s) => s.value),
                    150,
                    animateRadar
                  )}
                  fill="url(#radarGradient)"
                  stroke="url(#radarStroke)"
                  strokeWidth="3"
                  className="transition-all duration-1000 ease-out"
                  style={{ opacity: animateRadar ? 1 : 0 }}
                />

                {/* Connection Lines Animation */}
                {animateRadar &&
                  categories.map((cat, index) => {
                    const nextIndex = (index + 1) % categories.length;
                    const pos1 = getLabelPosition(index, categories.length, (cat.value / 100) * 150);
                    const pos2 = getLabelPosition(
                      nextIndex,
                      categories.length,
                      (categories[nextIndex].value / 100) * 150
                    );
                    return (
                      <line
                        key={`connection-${index}`}
                        x1={pos1.x}
                        y1={pos1.y}
                        x2={pos2.x}
                        y2={pos2.y}
                        stroke="url(#radarStroke)"
                        strokeWidth="2"
                        className="animate-pulse"
                        style={{
                          opacity: 0.3,
                          animationDelay: `${index * 200}ms`,
                        }}
                      />
                    );
                  })}

                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4">
                      <animate
                        attributeName="stop-color"
                        values="#6366f1;#22d3ee;#a855f7;#6366f1"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.3">
                      <animate
                        attributeName="stop-color"
                        values="#22d3ee;#a855f7;#6366f1;#22d3ee"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4">
                      <animate
                        attributeName="stop-color"
                        values="#a855f7;#6366f1;#22d3ee;#a855f7"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                  <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Data Points (No animated stars on radar) */}
                {categories.map((category, index) => {
                  const pos = getLabelPosition(
                    index,
                    categories.length,
                    animateRadar ? (category.value / 100) * 150 : 0
                  );
                  const isHighlighted = hoveredSkill === category.name || selectedCategory === category.name;

                  return (
                    <g key={index}>
                      {/* Main point */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHighlighted ? 12 : 8}
                        fill={category.color}
                        stroke="white"
                        strokeWidth="3"
                        filter={isHighlighted ? "url(#glow)" : ""}
                        className="transition-all duration-300 cursor-pointer"
                        style={{
                          transitionDelay: `${index * 100}ms`,
                          filter: isHighlighted
                            ? `drop-shadow(0 0 15px ${category.color})`
                            : `drop-shadow(0 0 5px ${category.color}50)`,
                        }}
                        onMouseEnter={() => setHoveredSkill(category.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onClick={() =>
                          setSelectedCategory(selectedCategory === category.name ? null : category.name)
                        }
                      />
                    </g>
                  );
                })}

                {/* Center decoration */}
                <circle cx="200" cy="200" r="5" fill="url(#radarStroke)" className="animate-pulse" />
                <circle
                  cx="200"
                  cy="200"
                  r="15"
                  fill="none"
                  stroke="url(#radarStroke)"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </svg>

              {/* Labels around the radar */}
              {categories.map((category, index) => {
                const pos = getLabelPosition(index, categories.length, 185);
                const isHighlighted = hoveredSkill === category.name || selectedCategory === category.name;

                return (
                  <div
                    key={index}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer ${
                      isHighlighted ? "scale-110 z-20" : "z-10"
                    }`}
                    style={{
                      left: `${(pos.x / 400) * 100}%`,
                      top: `${(pos.y / 400) * 100}%`,
                    }}
                    onMouseEnter={() => setHoveredSkill(category.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === category.name ? null : category.name)
                    }
                  >
                    <div
                      className={`flex items-center gap-2 bg-base-200/95 backdrop-blur-md px-3 py-2 rounded-xl border-2 transition-all ${
                        isHighlighted
                          ? "border-primary shadow-xl scale-105"
                          : "border-base-300/50 hover:border-base-300"
                      }`}
                      style={{
                        boxShadow: isHighlighted ? `0 0 20px ${category.color}40` : "none",
                      }}
                    >
                      <span
                        className={`text-lg transition-transform ${isHighlighted ? "scale-125" : ""}`}
                        style={{ color: category.color }}
                      >
                        {category.icon}
                      </span>
                      <div className="text-left">
                        <p className="text-xs font-bold text-base-content">{category.name}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold" style={{ color: category.color }}>
                            {counters[category.name] || 0}%
                          </span>
                          {showComparison && (
                            <span className="text-[10px] text-green-400">
                              (+{category.value - category.industryAvg})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Legend for comparison */}
              {showComparison && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-base-200/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded" />
                    <span className="text-base-content/70">My Skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gray-400 rounded" style={{ borderStyle: "dashed" }} />
                    <span className="text-base-content/70">Industry Avg</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Category Details */}
        {selectedCategory && (
          <div className="mb-12 animate-fadeIn">
            <div className="bg-base-200/50 backdrop-blur-sm border border-base-300 rounded-3xl p-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      backgroundColor: `${categories.find((c) => c.name === selectedCategory)?.color}20`,
                      color: categories.find((c) => c.name === selectedCategory)?.color,
                    }}
                  >
                    {categories.find((c) => c.name === selectedCategory)?.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-base-content">{selectedCategory}</h3>
                    <p className="text-sm text-base-content/60">
                      {categories.find((c) => c.name === selectedCategory)?.skills.length} technologies
                      mastered
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className="text-3xl font-bold"
                    style={{
                      color: categories.find((c) => c.name === selectedCategory)?.color,
                    }}
                  >
                    {categories.find((c) => c.name === selectedCategory)?.value}%
                  </p>
                  <p className="text-xs text-green-400">
                    +
                    {(categories.find((c) => c.name === selectedCategory)?.value || 0) -
                      (categories.find((c) => c.name === selectedCategory)?.industryAvg || 0)}
                    % above average
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {categories
                  .find((c) => c.name === selectedCategory)
                  ?.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-base-300/30 hover:bg-base-300/50 px-4 py-3 rounded-xl transition-all group cursor-pointer"
                    >
                      <span
                        className="text-xl group-hover:scale-110 transition-transform"
                        style={{
                          color: categories.find((c) => c.name === selectedCategory)?.color,
                        }}
                      >
                        {skill.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-base-content truncate">{skill.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-base-300 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: categories.find((c) => c.name === selectedCategory)?.color,
                              }}
                            />
                          </div>
                          <span
                            className="text-xs font-bold"
                            style={{
                              color: categories.find((c) => c.name === selectedCategory)?.color,
                            }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Section */}
        <div className="stats-section grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Technologies", value: "35+", icon: "🛠️", color: "text-primary" },
            { label: "Avg. Proficiency", value: "87%", icon: "📊", color: "text-secondary" },
            { label: "Years Experience", value: "3+", icon: "📅", color: "text-accent" },
            { label: "Above Industry", value: "+17%", icon: "📈", color: "text-green-400" },
          ].map((stat, index) => (
            <div
              key={index}
              className="stats-card bg-base-200/30 backdrop-blur-sm border border-base-300 rounded-2xl p-5 text-center hover:border-primary/50 transition-all hover:scale-105"
            >
              <span className="text-2xl block mb-2">{stat.icon}</span>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-base-content/50">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-base-200/50 border border-base-300 px-6 py-3 rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
              <span className="text-sm text-base-content/60">Expert (90%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
              <span className="text-sm text-base-content/60">Advanced (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
              <span className="text-sm text-base-content/60">Intermediate (70%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50" />
              <span className="text-sm text-base-content/60">Learning (&lt;70%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.5; }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsRadar;
