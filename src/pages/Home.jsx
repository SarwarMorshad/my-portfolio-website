import MobileNavTabs from "../components/common/MobileNavTabs";
import Sidebar from "../components/common/Sidebar";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      <MobileNavTabs />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
