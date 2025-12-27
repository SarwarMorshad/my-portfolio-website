import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { HiPaperAirplane, HiCheckCircle, HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaCodepen } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const chatContainerRef = useRef(null);
  const hasInitialized = useRef(false);
  const scrollTriggerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState({ type: "", message: "" });

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/SarwarMorshad", icon: FaGithub, color: "#ffffff" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sarwarmorshad/",
      icon: FaLinkedinIn,
      color: "#0A66C2",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/smorshad",
      icon: FaFacebookF,
      color: "#1877F2",
    },
    {
      name: "CodePen",
      url: "https://codepen.io/Sarwar-Morshad",
      icon: FaCodepen,
      color: "#ffffff",
    },
  ];

  const contactInfo = [
    {
      label: "Email",
      value: "dev.sarwarmorshad@gmail.com",
      href: "mailto:dev.sarwarmorshad@gmail.com",
      icon: HiOutlineMail,
    },
    {
      label: "Location",
      value: "Berlin, Germany",
      href: null,
      icon: HiOutlineLocationMarker,
    },
  ];

  const conversationSteps = [
    {
      field: "name",
      question: "Hey there! 👋 What's your name?",
      placeholder: "Enter your name...",
    },
    {
      field: "email",
      question: "Nice to meet you, {name}! What's your email address?",
      placeholder: "Enter your email...",
    },
    {
      field: "subject",
      question: "What would you like to talk about?",
      placeholder: "Enter subject (optional)...",
    },
    {
      field: "message",
      question: "Tell me more! What's on your mind? 💭",
      placeholder: "Type your message...",
    },
  ];

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Function to initialize chat messages
  const initializeChat = () => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Message 1
    setTimeout(() => {
      setIsTyping(true);
    }, 300);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Hey! Welcome to my portfolio! 🚀",
          sender: "bot",
          id: Date.now(),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 1000);

    // Message 2
    setTimeout(() => {
      setIsTyping(true);
    }, 1200);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm Sarwar, a Full Stack Developer based in Berlin.",
          sender: "bot",
          id: Date.now() + 1,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 2000);

    // Message 3
    setTimeout(() => {
      setIsTyping(true);
    }, 2200);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: conversationSteps[0].question,
          sender: "bot",
          id: Date.now() + 2,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 3000);
  };

  // Add bot message helper
  const addBotMessage = (text) => {
    return new Promise((resolve) => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text,
            sender: "bot",
            id: Date.now(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsTyping(false);
        resolve();
      }, 800);
    });
  };

  // Add user message helper
  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        text,
        sender: "user",
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { value } = e.target;
    const currentField = conversationSteps[currentStep]?.field;
    if (currentField) {
      setFormData((prev) => ({ ...prev, [currentField]: value }));
    }
  };

  // Handle step submission
  const handleSubmitStep = async (e) => {
    e.preventDefault();
    const currentField = conversationSteps[currentStep]?.field;
    const value = formData[currentField];

    if (!value && currentField !== "subject") return;

    // Add user message
    addUserMessage(value || "(skipped)");

    if (currentStep < conversationSteps.length - 1) {
      // Move to next step
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      let nextQuestion = conversationSteps[nextStep].question;
      if (nextQuestion.includes("{name}")) {
        nextQuestion = nextQuestion.replace("{name}", formData.name);
      }

      setTimeout(async () => {
        await addBotMessage(nextQuestion);
      }, 300);
    } else {
      // Final step - send email
      await sendEmail();
    }
  };

  // Send email via EmailJS
  const sendEmail = async () => {
    setIsTyping(true);

    setTimeout(async () => {
      await addBotMessage("Perfect! Let me send that message for you... ✉️");

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || "No subject",
            message: formData.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        setTimeout(async () => {
          await addBotMessage("🎉 Message sent successfully!");
        }, 500);

        setTimeout(async () => {
          await addBotMessage(
            `Thanks ${formData.name}! I'll get back to you at ${formData.email} within 24 hours.`
          );
        }, 1500);

        setTimeout(async () => {
          await addBotMessage(
            "In the meantime, feel free to check out my work or connect on social media! 👇"
          );
          setStatus({ type: "success", message: "Message sent!" });
          setFormData({ name: "", email: "", subject: "", message: "" });
          setCurrentStep(5); // Completed state
        }, 2500);
      } catch (error) {
        setTimeout(async () => {
          await addBotMessage("😅 Oops! Something went wrong. Please try again or email me directly.");
          setStatus({ type: "error", message: "Failed to send" });
          setCurrentStep(3); // Back to message step
        }, 500);
      }
    }, 300);
  };

  // Reset chat
  const resetChat = () => {
    setMessages([]);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setCurrentStep(0);
    setStatus({ type: "", message: "" });

    setTimeout(async () => {
      await addBotMessage("Let's start fresh! 🔄");
    }, 300);

    setTimeout(async () => {
      await addBotMessage(conversationSteps[0].question);
    }, 1100);
  };

  // GSAP Animations & Chat Initialization on Scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 👈 THIS IS THE KEY: Initialize chat ONLY when section enters viewport
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          initializeChat();
        },
      });

      // Header animation - Fade IN
      gsap.fromTo(
        ".contact-header",
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

      // Chat container animation - Fade IN
      gsap.fromTo(
        ".chat-container",
        { opacity: 0, y: 50, filter: "blur(10px)", scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".chat-container",
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      // Info panel animation - Fade IN
      gsap.fromTo(
        ".info-panel",
        { opacity: 0, x: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: ".info-panel",
            start: "top 85%",
            end: "top 60%",
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
        .to(".contact-header", { opacity: 0, y: -80, filter: "blur(10px)" }, 0)
        .to(".chat-container", { opacity: 0, y: -50, filter: "blur(10px)", scale: 0.95 }, 0.1)
        .to(".info-panel", { opacity: 0, x: 50, filter: "blur(10px)" }, 0.1);
    }, sectionRef);

    return () => {
      ctx.revert();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen py-32 px-8 lg:px-16 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
                              radial-gradient(circle at 70% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="contact-header text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 px-4 py-2 rounded-full mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-primary text-sm font-medium">Available for hire</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-base-content">Let's </span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Chat
            </span>
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            Have a project in mind? Let's talk about it in a conversational way!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="chat-container lg:col-span-2">
            <div className="bg-base-200/30 backdrop-blur-sm border border-base-300 rounded-3xl overflow-hidden shadow-xl">
              {/* Chat Header */}
              <div className="bg-base-300/50 px-6 py-4 flex items-center gap-4 border-b border-base-300">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                    S
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-base-300"></span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base-content">Sarwar Morshad</h3>
                  <p className="text-xs text-green-400">● Online now</p>
                </div>
                {currentStep >= 4 && (
                  <button
                    onClick={resetChat}
                    className="px-4 py-2 text-sm bg-base-300/50 rounded-lg text-base-content/70 hover:text-base-content transition-colors"
                  >
                    New Chat
                  </button>
                )}
              </div>

              {/* Messages Container */}
              <div ref={chatContainerRef} className="h-[400px] overflow-y-auto p-6 space-y-4">
                {/* Empty state when no messages yet */}
                {messages.length === 0 && !isTyping && (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-base-content/40">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-base-300/50 flex items-center justify-center">
                        <span className="text-2xl">💬</span>
                      </div>
                      <p className="text-sm">Chat will start when you scroll here...</p>
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-content rounded-br-md"
                          : "bg-base-300/50 text-base-content rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "user" ? "text-primary-content/60" : "text-base-content/40"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-base-300/50 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              {currentStep < conversationSteps.length && (
                <form onSubmit={handleSubmitStep} className="p-4 border-t border-base-300">
                  <div className="flex items-center gap-3">
                    <input
                      type={conversationSteps[currentStep]?.field === "email" ? "email" : "text"}
                      value={formData[conversationSteps[currentStep]?.field] || ""}
                      onChange={handleInputChange}
                      placeholder={conversationSteps[currentStep]?.placeholder}
                      className="flex-1 px-4 py-3 bg-base-300/30 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/30 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-12 h-12 rounded-xl bg-primary text-primary-content flex items-center justify-center hover:bg-primary/80 transition-all hover:scale-105"
                    >
                      <HiPaperAirplane className="text-xl rotate-90" />
                    </button>
                  </div>
                  {conversationSteps[currentStep]?.field === "subject" && (
                    <p className="text-xs text-base-content/40 mt-2 text-center">
                      Press Enter to skip or type a subject
                    </p>
                  )}
                </form>
              )}

              {/* Completed State */}
              {currentStep >= conversationSteps.length && (
                <div className="p-6 border-t border-base-300 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm">
                    <HiCheckCircle />
                    Message sent successfully!
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="info-panel space-y-6">
            {/* Profile Card */}
            <div className="bg-base-200/30 backdrop-blur-sm border border-base-300 rounded-2xl p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>
              <h3 className="text-lg font-semibold text-base-content">Sarwar Morshad</h3>
              <p className="text-base-content/60 text-sm">Full Stack Developer</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-400 text-xs">Available for work</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-base-200/30 backdrop-blur-sm border border-base-300 rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-base-content mb-4">Contact Info</h4>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                      <info.icon className="text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/50">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm text-base-content hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-base-content">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-base-200/30 backdrop-blur-sm border border-base-300 rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-base-content mb-4">Connect with me</h4>
              <div className="grid grid-cols-4 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full aspect-square rounded-xl bg-base-300/30 flex items-center justify-center text-base-content/70 hover:text-primary hover:bg-primary/20 transition-all hover:scale-110"
                    title={social.name}
                  >
                    <social.icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Response - Enhanced */}
            <div className="relative group">
              {/* Animated glow background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-md opacity-60 group-hover:opacity-100 animate-pulse transition-opacity"></div>

              <div className="relative bg-base-200 border border-primary/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-bounce">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <p className="text-sm text-green-400">Response within 24 hours</p>
                  </div>
                </div>
                <p className="text-sm text-base-content/80">
                  For urgent matters, reach out on{" "}
                  <a
                    href="https://www.linkedin.com/in/sarwarmorshad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    LinkedIn →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
