import { FaGithub, FaLinkedinIn, FaFacebookF, FaCodepen, FaHeart } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker, HiArrowUp } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub size={18} />, href: "https://github.com/SarwarMorshad" },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn size={18} />,
      href: "https://www.linkedin.com/in/sarwarmorshad/",
    },
    { name: "Facebook", icon: <FaFacebookF size={18} />, href: "https://www.facebook.com/smorshad" },
    { name: "CodePen", icon: <FaCodepen size={18} />, href: "https://codepen.io/Sarwar-Morshad" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-base-300 bg-base-200/30 backdrop-blur-sm">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-8 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Logo & Tagline */}
          <div className="text-center md:text-left">
            <a href="#home" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                S
              </div>
              <div>
                <span className="text-xl font-bold text-base-content">Sarwar</span>
                <span className="text-xl font-bold text-primary">.</span>
              </div>
            </a>
            <p className="text-base-content/50 text-sm mt-2 max-w-xs">
              Full Stack Developer crafting digital experiences from Berlin, Germany.
            </p>
          </div>

          {/* Center - Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-base-content/60 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right - Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-base-300/50 flex items-center justify-center text-base-content/60 hover:text-primary hover:bg-primary/20 transition-all hover:scale-110"
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="max-w-6xl mx-auto px-8 lg:px-16 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-base-content/50 text-center sm:text-left">
              © {currentYear} Sarwar Morshad. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="text-sm text-base-content/50 flex items-center gap-1">
              Made with <FaHeart className="text-red-500 animate-pulse" size={14} /> in Berlin
            </p>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-sm text-base-content/50 hover:text-primary transition-colors group"
            >
              Back to top
              <HiArrowUp className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
