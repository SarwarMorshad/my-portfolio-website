import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiLockClosed, HiLockOpen, HiTerminal } from "react-icons/hi";
import profileImg from "../../assets/images/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const [decodedBlocks, setDecodedBlocks] = useState([]);
  const [terminalText, setTerminalText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const blocks = [
    {
      id: 1,
      title: "IDENTITY.exe",
      encrypted: "01010011 01000001 01010010",
      decrypted: {
        label: "Name",
        value: "Sarwar Morshad",
        detail: "Full Stack Developer from Bangladesh, based in Germany",
      },
    },
    {
      id: 2,
      title: "LOCATION.sys",
      encrypted: "4C 4F 43 41 54 49 4F 4E",
      decrypted: {
        label: "Base",
        value: "Chemnitz, Germany 🇩🇪",
        detail: "Pursuing Master's at TU Chemnitz",
      },
    },
    {
      id: 3,
      title: "SKILLS.dll",
      encrypted: "██████ CLASSIFIED ██████",
      decrypted: {
        label: "Stack",
        value: "MERN + TypeScript",
        detail: "React, Node.js, MongoDB, Express, and more",
      },
    },
    {
      id: 4,
      title: "EXPERIENCE.log",
      encrypted: "ACCESS DENIED - LVL 4",
      decrypted: {
        label: "Years",
        value: "3+ Years Active",
        detail: "25+ Projects completed successfully",
      },
    },
    {
      id: 5,
      title: "MISSION.txt",
      encrypted: "REDACTED INFORMATION",
      decrypted: {
        label: "Goal",
        value: "Build Impactful Products",
        detail: "Creating solutions that make a difference",
      },
    },
    {
      id: 6,
      title: "STATUS.cfg",
      encrypted: "AUTHORIZATION REQUIRED",
      decrypted: {
        label: "Availability",
        value: "Open to Opportunities",
        detail: "Looking for exciting roles worldwide",
      },
    },
  ];

  const initialTerminalText = `> SYSTEM BOOT...
> Loading SARWAR_MORSHAD.profile...
> Encryption detected...
> Security Level: MAXIMUM
> 
> [!] Click on locked blocks to decrypt
> [!] Reveal my story piece by piece
> 
> Awaiting user input...█`;

  useEffect(() => {
    let index = 0;
    const text = initialTerminalText;
    setTerminalText("");

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTerminalText((prev) => prev + text.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 20);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ========== SCROLL IN ANIMATION (Fade In from bottom) ==========

      // Header animation
      gsap.fromTo(
        ".about-header",
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

      // Terminal window animation
      gsap.fromTo(
        ".about-terminal",
        { opacity: 0, x: -100, filter: "blur(10px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // Profile card animation
      gsap.fromTo(
        ".about-profile",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-profile",
            start: "top 90%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );

      // Decode blocks staggered animation
      gsap.fromTo(
        ".decode-block",
        { opacity: 0, y: 60, rotateX: -15, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".decode-blocks-container",
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Decrypt all button
      gsap.fromTo(
        ".decrypt-all-btn",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: ".decrypt-all-btn",
            start: "top 95%",
            end: "top 85%",
            scrub: 1,
          },
        }
      );

      // ========== SCROLL OUT ANIMATION (Fade Out when leaving) ==========

      // Create exit animation timeline
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      exitTl
        .to(
          ".about-header",
          {
            opacity: 0,
            y: -80,
            filter: "blur(10px)",
          },
          0
        )
        .to(
          ".about-terminal",
          {
            opacity: 0,
            x: -50,
            filter: "blur(10px)",
          },
          0.1
        )
        .to(
          ".about-profile",
          {
            opacity: 0,
            y: -30,
            scale: 0.9,
          },
          0.15
        )
        .to(
          ".decode-block",
          {
            opacity: 0,
            y: -40,
            filter: "blur(5px)",
            stagger: 0.05,
          },
          0.1
        )
        .to(
          ".decrypt-all-btn",
          {
            opacity: 0,
            y: -20,
          },
          0.2
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDecrypt = (id) => {
    if (decodedBlocks.includes(id)) return;

    const block = document.querySelector(`[data-block="${id}"]`);
    gsap.to(block, {
      x: "random(-10, 10)",
      duration: 0.05,
      repeat: 10,
      yoyo: true,
      onComplete: () => {
        gsap.to(block, { x: 0 });
        setDecodedBlocks((prev) => [...prev, id]);

        const blockData = blocks.find((b) => b.id === id);
        setTerminalText(
          (prev) => prev + `\n> DECRYPTED: ${blockData.title}\n> Data: ${blockData.decrypted.value}\n> █`
        );
      },
    });
  };

  const progress = (decodedBlocks.length / blocks.length) * 100;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen py-32 px-8 lg:px-16 relative overflow-hidden"
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
          }}
        />
      </div>

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="about-header text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 px-4 py-2 rounded-full mb-6">
            <HiTerminal className="text-primary" />
            <span className="text-primary text-sm font-mono">SYSTEM ACCESS GRANTED</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-mono">
            <span className="text-primary">&lt;</span>
            <span className="text-base-content">DECODE</span>
            <span className="text-secondary">_</span>
            <span className="text-base-content">ME</span>
            <span className="text-primary">/&gt;</span>
          </h2>

          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm font-mono mb-2">
              <span className="text-base-content/50">DECRYPTION PROGRESS</span>
              <span className="text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-base-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Terminal Window */}
          <div className="lg:col-span-1">
            <div className="about-terminal bg-base-100 border border-base-300 rounded-2xl overflow-hidden sticky top-8">
              {/* Terminal Header */}
              <div className="bg-base-200 px-4 py-3 flex items-center gap-2 border-b border-base-300">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-sm text-base-content/50 font-mono">terminal</span>
              </div>

              {/* Terminal Content */}
              <div className="p-4 h-80 overflow-y-auto font-mono text-sm">
                <pre className="text-green-400 whitespace-pre-wrap">{terminalText}</pre>
              </div>
            </div>

            {/* Profile Card */}
            <div className="about-profile mt-6 bg-base-200/50 border border-base-300 rounded-2xl p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary mb-4">
                <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <p className="font-mono text-primary text-sm">
                {decodedBlocks.length === blocks.length ? "✓ FULLY DECRYPTED" : "◐ PARTIALLY ENCRYPTED"}
              </p>
            </div>
          </div>

          {/* Encrypted Blocks Grid */}
          <div className="decode-blocks-container lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {blocks.map((block) => {
              const isDecoded = decodedBlocks.includes(block.id);

              return (
                <div
                  key={block.id}
                  data-block={block.id}
                  onClick={() => handleDecrypt(block.id)}
                  className={`decode-block relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
                    isDecoded
                      ? "bg-primary/10 border-primary/50"
                      : "bg-base-200/50 border-base-300 hover:border-primary/50 hover:bg-base-200"
                  }`}
                >
                  {/* Lock Icon */}
                  <div
                    className={`absolute top-4 right-4 ${
                      isDecoded ? "text-green-500" : "text-base-content/30"
                    }`}
                  >
                    {isDecoded ? <HiLockOpen size={20} /> : <HiLockClosed size={20} />}
                  </div>

                  {/* File Name */}
                  <p className="font-mono text-xs text-base-content/50 mb-3">{block.title}</p>

                  {isDecoded ? (
                    <>
                      <p className="text-xs text-secondary uppercase tracking-wider mb-1">
                        {block.decrypted.label}
                      </p>
                      <p className="text-xl font-bold text-base-content mb-2">{block.decrypted.value}</p>
                      <p className="text-sm text-base-content/60">{block.decrypted.detail}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-mono text-primary/70 text-lg mb-3 break-all">{block.encrypted}</p>
                      <p className="text-xs text-base-content/40 group-hover:text-primary transition-colors">
                        [ CLICK TO DECRYPT ]
                      </p>
                    </>
                  )}

                  {/* Glitch Overlay */}
                  {!isDecoded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Decrypt All Button */}
        {decodedBlocks.length < blocks.length && (
          <div className="decrypt-all-btn text-center mt-12">
            <button
              onClick={() => setDecodedBlocks(blocks.map((b) => b.id))}
              className="btn btn-outline btn-primary font-mono"
            >
              &gt; DECRYPT_ALL.exe
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
