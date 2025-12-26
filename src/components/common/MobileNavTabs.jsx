import { useState, useEffect, useRef } from "react";
import { HiHome, HiUser, HiCode, HiFolderOpen, HiMail, HiDownload } from "react-icons/hi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const MobileNavTabs = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const tabsRef = useRef(null);
  const activeTabRef = useRef(null);

  const navLinks = [
    { name: "Home", icon: <HiHome size={18} />, href: "#home" },
    { name: "About", icon: <HiUser size={18} />, href: "#about" },
    { name: "Skills", icon: <HiCode size={18} />, href: "#skills" },
    { name: "Projects", icon: <HiFolderOpen size={18} />, href: "#projects" },
    { name: "Contact", icon: <HiMail size={18} />, href: "#contact" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub size={16} />, href: "https://github.com/SarwarMorshad" },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn size={16} />,
      href: "https://www.linkedin.com/in/sarwarmorshad/",
    },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.replace("#", ""));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll to active tab
  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const tabRect = activeTabRef.current.getBoundingClientRect();
      const containerRect = tabsRef.current.getBoundingClientRect();

      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        activeTabRef.current.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeSection]);

  const handleNavClick = (href) => {
    setActiveSection(href.replace("#", ""));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
        isScrolled ? "bg-base-200/95 backdrop-blur-xl shadow-lg border-b border-base-300" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo/Name */}
        <a href="#home" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span
            className={`font-bold text-base-content transition-opacity duration-300 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            Sarwar
          </span>
        </a>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Social Links (visible when scrolled) */}
          <div
            className={`flex items-center gap-1 transition-all duration-300 ${
              isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-base-300/50 flex items-center justify-center text-base-content/70 hover:text-primary transition-all"
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Download CV */}

          <a
            href="/cv.pdf"
            download
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-content text-sm font-medium transition-all ${
              isScrolled ? "opacity-100" : "opacity-80"
            }`}
          >
            <HiDownload size={16} />
            <span className="hidden sm:inline">CV</span>
          </a>
        </div>
      </div>

      {/* Scrollable Tabs */}
      <nav
        ref={tabsRef}
        className={`flex items-center gap-1 px-4 pb-2 overflow-x-auto scrollbar-hide transition-all duration-300 ${
          isScrolled ? "pt-0" : "pt-2"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <a
              key={link.name}
              href={link.href}
              ref={isActive ? activeTabRef : null}
              onClick={() => handleNavClick(link.href)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                isActive
                  ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                  : "bg-base-300/50 text-base-content/70 hover:text-primary hover:bg-base-300"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </a>
          );
        })}
      </nav>

      {/* Progress indicator */}
      <div className="h-0.5 bg-base-300">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{
            width: `${
              ((navLinks.findIndex((l) => l.href === `#${activeSection}`) + 1) / navLinks.length) * 100
            }%`,
          }}
        />
      </div>
    </header>
  );
};

export default MobileNavTabs;
