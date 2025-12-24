import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { HiArrowRight, HiDownload } from "react-icons/hi";
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiJavascript, SiTypescript } from "react-icons/si";
import profileImg from "../../assets/images/profile.jpg";

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const iconsRef = useRef(null);

  // Typing animation state
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    "A Full Stack Developer",
    "Building Ideas to scalable solutions",
    "A React Enthusiast",
    "Turning complex problems into code",
  ];

  // Typing effect
  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));

        if (displayText === currentTitle) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Text animations
      tl.fromTo(".hero-greeting", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 })
        .fromTo(".hero-name", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".hero-title", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".hero-desc", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(
          ".hero-cta",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          ".hero-social",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        );

      // Image animation
      tl.fromTo(imageRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, "-=1.5");

      // Floating tech icons
      gsap.fromTo(
        ".floating-icon",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 1.2,
        }
      );

      // Continuous floating animation for icons
      gsap.to(".floating-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // Rotate ring animation
      gsap.to(".hero-ring", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Glow pulse
      gsap.to(".hero-glow", {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const floatingIcons = [
    { Icon: SiReact, color: "#61DAFB", position: "top-10 right-20" },
    { Icon: SiNodedotjs, color: "#339933", position: "top-32 right-0" },
    { Icon: SiMongodb, color: "#47A248", position: "bottom-32 right-5" },
    { Icon: SiTailwindcss, color: "#06B6D4", position: "bottom-10 right-28" },
    { Icon: SiJavascript, color: "#F7DF1E", position: "bottom-20 left-0" },
    { Icon: SiTypescript, color: "#3178C6", position: "top-20 left-5" },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center px-8 lg:px-16 py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <div ref={textRef} className="z-10">
          {/* Greeting */}
          <p className="hero-greeting text-secondary text-lg md:text-xl mb-4 tracking-wider">✨ Hello, I'm</p>

          {/* Name */}
          <h1 className="hero-name text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
            <span className="text-base-content">Sarwar</span>
          </h1>
          <h1 className="hero-name text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Morshad
            </span>
            <span className="text-primary">.</span>
          </h1>

          {/* Title with typing effect */}
          <h2 className="hero-title text-xl md:text-2xl lg:text-3xl text-base-content/80 mb-6 flex items-center gap-3 h-10">
            <span className="w-8 h-[2px] bg-secondary"></span>
            <span className="text-primary font-semibold">
              {displayText}
              <span className="animate-pulse text-secondary">|</span>
            </span>
          </h2>

          {/* Description */}
          <p className="hero-desc text-base-content/60 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            I'm a skilled full-stack developer with expertise in the{" "}
            <span className="text-primary">MERN stack</span>. Currently pursuing my Master's at{" "}
            <span className="text-secondary">TU Chemnitz, Germany</span>. I specialize in building modern web
            applications with React, Node.js, and interactive experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#contact" className="hero-cta group btn btn-primary btn-lg px-8 rounded-full gap-2">
              Contact me!
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/cv.pdf"
              download
              className="hero-cta btn btn-outline btn-lg px-8 rounded-full gap-2 border-base-300 hover:border-secondary hover:bg-secondary/10"
            >
              <HiDownload />
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-base-content/40 text-sm">Find me on</span>
            <div className="flex gap-3">
              <a
                href="https://github.com/SarwarMorshad"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social w-11 h-11 flex items-center justify-center rounded-full bg-base-200/50 border border-base-300 text-base-content/70 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/sarwarmorshad/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social w-11 h-11 flex items-center justify-center rounded-full bg-base-200/50 border border-base-300 text-base-content/70 hover:border-secondary hover:text-secondary hover:bg-secondary/10 transition-all duration-300"
              >
                <FaLinkedinIn size={20} />
              </a>

              <a
                href="mailto:dev.sarwarmorshad@gmail.com"
                className="hero-social w-11 h-11 flex items-center justify-center rounded-full bg-base-200/50 border border-base-300 text-base-content/70 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Profile Image with Effects */}
        <div className="relative flex items-center justify-center">
          {/* Background Glows */}
          <div className="hero-glow absolute w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px]" />
          <div className="absolute w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] translate-x-20" />

          {/* Rotating Ring */}
          <div className="hero-ring absolute w-[420px] h-[420px] border border-dashed border-primary/30 rounded-full" />
          <div
            className="hero-ring absolute w-[480px] h-[480px] border border-base-300/20 rounded-full"
            style={{ animationDirection: "reverse" }}
          />

          {/* Profile Image Container */}
          <div ref={imageRef} className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px]">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-[3px]">
              <div className="w-full h-full rounded-full bg-base-100 p-2">
                {/* Image */}
                <div className="w-full h-full rounded-full overflow-hidden bg-base-200">
                  <img src={profileImg} alt="Sarwar Morshad" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-base-200 border border-base-300 px-4 py-2 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-base-content/80">Available for work</span>
            </div>
          </div>

          {/* Floating Tech Icons */}
          <div ref={iconsRef} className="absolute inset-0">
            {floatingIcons.map(({ Icon, color, position }, index) => (
              <div
                key={index}
                className={`floating-icon absolute ${position} w-12 h-12 flex items-center justify-center rounded-xl bg-base-200/80 backdrop-blur-sm border border-base-300 shadow-lg`}
              >
                <Icon size={24} style={{ color }} />
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-1/4 w-3 h-3 bg-secondary rounded-full animate-ping" />
          <div className="absolute bottom-1/4 left-0 w-4 h-4 bg-primary/50 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-0 w-2 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>

      {/* Background Decorative Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/10 rounded-lg rotate-12 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-16 h-16 border border-secondary/10 rounded-full animate-bounce" />
      <div className="absolute top-1/2 right-1/4 w-2 h-20 bg-gradient-to-b from-primary/20 to-transparent rounded-full" />
    </section>
  );
};

export default Hero;
