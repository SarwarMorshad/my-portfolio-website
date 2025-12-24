import Sidebar from "../components/common/Sidebar";
import About from "../components/sections/About";
import Hero from "../components/sections/Hero";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <Hero />
      <About />
    </div>
  );
};

export default Home;
