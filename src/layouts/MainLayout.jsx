import { Outlet } from "react-router-dom";
import useSmoothScroll from "../hooks/useSmoothScroll";
import ParticlesBackground from "../components/three/ParticlesBackground";

const MainLayout = () => {
  useSmoothScroll();
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
