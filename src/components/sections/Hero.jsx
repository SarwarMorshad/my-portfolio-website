import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { HiArrowRight, HiDownload } from "react-icons/hi";
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiJavascript, SiTypescript } from "react-icons/si";
import profileImg from "../../assets/images/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const iconsRef = useRef(null);

  // Typing animation state
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Decrypted text state
  const [decryptedText, setDecryptedText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);

  const titles = ["A Creative Problem Solver", "Full Stack MERN Developer", "UI/UX Enthusiast"];

  const originalDescription =
    "I am a dedicated Software Developer with a strong background in front-end and full-stack development, currently pursuing a Master’s in Automotive Software Engineering at Technische Universität Chemnitz, Germany. My academic journey and professional experiences have equipped me with both the technical expertise and practical skills to design and deliver scalable, user-focused software solutions.";

  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Decryption effect
  useEffect(() => {
    const startDecryption = () => {
      setIsDecrypting(true);
      let iteration = 0;
      const totalLength = originalDescription.length;

      const interval = setInterval(() => {
        setDecryptedText(
          originalDescription
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return originalDescription[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        iteration += 1;

        if (iteration > totalLength) {
          clearInterval(interval);
          setIsDecrypting(false);
        }
      }, 20);

      return () => clearInterval(interval);
    };

    const timeout = setTimeout(startDecryption, 1500);
    return () => clearTimeout(timeout);
  }, []);

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

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ========== INITIAL LOAD ANIMATIONS ==========
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Set initial state - make sure everything is visible
      gsap.set(
        [".hero-greeting", ".hero-name", ".hero-title", ".hero-desc", ".hero-cta", ".hero-social-container"],
        { opacity: 1, y: 0, filter: "blur(0px)" }
      );

      // Animate in from initial state
      tl.fromTo(".hero-greeting", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 })
        .fromTo(".hero-name", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".hero-title", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".hero-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(
          ".hero-cta",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          ".hero-social-container",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        );

      // Image animation
      tl.fromTo(
        ".hero-image-container",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        "-=1.5"
      );

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

      // Continuous animations
      gsap.to(".floating-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to(".hero-ring", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-glow", {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ========== SCROLL FADE EFFECT ==========

      // Create a timeline for scroll animations
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Add animations to the scroll timeline
      scrollTl
        .to(".hero-greeting", { y: -100, opacity: 0, filter: "blur(10px)" }, 0)
        .to(".hero-name", { y: -120, opacity: 0, filter: "blur(10px)" }, 0.05)
        .to(".hero-title", { y: -100, opacity: 0, filter: "blur(10px)" }, 0.1)
        .to(".hero-desc", { y: -80, opacity: 0, filter: "blur(10px)" }, 0.15)
        .to(".hero-cta", { y: -60, opacity: 0, filter: "blur(10px)", stagger: 0.02 }, 0.2)
        .to(".hero-social-container", { y: -40, opacity: 0, filter: "blur(10px)" }, 0.25)
        .to(".hero-image-container", { y: -80, opacity: 0, scale: 0.9, filter: "blur(5px)" }, 0)
        .to(".floating-icon", { opacity: 0, scale: 0, stagger: 0.02 }, 0.1);
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

  // Render description with highlighted keywords
  const renderDecryptedText = () => {
    if (!decryptedText) {
      return (
        <span className="text-primary/50">
          {chars
            .split("")
            .slice(0, originalDescription.length)
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("")}
        </span>
      );
    }

    const highlightWords = [
      { word: "MERN stack", color: "text-primary font-semibold" },
      { word: "TU Chemnitz, Germany", color: "text-secondary font-semibold" },
      { word: "React", color: "text-cyan-400" },
      { word: "Node.js", color: "text-green-400" },
    ];

    let result = decryptedText;
    let elements = [];
    let lastIndex = 0;

    highlightWords.forEach(({ word, color }) => {
      const index = result.indexOf(word, lastIndex);
      if (index !== -1) {
        if (index > lastIndex) {
          elements.push(<span key={`text-${lastIndex}`}>{result.substring(lastIndex, index)}</span>);
        }
        elements.push(
          <span key={`highlight-${index}`} className={color}>
            {word}
          </span>
        );
        lastIndex = index + word.length;
      }
    });

    if (lastIndex < result.length) {
      elements.push(<span key={`text-end`}>{result.substring(lastIndex)}</span>);
    }

    return elements.length > 0 ? elements : decryptedText;
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center px-8 lg:px-16 py-20 overflow-hidden relative pt-24 lg:pt-0"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <div ref={textRef} className="z-10">
          {/* Greeting */}
          <p className="hero-greeting text-secondary text-lg md:text-xl mb-4 tracking-wider">Hello, I'm</p>

          {/* Name */}
          <h1 className="hero-name text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
            <span className="text-base-content">Sarwar</span>
          </h1>
          <h1 className="hero-name text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Morshad
            </span>
            <span className="text-primary">.</span>
          </h1>

          {/* Title with typing effect */}
          <h2 className="hero-title text-xl md:text-2xl lg:text-3xl text-base-content/80 mb-6 flex items-center gap-3 h-10">
            <span className="w-8 h-0.5 bg-secondary"></span>
            <span className="text-primary font-semibold">
              {displayText}
              <span className="animate-pulse text-secondary">|</span>
            </span>
          </h2>

          {/* Description with Decryption Effect */}
          <div className="hero-desc relative mb-8">
            {isDecrypting && (
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
              </div>
            )}

            <p
              className={`text-base-content/60 text-base md:text-lg max-w-xl leading-relaxed font-mono transition-all duration-300 ${
                isDecrypting ? "text-primary/70" : ""
              }`}
            >
              {renderDecryptedText()}
            </p>

            {isDecrypting && (
              <div className="absolute -bottom-2 left-0 h-0.5 bg-linear-to-r from-primary to-secondary animate-pulse w-full opacity-50" />
            )}
          </div>

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
          <div className="hero-social-container flex items-center gap-4">
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
        <div className="hero-image-container relative flex items-center justify-center">
          {/* Background Glows */}
          <div className="hero-glow absolute w-100 h-100 bg-primary/30 rounded-full blur-[100px]" />
          <div className="absolute w-75 h-75 bg-secondary/20 rounded-full blur-[80px] translate-x-20" />

          {/* Rotating Ring */}
          <div className="hero-ring absolute w-105 h-105 border border-dashed border-primary/30 rounded-full" />
          <div
            className="hero-ring absolute w-120 h-120 border border-base-300/20 rounded-full"
            style={{ animationDirection: "reverse" }}
          />

          {/* Profile Image Container */}
          <div ref={imageRef} className="relative w-80 h-80 md:w-95 md:h-95">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary via-secondary to-accent p-0.75">
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
      <div className="absolute top-1/2 right-1/4 w-2 h-20 bg-linear-to-b from-primary/20 to-transparent rounded-full" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-base-content/40 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-base-content/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
