import { useState } from "react";
import { HiHome, HiUser, HiCode, HiFolderOpen, HiMail, HiDownload } from "react-icons/hi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navLinks = [
    { name: "Home", icon: <HiHome size={22} />, href: "#home" },
    { name: "About", icon: <HiUser size={22} />, href: "#about" },
    { name: "Skills", icon: <HiCode size={22} />, href: "#skills" },
    { name: "Projects", icon: <HiFolderOpen size={22} />, href: "#projects" },
    { name: "Contact", icon: <HiMail size={22} />, href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub size={20} />,
      href: "https://github.com/SarwarMorshad",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn size={20} />,
      href: "https://www.linkedin.com/in/sarwarmorshad/",
    },
    {
      name: "Email",
      icon: <HiMail size={20} />,
      href: "mailto:dev.sarwarmorshad@gmail.com",
    },
  ];

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col py-4 px-3 bg-base-200/80 backdrop-blur-md border border-base-300 rounded-2xl transition-all duration-300 ease-in-out ${
        isExpanded ? "w-48" : "w-14"
      }`}
    >
      {/* Navigation Links */}
      <nav>
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="flex items-center gap-4 p-2.5 rounded-xl text-base-content/70 hover:text-primary hover:bg-base-300/50 transition-all duration-200"
              >
                <span className="min-w-[22px]">{link.icon}</span>
                <span
                  className={`whitespace-nowrap text-sm transition-all duration-300 ${
                    isExpanded ? "opacity-100" : "opacity-0 w-0"
                  }`}
                >
                  {link.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider */}
      <div className="border-t border-base-300 my-3"></div>

      {/* Social Links */}
      <div className="space-y-1">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-2.5 rounded-xl text-base-content/70 hover:text-secondary hover:bg-base-300/50 transition-all duration-200"
          >
            <span className="min-w-[20px]">{link.icon}</span>
            <span
              className={`whitespace-nowrap text-sm transition-all duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              {link.name}
            </span>
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-base-300 my-3"></div>

      {/* Download CV Button */}

      <a
        href="/cv.pdf"
        download
        className="flex items-center gap-4 p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-base-100 transition-all duration-200"
      >
        <span className="min-w-[20px]">
          <HiDownload size={20} />
        </span>
        <span
          className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0 w-0"
          }`}
        >
          Download CV
        </span>
      </a>
    </aside>
  );
};

export default Sidebar;
